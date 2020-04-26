<template>
  <div id="app">
    <p>Cell from 0 to 8 not open</p>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="0"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="1"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="2"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="3"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="4"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="5"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="6"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="7"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="false" :bombCount="8"></MineCell>
    <p>Cell from 0 to 8 with flag</p>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="0"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="1"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="2"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="3"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="4"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="5"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="6"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="7"></MineCell>
    <MineCell :hasBomb="false" :isOpen="false" :hasFlag="true" :bombCount="8"></MineCell>
    <p>Cell from 0 to 8 opened</p>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="0"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="1"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="2"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="3"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="4"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="5"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="6"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="7"></MineCell>
    <MineCell :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="8"></MineCell>
    <p>Bomb cell</p>
    <MineCell :hasBomb="true" :isOpen="false" :hasFlag="false" :bombCount="0"></MineCell>
    <MineCell :hasBomb="true" :isOpen="true" :hasFlag="false" :bombCount="0"></MineCell>
    <MineCell :hasBomb="true" :isOpen="false" :hasFlag="true" :bombCount="0"></MineCell>

  </div>
</template>

<script>
import MineCell from './components/MineCell'
export default {
  name: 'App',
  components: {MineCell}
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
