import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(Vuelidate)

// import 'firebase/auth'
// import 'firebase/database'
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC76R-qgWPJRqXvwBjDExre556nd3U9boc",
//   authDomain: "project-173ur.firebaseapp.com",
//   databaseURL: "https://project-173ur-default-rtdb.firebaseio.com",
//   projectId: "project-173ur",
//   storageBucket: "project-173ur.appspot.com",
//   messagingSenderId: "347658838357",
//   appId: "1:347658838357:web:21f2fad63d3098ac618fdc",
//   measurementId: "G-D7TJLEHCWJ"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

