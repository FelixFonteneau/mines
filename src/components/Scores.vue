<template>
  <div>
    <div v-b-toggle.collapse-2 class="m-1"> <span class="bestScore">&#128285; {{bestScore}}</span></div>
    <b-collapse id="collapse-2" class="scoresHistory">
      <p class="textHistory">Your best 5 times</p>
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
      scoresSuitable: [],
      bestScore: ''
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
      const date = new Date()
      const newScore = {
        time: this.newTime,
        date: (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate() + '/' + (date.getMonth() < 10 ? '0' : '') + date.getMonth() + '/' + date.getFullYear(),
        gameType: this.gameType
      }
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
          const timeString = (!this.scores[i].time.hour ? '' : this.scores[i].time.hour + ':') +
                              (!this.scores[i].time.minute && !this.scores[i].time.hour ? '' : (!this.scores[i].time.minute ? '0' : '') + this.scores[i].time.minute + ':') +
                              ((!this.scores[i].time.second && (this.scores[i].time.minute || this.scores[i].time.hour)) || (this.scores[i].time.second && this.scores[i].time.second < 10 && (this.scores[i].time.minute || this.scores[i].time.hour)) ? '0' : '') + this.scores[i].time.second + ':' +
                              (!this.scores[i].time.centisecond || this.scores[i].time.centisecond < 10 ? '0' : '') + this.scores[i].time.centisecond
          if (pos === 1) {
            this.bestScore = timeString
          } else if (pos > 5) {
            break
          }
          const row = {
            pos: pos++,
            time: timeString,
            date: this.scores[i].date
          }
          this.scoresSuitable.push(row)
        }
      }
      if (pos === 1) {
        this.bestScore = ''
      }
    }
  },
  watch: {
    newScore () {
      if (this.newScore) {
        this.addTime()
      }
    },
    gameType () {
      this.showScores()
    }
  }
}

</script>

<style scoped>
  .scoresHistory{
    position: absolute;
    width: 25%;
    z-index:10;
    top:150px;
    right:10px;
    opacity: 1;
    background-color: white;
    cursor: initial;
    border-radius: 10px;
  }

  .bestScore{
  }

  .textHistory{
    padding-top: 5px;
    margin-top: 5px;
  }
</style>
