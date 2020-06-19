<template>
  <div>
    <div
      :aria-expanded="visible ? 'true' : 'false'"
      :class="visible ? null : 'collapsed'"
      @click="visible = !visible"
      aria-controls="collapse-2"
      class="m-1">
      <span class="bestScore">
        <img class="img-logos" src="../img/crown.png" alt="crown"/> {{bestScore}}
      </span>
    </div>
    <b-collapse id="collapse-2" class="scoresHistory" :style="listStyle" v-model="visible">
      <div v-if="this.scoresSuitable.length > 0" >
        <p class="textHistory">Your best times</p>
        <b-table striped hover :items="scoresSuitable" ></b-table>
      </div>
      <div v-else>
        <p class="textHistory">You don't have any record on this game yet. <br/> Try to finish the grid once!</p>
      </div>
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
    },
    hide: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      scores: [],
      scoresSuitable: [],
      listStyle: '',
      bestScore: '',
      visible: false
    }
  },
  mounted () {
    if (localStorage.getItem('scores')) {
      try {
        this.scores = JSON.parse(localStorage.getItem('scores'))
        this.showScores()
        // console.log(this.scores)
      } catch (e) {
        localStorage.removeItem('scores')
      }
    }
    this.listStyle = this.getListStyle()
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
    },
    getListStyle () {
      let style = ''
      if (this.scoresSuitable.length > 10) {
        style = 'overflow-y: scroll;height: 62vh;'
      } else {
        style = ''
      }
      return style
    }
  },
  watch: {
    newScore () {
      if (this.newScore) {
        this.addTime()
      }
      this.listStyle = this.getListStyle()
    },
    gameType () {
      this.showScores()
      this.listStyle = this.getListStyle()
    },
    hide () {
      if (this.visible && this.hide) {
        this.visible = false
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
    top:70px;
    right:10px;
    opacity: 1;
    max-height: 62vh;
    background-color: white;
    cursor: initial;
    border-radius: 10px;
    font-size: 1.75vh;
    line-height: 2.5vh;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(255, 255, 255, 0.5);
  }

  .bestScore{
  }

  .textHistory{
    padding-top: 5px;
    margin-top: 5px;
  }
</style>
