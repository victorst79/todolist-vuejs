import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Weather from './views/Weather.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    }
  ]
})
