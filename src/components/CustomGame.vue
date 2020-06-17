<template>
  <div>
    <div class="selection">
      <b-button v-b-toggle.collapse-1-inner size="sm">
        <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
      </b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-container class="">
          <b-row>
            <b-col class="center-bottom">
              Rows number
            </b-col>
            <b-col class="center-bottom">
              Columns number
            </b-col>
            <b-col class="center-bottom">
              Bomb number
            </b-col>
          </b-row>
          <b-row class="cursors">
            <b-col>
              <b-input-group prepend="3" :append="maxRows.toString()" class="mt-3">
                <b-form-input v-model="rowsSelected" type="range" min="2" :max="maxRows" step="1"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="3" :append="maxCols.toString()" class="mt-3">
                <b-form-input v-model="colsSelected" type="range" min="3" :max="maxCols" step="1"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="0" :append="getMaxBomb()" class="mt-3">
                <b-form-input v-model="bombSelected" type="range" min="0" :max="getMaxBomb()" step="1"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col class="center-bottom">
              {{rowsSelected}}
            </b-col>
            <b-col class="center-bottom">
              {{colsSelected}}
            </b-col>
            <b-col class="center-bottom">
              {{bombSelected}}
            </b-col>
          </b-row>
        </b-container>
        <div>
          <b-button class="generate-button" @click="generateGrid()">Generate the Grid</b-button>
        </div>
      </b-collapse>

    </div>
    <MineGrid
      :nbCols = "nbCols"
      :nbRows = "nbRows"
      :nbBombs = "nbBombs"
      :restartGame = "restartGame"
    ></MineGrid>
  </div>
</template>

<script>
import MineGrid from './MineGrid'

export default {
  name: 'CustomGame',
  components: {
    MineGrid
  },
  data: function () {
    return {
      rowsSelected: 0,
      colsSelected: 0,
      bombSelected: 0,
      bombSelectedString: '',
      maxCols: 40,
      maxRows: 40,
      nbCols: 30,
      nbRows: 16,
      nbBombs: 99,
      restartGame: false
    }
  },
  mounted () {
    this.rowsSelected = this.nbRows
    this.colsSelected = this.nbCols
    this.bombSelected = this.nbBombs
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    getMaxBomb () {
      return (this.rowsSelected * this.colsSelected - 9).toString()
    },
    generateGrid () {
      this.nbCols = parseInt(this.colsSelected)
      this.nbRows = parseInt(this.rowsSelected)
      this.nbBombs = parseInt(this.bombSelected)
      this.restart = true
      setTimeout(this.resetRestart, 10)
    },
    resetRestart () {
      this.restart = false
    },
    handleResize () {
      this.maxCols = Math.round(window.innerWidth / window.innerHeight * this.maxRows)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
  .cursors{
    margin-top: -15px;
  }
  .center-bottom{
    margin: 0px;
    text-align: center;
    color: white;
  }
  .generate-button{
    margin: 10px auto;
  }
  .selection{
    background-color: rgb(81, 61, 122);
    padding: 10px;
  }
</style>
