<template>
  <div class="game">
    <div class="header">
      <div class="bombsRemaining">
        &#128163;{{bombsRemaining}}
      </div>
      <div class="timer">
        <Timer ref="timer" ></Timer>
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
      cellGrid: []
    }
  },
  mounted () {
    for (let i = 0; i < this.gridSize; i += 1) {
      this.cellGrid.push({
        hasBomb: false,
        isOpen: false,
        hasFlag: false,
        bombNb: 0
      })
    }
  },
  methods: {
    getGridStyle () {
      return `grid-template-columns: repeat(${this.nbCols}, 1fr);`
    },
    /**
     *
     * @param cell
     * @param index
     */
    initGrid (cell, index) {
      let i = 0
      this.$refs.timer.start()
      while (i < this.nbBombs) {
        const rand = Math.floor(Math.random() * this.gridSize)
        if (!this.cellGrid[rand].hasBomb && (rand !== i) && !this.isInNeighborhood(rand, index)) {
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
      }
      if (!cell.isOpen) {
        cell.isOpen = true
        if (cell.hasBomb) {
          this.haveFinished = true
          this.haveWon = false
          this.revealBombs()
        } else {
          cell.bombNb = this.getNumberNeighboursBombs(i)
          this.cellRemaining--
          console.log('reste : ' + this.cellRemaining)
          if (this.cellRemaining === 0) {
            this.haveFinished = true
            console.log('TERMINE')
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
    background-color: rgba(84, 84, 84, 0.85);
    display: flex;
    justify-content: space-between;
  }
  .header > * {
    width: 100px;
    display: inline-block;
    display: inline;
    vertical-align: baseline;
    margin-top: auto;
    margin-bottom: auto;
    zoom: 1
  }

  .game {
    justify-content: space-between;
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
