import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../components/Welcome'
import MineGrid from '../components/MineGrid'
import CustomGame from '../components/CustomGame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome.vue',
      component: Welcome
    },
    {
      path: '/easy',
      name: 'gameEasy',
      component: MineGrid,
      props: {
        nbCols: 10,
        nbRows: 8,
        nbBombs: 10,
        restartGame: false
      }
    }, {
      path: '/medium',
      name: 'gameMedium',
      component: MineGrid,
      props: {
        nbCols: 16,
        nbRows: 14,
        nbBombs: 40,
        restartGame: false
      }
    }, {
      path: '/normal',
      name: 'gameNormal',
      component: MineGrid,
      props: {
        nbCols: 30,
        nbRows: 16,
        nbBombs: 99,
        restartGame: false
      }
    }, {
      path: '/custom',
      name: 'gameCustom',
      component: CustomGame
    }
  ]
})
