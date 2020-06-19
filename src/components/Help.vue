<template>
  <div>
    <div :aria-expanded="visible ? 'true' : 'false'"
         :class="visible ? null : 'collapsed'"
         @click="visible = !visible"
         aria-controls="collapse-1" class="m-1 help">
      <span class="bestScore"><img class="img-logos" src="../img/question.png" alt="question"/></span>
    </div>
    <b-collapse id="collapse-1" class="helpDropdown" v-model="visible">
      <div class="textHelp">
        <p>
          The goal is to open every empty cells and avoid bombs. If a cell have a number, it show the number of bombs within the 8 neighbouring cells.
        </p>
        <p>
          You can place a flag (<img class="small-img" src="../img/flag.png" alt="flag"/>) with a right click if you think that a cell contains a bomb. It will help you remember the bomb's placement after.
        </p>
        <ul>
          <li>
            <img class="small-img" src="../img/bomb.png" alt="bomb"/> shows the number of bomb remaining.
          </li>
          <li>
            <img class="small-img" src="../img/happy.png" alt="face"/> shows the status of the game. Click on it to restart the game.
          </li>
          <li>
            <img class="small-img" src="../img/chrono.png" alt="chrono"/> is a timer and shows the time since the beginning.
          </li>
          <li>
            <img class="small-img" src="../img/crown.png" alt="crown"/> is your best time of the current game. Click on it to see the local leaderboard with your best times resolving the minesweeper.
          </li>
        </ul>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'Help',
  props: {
    hide: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      visible: false
    }
  },
  mounted () {

  },
  methods: {
  },
  watch: {
    hide () {
      if (this.visible && this.hide) {
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>
  .help{
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  .textHelp{
    text-align: left;
    text-justify: distribute;
    margin-top: 5px;
    font-size: 70%;
    line-height:100%;
  }
  .helpDropdown{
    padding: 10px;
    position: absolute;
    width: 35%;
    z-index:10;
    top:70px;
    left:10px;
    opacity: 1;
    background-color: white;
    cursor: initial;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(255, 255, 255, 0.5);https://jklm.fun/TTJK
  }

  .small-img{
    height: 1.1vw;
    margin: -1px;
  }

</style>
