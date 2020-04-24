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

</style>
