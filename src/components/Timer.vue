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
    started: {
      type: Boolean,
      required: true
    },
    stopped: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      second: 0
    }
  },
  mounted: function () {
    this.$interval = setInterval(() => {
      if (!this.stopped) {
        this.second++
      }
    }, 1000)
  },
  destroyed: function () {
    clearInterval(this.$interval)
  },
  methods: {
    init () {
      this.second = 0
    },
    getTime () {
      return this.second
    }
  },
  watch: {
    started () {
      this.init()
    },
    stopped () {
    }
  }
}
</script>

<style scoped>

</style>
