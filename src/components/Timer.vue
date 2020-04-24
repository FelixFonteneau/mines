<template>
  <div class="timer">
    <span>
      {{second}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    second: {
      type: Number,
      default: 0
    },
    started: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.$interval = setInterval(() => {
      if (this.started) {
        this.second++
      }
    }, 1000)
  },
  destroyed: function () {
    clearInterval(this.$interval)
  },
  methods: {
    start () {
      this.started = true
    },
    pause () {
      this.started = false
    },
    stop () {
      this.start = false
      this.second = 0
    },
    getTime () {
      return this.second
    }
  }
}
</script>

<style scoped>

</style>
