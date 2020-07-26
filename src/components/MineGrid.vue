<template>
    <div>
        <div class="grid" :style="gridStyle">
            <MineCell
                    v-for="(cell, i) in grid"
                    :key="i"
                    :cell="cell"
                    @click.native="clickOnCell(i)"
                    @click.right.native="rightClickOnCell(i)"
                    @mousedown.native="mouseDown(i)"
                    @mouseleave.native="mouseLeave(i)"
                    @contextmenu.native.prevent
            >
            </MineCell>
        </div>
        <b-modal
                header-text-variant="success"
                ref="winning-modal"
                id="winning-modal"
                hide-backdrop
                content-class="shadow"
                centered title="Congratulation!!!">
            <p class="my-4">Congratulation, you have finished the Minesweeper!</p>
            <p class="my-4" v-if="difficulty === 'easy' || difficulty === 'intermediate'"> You can now try harder levels ;)</p>
            <template>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="light" @click="tryAgainModal()">
                    Try again ?
                </b-button>
            </template>
        </b-modal>
        <b-modal
                header-text-variant="danger"
                ref="loosing-modal"
                id="loosing-modal"
                hide-backdrop
                content-class="shadow"
                centered title="You died!">
            <p class="my-4">You exploded while clicking a bomb... <br/> You might be luckier soon ;)</p>
            <template>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="light" @click="tryAgainModal()">
                    Try again ?
                </b-button>
            </template>
        </b-modal>
        <canvas id="firework-canvas"  v-if="gameStatus === 'won'"></canvas>
        <div ref="footer" class="empty"></div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex"
import MineCell from './MineCell'

export default {
    name: "MineGrid",
    components: {
        MineCell
    },
    data: function () {
        return {
            smiley: 'happy',
            viewWidth: window.innerWidth,
            viewHeight: window.innerHeight,
            gridStyle: this.getGridStyle(),
            cellDown: null
        }
    },
    methods: {
        ...mapActions(['fetchGrid', 'clickOnCell', 'rightClickOnCell', 'mouseDown', 'mouseLeave']),
        getGridStyle () {
            let dimension = ''
            if ((this.colNumber / this.rowNumber) > (this.viewWidth / this.viewHeight)) {
                dimension = `width: 85vw;`
            } else {
                dimension = `width: ${80 * this.colNumber / this.rowNumber}vh;`
            }
            return `grid-template-columns: repeat(${this.colNumber}, 1fr);` + dimension
        },
        tryAgainModal () {
            // todo restart
            this.$bvModal.hide('winning-modal')
            this.$bvModal.hide('loosing-modal')
        },
    },
    computed: mapGetters(['grid', 'gameStatus', 'difficulty', 'rowNumber', 'colNumber']),
    created() {
        this.fetchGrid();
        this.gridStyle = this.getGridStyle()
    },
    destroyed() {

    },
    watch: {
        gameStatus () {
            if (this.gameStatus === 'loose') {
                this.$refs['loosing-modal'].show()
                this.smiley = 'dead'

            } else if (this.gameStatus === 'won') {
                this.smiley = 'cool'
                // launch firework
                const confetti = require('canvas-confetti')
                let canvas = document.getElementById('firework-canvas')
                // canvas.style.visibility = 'visible'
                let myConfetti = confetti.create(canvas, {
                    resize: true,
                    useWorker: true
                })
                myConfetti({
                    particleCount: 170,
                    spread: 180
                    // any other options from the global
                    // confetti function
                })
                this.$refs['winning-modal'].show()
            }
        },
        difficulty () {
            this.gridStyle = this.getGridStyle()
        },
        rowNumber () {
            this.gridStyle = this.getGridStyle()
        },
        colNumber () {
            this.gridStyle = this.getGridStyle()
        }
    }
}
</script>

<style scoped>
    .header {
        width: available;
        background-color: rgba(232, 241, 255, 0);/*rgba(52, 58, 64, 0.85);*/
        display: flex;
        justify-content: space-between;
        margin-top: 1%;
        height: 60px;
    }
    .header > * {
        background-color: #b74e91;
        width: 100px;
        display: inline;
        vertical-align: baseline;
        margin-top: auto;
        margin-bottom: auto;
        zoom: 1
    }

    .box {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6), -2px -2px 4px rgba(255, 255, 255, 0.7);
        min-height: 30px;
        width: 16vw;
        margin: 7px auto;
        padding: inherit;
        font-size: 1.7vw;
        background-color: white;
        /* background: #f5f5f5; */
        border-radius: 4px;
        text-align: center;
        vertical-align: middle;
        display:inline-block;
        line-height:50px; /* centrage vertical */
    }

    .smiley{
        cursor: pointer;
    }

    .game {
        height: 80vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-right: 0;
        margin-left: 0;
        padding: 0;
        position: relative;
    }
    .game >  {
        flex: 1;
        text-align: center;
    }

    .grid{
        box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6), -4px -4px 6px rgba(255, 255, 255, 0.7);
        border-radius: 2px;
        text-align: center;
        justify-content: space-between;
        width: 100vh;
        margin: 0 auto;
        margin-top: 1%;
        margin-bottom: 1%;
        user-select: none;
        position: relative;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(18, 1fr);
        grid-auto-rows: 1fr;
    }

    .grid:before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    .grid > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    .scores{
        cursor: pointer;
    }

    .help, .timer, .scores{
        line-height:45px; /* centrage vertical */
    }

    #firework-canvas{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index:10;
        top:120px;
        left: 0;
    }

    .img-logos {
        height: 1.7vw;
        margin-top: -5px;
    }

    .empty{
        margin: 0;
        padding: 0;
        height: 0;
    }
</style>
