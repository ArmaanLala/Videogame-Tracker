import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import firebase from 'firebase'
import './components/firebaseInit'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'


Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged( () => {
  if (!app) {
    app= new Vue({
      Vuelidate,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});