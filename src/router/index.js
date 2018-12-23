import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

const generateRoutes = () => {
  switch (location.hostname) {
    case 'localhost': {
      return {
        path: '/',
        component: Home
      }
    }
    case 'mejiamanuel57.github.io': {
      return {
        path: '/britecore-payments-datatable',
        component: Home
      }
    }
  }
}

Vue.use(Router)

export default new Router({
  routes: generateRoutes,
  mode: 'history'
})
