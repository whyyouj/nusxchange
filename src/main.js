import App from './App.vue'
import { createApp } from 'vue'
import HomePage from "./components/HomePage.vue"
import MappingPage from "./components/MappingPage.vue"
import UniversityPage from "./components/UniversityPage.vue"
import RegisterPage from "./components/RegisterPage.vue"
import SignInPage from "./components/SignInPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const routes = [
  { path: '/', component: HomePage },
  { path: '/mapping', component: MappingPage },
  { path: '/university', component: UniversityPage },
  { path: '/register', component: RegisterPage },
  { path: '/signin', component: SignInPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})


createApp(App).use(router).use(vuetify).mount('#app')
  

