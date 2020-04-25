<template>
  <div class="game">
    <div class="header">
      <div class="bombsRemaining box">
        &#128163;{{bombsRemaining}}
      </div>
      <div class="smiley box" @click="restart()">
        <span v-if="smiley === 'happy'">
          &#128578;
        </span>
        <span v-if="smiley === 'surprised'">
          &#128558;
        </span>
        <span v-if="smiley === 'dead'">
          &#128555;
        </span>
        <span v-if="smiley === 'cool'">
          &#128526;
        </span>
      </div>
      <div class="timer box">
        <Timer ref="timer" :started="timerStart" :stopped="timerStop"></Timer>
      </div>
    </div>
    <div class="grid" :style="getGridStyle()">
      <MineCell
        v-for="(cell, i) in cellGrid"
        :key="i"
        :hasBomb="cell.hasBomb"
        :isOpen="cell.isOpen"
        :hasFlag="cell.hasFlag"
        :bombNb="cell.bombNb"
        @click.native="clickCell(cell, i)"
        @click.right.native="addFlag(cell)"
        @dblclick.native.prevent="doubleClick(cell, i)"
        @contextmenu.native.prevent
      >
      </MineCell>
    </div>
  </div>

</template>

<script>
import MineCell from './MineCell'
import Timer from './Timer'

export default {
  name: 'MineGrid',
  components: {
    MineCell, Timer
  },

  props: {
    nbCols: {
      type: Number,
      default: 10
    },
    nbRows: {
      type: Number,
      default: 8
    },
    nbBombs: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      haveBegun: false,
      haveFinished: false,
      haveWon: true,
      gridSize: this.nbCols * this.nbRows,
      bombsRemaining: this.nbBombs,
      cellRemaining: this.nbCols * this.nbRows - this.nbBombs,
      cellGrid: [],
      smiley: 'happy',
      timerStart: false,
      timerStop: true
    }
  },
  mounted () {
    this.mountTheGrid()
  },
  methods: {
    mountTheGrid () {
      for (let i = 0; i < this.gridSize; i += 1) {
        this.cellGrid.push({
          hasBomb: false,
          isOpen: false,
          hasFlag: false,
          bombNb: 0
        })
      }
    },
    restart () {
      this.haveBegun = false
      this.haveFinished = false
      this.haveWon = true
      this.gridSize = this.nbCols * this.nbRows
      this.bombsRemaining = this.nbBombs
      this.cellRemaining = this.nbCols * this.nbRows - this.nbBombs
      this.cellGrid = []
      this.smiley = 'happy'
      this.mountTheGrid()
      this.timerStop = true
      this.timerStart = false
    },
    getGridStyle () {
      return `grid-template-columns: repeat(${this.nbCols}, 1fr);`
    },

    initGrid (cell, index) {
      let i = 0
      while (i < this.nbBombs) {
        const rand = Math.floor(Math.random() * this.gridSize)
        if (!this.cellGrid[rand].hasBomb && (rand !== i) && !this.isInNeighborhood(rand, index)) {
          console.log('bomb et index : ' + this.isInNeighborhood(rand, index))
          this.cellGrid[rand].hasBomb = true
          i++
        }
      }
    },
    clickCell: function (cell, i) {
      if (this.haveFinished || cell.hasFlag) {
        return
      }
      if (!this.haveBegun) {
        this.initGrid(cell, i)
        this.haveBegun = true
        this.timerStart = true
        this.timerStop = false
      }
      if (!cell.isOpen) {
        cell.isOpen = true
        if (cell.hasBomb) {
          this.smiley = 'dead'
          this.haveFinished = true
          this.timerStop = true
          this.haveWon = false
          this.revealBombs()
        } else {
          cell.bombNb = this.getNumberNeighboursBombs(i)
          this.cellRemaining--
          if (this.cellRemaining === 0) {
            this.haveFinished = true
            this.smiley = 'cool'
            this.timerStop = true
          }
          // console.log('cell :' + i)
          // console.log(' bombs :' + this.getNumberNeighboursBombs(i))
          // console.log(this.getNeighboursIndex(i))
          if (cell.bombNb === 0) {
            this.openNeighbours(i)
          }
        }
      }
    },
    addFlag (cell) {
      if (!this.haveFinished && this.haveBegun && !cell.isOpen) {
        cell.hasFlag = !cell.hasFlag
        if (cell.hasFlag) {
          this.bombsRemaining--
        } else {
          this.bombsRemaining++
        }
        console.log('bombs remaining : ' + this.bombsRemaining)
      }
    },
    doubleClick (cell, index) {
      if (!this.haveFinished && this.haveBegun && cell.isOpen) {
        if (cell.bombNb === this.getNumberNeighboursFlag(index)) {
          this.openNeighbours(index)
        }
      }
    },
    revealBombs () {
      for (let i = 0; i < this.gridSize; i++) {
        if (this.cellGrid[i].hasBomb && !this.cellGrid[i].hasFlag) {
          this.cellGrid[i].isOpen = true
        }
      }
    },
    openNeighbours (index) {
      let neighbours = this.getNeighboursIndex(index)
      for (let i = 0; i < neighbours.length; i++) {
        this.clickCell(this.cellGrid[neighbours[i]], neighbours[i])
      }
    },
    /**
     *
     * @param i1
     * @param i2
     */
    isInNeighborhood (i1, i2) {
      return ((i1 === i2 + 1) || // i1 is at left of i2
        (i1 === i2 - 1) || // i1 is at right of i2
        (i1 === i2 + this.nbCols) || // i1 is above  i2
        (i1 === i2 - this.nbCols) || // i1 is below  i2
        (i1 === i2 + this.nbCols + 1) || // diagonals down left
        (i1 === i2 + this.nbCols - 1) || // diagonals down right
        (i1 === i2 - this.nbCols + 1) || // diagonals up left
        (i1 === i2 - this.nbCols - 1)) // diagonals up right
    },
    getNeighboursIndex (index) {
      let neighbours = []
      for (let x = -1; x < 2; x += 1) {
        for (let y = -1; y < 2; y += 1) {
          const cellIndex = index + x + (y * this.nbCols)
          let isInLeftBorder = index % this.nbCols === 0
          let isInRightBorder = index % this.nbCols === this.nbCols - 1
          if ((cellIndex !== index) && (cellIndex >= 0) && (cellIndex < this.gridSize) && !(isInLeftBorder && x === -1) && !(isInRightBorder && x === 1)) {
            neighbours.push(cellIndex)
          }
        }
      }
      return neighbours
    },
    getNumberNeighboursBombs (index) {
      let nbBombs = 0
      let neighbours = this.getNeighboursIndex(index)
      for (let i = 0; i < neighbours.length; i++) {
        if (this.cellGrid[neighbours[i]].hasBomb) {
          nbBombs++
        }
      }
      return nbBombs
    },
    getNumberNeighboursFlag (index) {
      let nbBombs = 0
      let neighbours = this.getNeighboursIndex(index)
      for (let i = 0; i < neighbours.length; i++) {
        if (this.cellGrid[neighbours[i]].hasFlag) {
          nbBombs++
        }
      }
      return nbBombs
    }
  }

}
</script>

<style >
  .header {
    width: available;
    background-color: rgb(90, 95, 100);/*rgba(52, 58, 64, 0.85);*/
    display: flex;
    justify-content: space-between;
  }
  .header > * {
    background-color: #b74e91;
    width: 100px;
    display: inline-block;
    display: inline;
    vertical-align: baseline;
    margin-top: auto;
    margin-bottom: auto;
    zoom: 1
  }

  .box {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
    min-height: 30px;
    width: 130px;
    margin: 10px auto;
    padding: 5px;
    font-size: 25px;
    background: white;
    border-radius: 10px;
    vertical-align: middle;
    text-align: center;
    display:inline-block;
  }

  .smiley{
    cursor: pointer;
  }

  .game {
    height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
  }
  .game >  {
    flex: 1;
    text-align: center;
  }

  .grid{
    text-align: center;
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100vh;
    margin: 0 auto;
    user-select: none;
    position: relative;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    grid-auto-rows: 1fr;
  }

  .grid:before {
     content: '';
     width: 0;
     padding-bottom: 100%;
     grid-row: 1 / 1;
     grid-column: 1 / 1;
   }
  .grid > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
</style>
