<template>
  <div id="app">
    <b-navbar toggleable type="dark"  class="navbar">
      <b-navbar-brand href="#">Minesweeper</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="difficulty('easy')">Easy</b-nav-item>
          <b-nav-item @click="difficulty('intermediate')">Intermediate</b-nav-item>
          <b-nav-item  @click="difficulty('normal')">Normal</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <MineGrid
      :nb-cols="nbCols"
      :nb-rows="nbRows"
      :nb-bombs="nbBombs"
      :restart-game="restart"
    ></MineGrid>
  </div>
</template>

<script>
import MineCell from './components/MineCell'
import MineGrid from './components/MineGrid'

export default {
  name: 'App',
  components: {
    MineCell,
    MineGrid
  },
  data: function () {
    return {
      nbCols: 10,
      nbRows: 8,
      nbBombs: 10,
      restart: false
    }
  },
  methods: {
    difficulty (diff) {
      if (diff === 'easy') {
        this.nbCols = 10
        this.nbRows = 8
        this.nbBombs = 10
      } else if (diff === 'intermediate') {
        this.nbCols = 16
        this.nbRows = 14
        this.nbBombs = 40
      } else if (diff === 'normal') {
        this.nbCols = 30
        this.nbRows = 16
        this.nbBombs = 99
      }
      this.restart = true
      setTimeout(function () {
        this.restart = false
      }, 10)
    }
  }
}
</script>

<style>
  .navbar {
    background-color: rgb(107, 84, 152);
  }

</style>
