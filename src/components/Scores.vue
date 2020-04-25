<template>
  <div>
    <div v-b-toggle.collapse-2 class="m-1">&#128285;</div>
    <b-collapse id="collapse-2" class="scoresHistory">
      <b-table striped hover :items="scoresSuitable"></b-table>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'Scores',
  props: {
    newTime: {
      type: Object,
      required: true
    },
    newScore: {
      type: Boolean,
      required: true
    },
    gameType: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      scores: [],
      scoresSuitable: []
    }
  },
  mounted () {
    if (localStorage.getItem('scores')) {
      try {
        this.scores = JSON.parse(localStorage.getItem('scores'))
        this.showScores()
        console.log(this.scores)
      } catch (e) {
        localStorage.removeItem('scores')
      }
    }
  },
  methods: {
    addTime () {
      console.log('NEW SCORE :')
      const newScore = {
        time: this.newTime,
        date: new Date().toDateString(),
        gameType: this.gameType
      }
      console.log(newScore)
      const index = this.findIndex(this.newTime)
      if (index === this.scores.length || this.scores.length === 0) {
        this.scores.push(newScore)
      } else {
        this.scores.splice(index, 0, newScore)
      }
      this.saveScores()
      this.showScores()
    },
    findIndex (newTime) {
      if (this.scores.length < 1) {
        return 0
      }
      console.log('SCORES ACTUELS : ')
      console.log(this.scores)
      for (let i = 0; i < this.scores.length; i++) {
        if (this.scores[i].time.totalCenti > newTime.totalCenti) {
          return i
        }
      }
      return this.scores.length
    },
    removeScore (x) {
      this.scores.splice(x, 1)
      this.saveScores()
    },
    saveScores () {
      const parsed = JSON.stringify(this.scores)
      localStorage.setItem('scores', parsed)
    },
    showScores () {
      this.scoresSuitable = []
      let pos = 1
      for (let i = 0; i < this.scores.length; i++) {
        if (this.scores[i].gameType.nbRows === this.gameType.nbRows && this.scores[i].gameType.nbCols === this.gameType.nbCols && this.scores[i].gameType.nbBombs === this.gameType.nbBombs) {
          const row = {
            pos: pos++,
            time: (!this.scores[i].time.hour ? '' : this.scores[i].time.hour + ':') + (!this.scores[i].time.minute ? '0' : '') + this.scores[i].time.minute + ':' + (!this.scores[i].time.second || this.scores[i].time.second < 10 ? '0' : '') + this.scores[i].time.second + ':' + (!this.scores[i].time.centisecond || this.scores[i].time.centisecond < 10 ? '0' : '') + this.scores[i].time.centisecond,
            date: this.scores[i].date
          }
          this.scoresSuitable.push(row)
        }
      }
    }
  },
  watch: {
    newScore () {
      if (this.newScore) {
        this.addTime()
      }
    }
  }
}

</script>

<style scoped>
  .scoresHistory{
    position: absolute;
    width: 33%;
    z-index:10;
    top:150px;
    right:10px;
    opacity: 1;
    background-color: white;
    cursor: initial;
    border-radius: 10px;
  }
</style>
