<template>
  <div>
    <div class="selection">
      <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-container class="">
          <b-row>
            <b-col class="center-bottom">
              <div class="center-bottom-text">
                Rows number
              </div>
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
              <b-input-group prepend="0" append="100" class="mt-3">
                <b-form-input v-model="value" type="range" min="0" max="100" step="1"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="0" append="100" class="mt-3">
                <b-form-input v-model="value" type="range" min="0" max="100" step="1"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group prepend="0" append="100" class="mt-3">
                <b-form-input v-model="value" type="range" min="0" max="100" step="1"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-container>
        <div>
          <b-button block class="generate-button">Generate the Grid</b-button>
        </div>      </b-collapse>

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
      nbCols: 30,
      nbRows: 16,
      nbBombs: 99,
      restartGame: false
    }
  },
  methods: {
    mountTheGrid () {
      this.cellGrid = []
      for (let i = 0; i < this.gridSize; i += 1) {
        this.cellGrid.push({
          hasBomb: false,
          isOpen: false,
          hasFlag: false,
          bombNb: 0,
          pressed: false
        })
      }
    }
  }
}
</script>

<style scoped>
  .cursors{
    margin-top: -15px;
  }
  .center-bottom{
    margin: 5px;
    text-align: center;
    color: white;
  }
  .generate-button{
    width: 60%;
    margin: 10px auto;
  }
  .selection{
    background-color: rgb(81, 61, 122);
    padding: 10px;
  }
</style>
