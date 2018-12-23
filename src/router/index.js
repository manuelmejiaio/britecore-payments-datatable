import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

const generatePath = () => {
  switch (location.hostname) {
    case 'localhost':
      return '/'
    case 'mejiamanuel57.github.io': return '/britecore-payments-datatable'
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: generatePath,
      name: 'Home',
      component: Home
    }
  ],
  mode: 'history'
})
