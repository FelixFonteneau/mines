<template>
  <div class="cell"
       :class="getClass()"
       :style="getCellStyle()"
       >

  <div v-if="cell.hasFlag">
    <img class="img-cell"
         src="../img/flag.png"
         alt="flag"
         :height="imgHeight"/>
    </div>
    <div v-else-if="cell.hasBomb && cell.isOpen">
      <img class="img-cell"
           src="../img/bomb.png"
           alt="bomb"
           :height="imgHeight"/>
    </div>
    <div v-else-if="cell.isOpen && cell.bombNb">
      {{ cell.bombNb }}
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MineCell',
  props: {
    cell: {
      type: Object,
      required: true
    },
    isFinished: {
      type: Boolean,
      required: true
    },
    haveWon: {
      type: Boolean,
      required: true
    },
    gridDimension: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      imgHeight: 0
    }
  },
  created () {
    window.addEventListener('resize2', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize2', this.handleResize)
  },
  methods: {
    getClass () {
      if (this.isFinished) {
        if (this.cell.hasFlag && !this.cell.hasBomb) {
          return 'flag open'
        }
        if (this.cell.hasBomb && !this.haveWon) {
          return 'bomb'
        }
        if (this.cell.hasBomb && this.haveWon) {
          return 'flag'
        }
        if (this.cell.hasFlag) {
          return 'flag'
        }
        if (!this.cell.isOpen) {
          return 'notClickable'
        }
        if (this.cell.isOpen && this.haveWon) {
          return 'open nb' + this.cell.bombNb + ' won'
        }
      }
      if (this.cell.isOpen && this.cell.hasBomb) {
        return 'bomb'
      }
      if (this.cell.isOpen) {
        return 'open nb' + this.cell.bombNb
      }
      if (this.cell.hasFlag) {
        return 'flag'
      }
      if (this.cell.pressed) {
        return 'pressed'
      }
      return ''
    }, // TODO remake the style
    getCellStyle () {
      let dimension = ''
      if ((this.gridDimension[0] / this.gridDimension[1]) > (window.innerWidth / window.innerHeight)) {
        dimension = `font-size: ${2.5 * this.gridDimension[1] / this.gridDimension[0]}vw;`
      } else {
        dimension = `font-size: ${1.5 * this.gridDimension[0] / this.gridDimension[1]}vh;`
      }
      return dimension // "font-size: ' + (450 / (this.nbCols * this.nbRows)) + 'em;'
    },
    getImageHeight () {
      let height
      if ((this.gridDimension[0] / this.gridDimension[1]) > (this.viewWidth / this.viewHeight)) {
        height = 0.01 * window.innerWidth
      } else {
        height = 0.01 * this.gridDimension[0] / this.gridDimension[1] * window.innerHeight
      }
      return Math.floor(height)
    },
    handleResize () {
      this.imgHeight = this.getImageHeight()
    }
  }
}
</script>

<style >
  .cell {
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border: 2px outset white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    min-height: 10px;
    min-width: 10px;
    border-radius: 2px;
  }

  .bomb {
    border: 1px solid #EEEEEE;
    background: #c0392b;
    cursor:initial;
  }
  .flag {
    color: rgba(241, 2, 27, 0.82);
    cursor:initial;
  }

  .notClickable{
    cursor:initial;
  }

  .open {
    border: 1px solid #EEEEEE;
    cursor:initial;
    background: rgba(178, 118, 255, 0.11);
    font-weight: bold; /* same as 700 */
  }
  .nb1 {
    color: rgba(0, 71, 155, 0.76);
  }
  .nb2 {
    color: rgba(15, 179, 53, 0.81);
  }
  .nb3 {
    color: rgba(209, 0, 19, 0.77);
  }
  .nb4 {
    color: rgba(130, 0, 191, 0.73);
  }
  .nb5 {
    color: rgba(130, 37, 0, 0.82);
  }
  .nb6 {
    color: rgba(0, 206, 209, 0.84);
  }
  .nb7 {
    color: rgba(34, 34, 34, 0.97);
  }
  .nb8 {
    color: rgba(70, 70, 70, 0.61);
  }

  .won{
    background: rgba(119, 255, 111, 0.12);
  }

  .pressed{
    background: rgba(0, 0, 0, 0.3);
    border: 1px inset white;
  }

</style>
