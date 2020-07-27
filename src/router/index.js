import Vue from 'vue'
import Router from 'vue-router'
import MineGrid from '../components/MineGrid'
import NotFoundPage from '../components/NotFoundPage'
import HelpPage from '../components/HelpPage'
import ScoresPage from '../components/ScoresPage'
import WelcomePage from "../components/WelcomePage";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/mines/',
  routes: [
    {
      path: '/',
      name: 'welcomePage',
      component: WelcomePage
    },
    {
      path: '/game',
      name: 'gamePage',
      component: MineGrid,
    },
    /*{
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
    }, */ {
      path: '/help',
      name: 'helpPage',
      component: HelpPage
    }, {
      path: '/scores',
      name: 'scoresPage',
      component: ScoresPage
    }, {
      path: '*',
      name: '404',
      component: NotFoundPage
    }
  ]
})
