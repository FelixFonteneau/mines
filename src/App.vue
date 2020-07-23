<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand to="/">Minesweeper</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>by</b-nav-text>
          <b-nav-item href="https://felixfonteneau.github.io/">Félix</b-nav-item>
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

export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
  .navbar {
    background-color: #6C2375;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
    overflow-x: hidden;
  }
  b-nav-item b-navbar-brand {
    scroll-behavior: smooth;
  }
</style>
