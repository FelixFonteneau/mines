import Vue from 'vue'
import Router from 'vue-router'
import MineCell from '@/components/MineCell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MineCell',
      component: MineCell
    }
  ]
})
