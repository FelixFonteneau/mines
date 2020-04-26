<template>
  <div>
    <div v-b-toggle.collapse-1 class="m-1 help"> <span class="bestScore">&#x2753;</span></div>
    <b-collapse id="collapse-1" class="helpDropdown">
      <div class="textHelp">
        <p>
          The goal is to open every empty cells and avoid bombs. If a cell have a number, it show the number of bombs within the 8 neighbouring cells.
        </p>
        <p>
          You can place a flag (<b class="flag">&#9873;</b>) with a right click if you think that a cell contains a bomb. It will help you remember the bomb's placement after.
        </p>
        <ul>
          <li>
            &#128163; shows the number of bomb remaining.
          </li>
          <li>
            &#128578; shows the status of the game. Click on it to restart the game.
          </li>
          <li>
            &#x23F1;&#xFE0F; is a chronometer and shows the time since the beginning.
          </li>
          <li>
            &#128285; is the best time of the current game. Click on it to see the local leaderboard with your best times resolving the minesweeper.
          </li>
        </ul>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data: function () {
    return {
    }
  },
  mounted () {

  },
  methods: {
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
    top:150px;
    left:10px;
    opacity: 1;
    background-color: white;
    cursor: initial;
    border-radius: 10px;
  }

</style>
