<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand to="/">Minesweeper</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" :active='$route.name =="welcomePage"'><b-icon-house></b-icon-house></b-nav-item>
          <b-nav-item to="/game" :active='$route.name =="gamePage"'><b-icon-play></b-icon-play></b-nav-item>
          <b-nav-item to="/scores" :active='$route.name =="scoresPage"'><b-icon-award></b-icon-award></b-nav-item>
          <b-nav-item to="/help" :active='$route.name =="helpPage"'><b-icon-question-circle></b-icon-question-circle></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="gear" right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <b-icon-gear></b-icon-gear>
            </template>
            <b-nav-text style="text-align: center">
              <div class="custom-control custom-switch" style="color: #091A28">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="darkMode">
                <label class="custom-control-label" for="customSwitch1">Dark mode</label>
              </div>
            </b-nav-text>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Difficulty" right>
            <b-dropdown-item :active="difficulty === 'easy'" to="/game" @click="changeDifficulty('easy')">Easy</b-dropdown-item>
            <b-dropdown-item :active="difficulty === 'intermediate'" to="/game" @click="changeDifficulty('intermediate')">Intermediate</b-dropdown-item>
            <b-dropdown-item :active="difficulty === 'normal'" to="/game" @click="changeDifficulty('normal')">Normal</b-dropdown-item>
            <b-dropdown-item :active="difficulty === 'custom'" to="/game" @click="changeDifficulty('custom')">Custom</b-dropdown-item>
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

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {  },
  methods: {
    ...mapActions(['resize', 'changeDifficulty']),
    handleResize() {
      this.resize()
    }
  },
  data() {
    return {
      darkMode: false,
    }
  },
  watch: {
    darkMode: function () {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem("theme", 'dark');
        htmlElement.setAttribute('theme', 'dark');
      } else {
        localStorage.setItem("theme", 'light');
        htmlElement.setAttribute('theme', 'light');
      }
    }
  },
  computed: mapGetters(['difficulty']),
  mounted () {
    // set 'app-background' class to body
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");
    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === 'dark') {
      htmlElement.setAttribute('theme', 'dark')
      this.darkMode = true
    } else {
      htmlElement.setAttribute('theme', 'light');
      this.darkMode = false
    }
    // set the resize listener
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
