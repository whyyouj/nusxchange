import App from './App.vue'
import { createApp } from 'vue'
import HomePage from "./components/HomePage.vue"
import MappingPage from "./components/MappingPage.vue"
import ListOfUniversities from "./components/ListOfUniversities.vue"
import IndividualUniversity from "./components/IndividualUniversity.vue"
import RegisterPage from "./components/RegisterPage.vue"
import SignInPage from "./components/SignInPage.vue"
import GeneralHelpPage from "./components/GeneralHelp.vue"
import { createRouter, createWebHistory } from 'vue-router'
import VueDisqus from "vue-disqus"

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
  { path: '/all-universities', component: ListOfUniversities },
  { path: '/individual-university', component: IndividualUniversity , props: {universityName: "City University Of Hong Kong"}},
  { path: '/register', component: RegisterPage },
  { path: '/signin', component: SignInPage },
  { path: '/generalhelp', component: GeneralHelpPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})


createApp(App).use(VueDisqus,{shortname:"nusxchange"}).use(router).use(vuetify).mount('#app')
  

