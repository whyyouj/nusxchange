import App from './App.vue'
import { createApp } from 'vue'
import HomePage from "./components/HomePage.vue"
import MappingPage from "./components/MappingPage.vue"
import ListOfUniversities from "./components/ListOfUniversities.vue"
import IndividualUniversity from "./components/IndividualUniversity.vue"
import RegisterPage from "./components/RegisterPage.vue"
import SignInPage from "./components/SignInPage.vue"
import GeneralHelpPage from "./components/GeneralHelp.vue"
import AccountManagementPage from "./components/AccountManagementPage.vue"
import RegisterPageGoogle from "./components/RegisterPageGoogle.vue"
import PasswordReset from "./components/PasswordReset.vue"
import { createRouter, createWebHistory } from 'vue-router'
import VueDisqus from "vue-disqus"

// Vuex
import { createStore } from "vuex"
const store = createStore({
  state() {
    return {
      moduleInputs: []
    }
  }
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret} from '@fortawesome/free-solid-svg-icons' 
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
library.add(faUserSecret, faLinkedin, faGithub, faYoutube)

const vuetify = createVuetify({
  components,
  directives,
})

const routes = [
  { path: '/', component: HomePage },
  { path: '/mapping', component: MappingPage },
  { path: '/university', component: ListOfUniversities },
  { path: '/university/:universityName', component: IndividualUniversity},
  { path: '/register', component: RegisterPage },
  { path: '/signin', component: SignInPage },
  { path: '/generalhelp', component: GeneralHelpPage },
  { path: '/signin/account-management-page', component: AccountManagementPage},
  { path: '/register-google', component: RegisterPageGoogle},
  { path: '/password-reset', component: PasswordReset}
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})


createApp(App).
  use(VueDisqus,{shortname:"nusxchange"}).
  use(router).
  use(vuetify).
  use(store).
  component("font-awesome-icon", FontAwesomeIcon).
  mount('#app')

  

