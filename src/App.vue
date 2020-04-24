<template>
  <div id="app">
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="0"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="1"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="2"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="3"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="4"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="5"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="6"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="7"></CaseMine>
    <CaseMine :hasBomb="false" :isOpen="true" :hasFlag="false" :bombCount="8"></CaseMine>

  </div>
</template>

<script>
import CaseMine from './components/MineCell'
export default {
  name: 'App',
  components: {CaseMine}
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
