// Import modules:
import Vue from 'vue'
import VueRouter from 'vue-router'
// Import app's views:
import Home from '../views/Home.vue'
import CreateList from '../views/CreateList.vue'

// Enable vue-router at Vue:
Vue.use(VueRouter)

// Vue routes:
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: {
      getArchived: false,
      getActive: true
    }
  },
  {
    path: "/todolists/edit/:id",
    name: "EditList",
    component: CreateList
  },
  {
    path: "/todolists/new/",
    name: "CreateList",
    component: CreateList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
