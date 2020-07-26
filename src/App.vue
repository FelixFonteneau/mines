<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand to="/">Minesweeper</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" :active='$route.name =="welcomePage"'><b-icon-house></b-icon-house></b-nav-item>
          <b-nav-item to="/normal" :active='$route.name =="gameNormal"'><b-icon-play></b-icon-play></b-nav-item>
          <b-nav-item to="/scores" :active='$route.name =="scoresPage"'><b-icon-award></b-icon-award></b-nav-item>
          <b-nav-item to="/help" :active='$route.name =="helpPage"'><b-icon-question-circle></b-icon-question-circle></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Difficulty" right>
            <b-dropdown-item to="easy">Easy</b-dropdown-item>
            <b-dropdown-item to="medium">Intermediate</b-dropdown-item>
            <b-dropdown-item to="normal">Normal</b-dropdown-item>
            <b-dropdown-item to="custom">Custom</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {  },
  methods: {
    ...mapActions(['resize']),
    handleResize() {
      this.resize()
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style>
  .navbar {
    background-color: #6C2375;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }
  b-nav-item b-navbar-brand {
    scroll-behavior: smooth;
  }
</style>
