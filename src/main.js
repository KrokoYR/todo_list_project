import Vue from 'vue'
import router from './router'

import PouchDB from 'pouchdb-browser'
import PouchVue from 'pouch-vue'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'

// Import local files:
import App from './App.vue'
import PouchStorage from './store/pouchDB'

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);

Vue.config.productionTip = false;
Vue.use(PouchVue, {
  pouch: PouchDB,
  defaultDB: 'tasks'
});
Vue.use(PouchStorage);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
