<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand href="#game">Minesweeper</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>by</b-nav-text>
          <b-nav-item href="https://felixfonteneau.github.io/">Félix</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Difficulty" right>
            <b-dropdown-item href="#game" @click="difficulty('easy')">Easy</b-dropdown-item>
            <b-dropdown-item href="#game" @click="difficulty('intermediate')">Intermediate</b-dropdown-item>
            <b-dropdown-item href="#game" @click="difficulty('normal')">Normal</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <MineGrid
      id="game"
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
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
  }
  b-nav-item b-navbar-brand {
    scroll-behavior: smooth;
  }
</style>
