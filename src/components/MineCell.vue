<template>
  <div class="cell" :class="getClass()">
    <div v-if="hasFlag">
      &#9873;
    </div>
    <div v-if="isOpen && bombNb">
      {{ bombNb }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MineCell',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    hasBomb: {
      type: Boolean,
      required: true
    },
    hasFlag: {
      type: Boolean,
      required: true
    },
    bombNb: {
      type: Number,
      required: true
    }
  },
  methods: {
    getClass () {
      if (this.isOpen && this.hasBomb) {
        return 'bomb'
      }
      if (this.isOpen) {
        return 'open nb' + this.bombNb
      }
      if (this.hasFlag) {
        return 'flag'
      }
      return ''
    }
  }
}
</script>

<style >
  .cell {
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    border: 1px white solid;
    cursor: pointer;
    display: flex;
    font-size: 1.3em;
    justify-content: center;
    min-height: 35px;
    min-width: 35px;
  }

  .bomb {
    background: #c0392b;
    cursor:initial;
  }
  .flag {
    color: rgba(241, 2, 27, 0.82);
    cursor:initial;
  }

  .open {
    cursor:initial;
    background: rgba(136, 0, 242, 0.14);
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

</style>
