<template>
  <div class="timer">
    <span class="inline">
      &#x23F1;&#xFE0F;
    </span>
    <span v-if="status === 'hour'" class="inline">
      {{hour}}:
    </span>
    <span v-if="status !== 'second'" class="inline">
      <span v-if="(second < 10) && status === 'hour'" class="inline zero">
        0
      </span>
      {{minute}}:
    </span>
    <span  class="inline">
      <span v-if="(second < 10) && status !== 'second'" class="inline zero">
        0
      </span>
      {{second}}:
    </span>
    <span  class="inline">
      <span v-if="(centisecond < 10)" class="inline zero">
        0
      </span>
      {{centisecond}}
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
      hour: 0,
      minute: 0,
      second: 0,
      centisecond: 0,
      totalCenti: 0,
      status: 'second'
    }
  },
  mounted: function () {
    this.$interval = setInterval(() => {
      if (!this.stopped) {
        this.centisecond++
        this.totalCenti++
        if (this.centisecond > 99) {
          this.second++
          this.centisecond = 0
          if (this.second > 59) {
            if (this.status === 'second') {
              this.status = 'minute'
            }
            this.minute++
            this.second = 0
            if (this.minute > 59) {
              if (this.status === 'minute') {
                this.status = 'hour'
              }
              this.hour++
              this.minute = 0
            }
          }
        }
      }
    }, 10)
  },
  destroyed: function () {
    clearInterval(this.$interval)
  },
  methods: {
    init () {
      this.hour = 0
      this.minute = 0
      this.second = 0
      this.centisecond = 0
      this.totalCenti = 0
      this.status = 'second'
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
      if (this.stopped) {
        const timeFinal = {
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          centisecond: this.centisecond,
          totalCenti: this.totalCenti
        }
        this.$emit('time', timeFinal)
      }
    }
  }
}
</script>

<style scoped>
  .inline{
    margin-right: -4px;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
    vertical-align: middle;
    text-align: center;
    display:inline-block;
  }

  .zero{
    vertical-align: unset;
  }
</style>
