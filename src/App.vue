<template>
  <div id="app">
    <p>Cell from 0 to 8 not open</p>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="0"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="1"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="2"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="3"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="4"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="5"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="6"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="7"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="8"></mineCell>
    <p>Cell from 0 to 8 with flag</p>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="0"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="1"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="2"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="3"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="4"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="5"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="6"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="7"></mineCell>
    <mineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="8"></mineCell>
    <p>Cell from 0 to 8 opened</p>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="0"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="1"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="2"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="3"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="4"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="5"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="6"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="7"></mineCell>
    <mineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="8"></mineCell>
    <p>Bomb cell</p>
    <mineCell :hasBomb="true" :isOpen="false" :hasFlag="false" :bombCount="0"></mineCell>
    <mineCell :hasBomb="true" :isOpen="true" :hasFlag="false" :bombCount="0"></mineCell>
    <mineCell :hasBomb="true" :isOpen="false" :hasFlag="true" :bombCount="0"></mineCell>

  </div>
</template>

<script>
import mineCell from './components/MineCell'
export default {
  name: 'App',
  components: {mineCell}
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
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 1fr;
}
</style>
