<template>
  <div id="app">
    <MineGrid></MineGrid>
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
