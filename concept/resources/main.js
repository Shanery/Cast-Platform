import Vue from 'vue'
import App from './App.vue'
import Doc from './documentation.vue'

import '../node_modules/bulma/css/bulma.css'


window.Event = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#document',
  render: h => h(Doc)
})

