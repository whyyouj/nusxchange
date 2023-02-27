import App from './App.vue'
import { createApp } from 'vue'
import HomePage from "./components/HomePage.vue"
import MappingPage from "./components/MappingPage.vue"
import UniversityPage from "./components/UniversityPage.vue"
import RegisterPage from "./components/RegisterPage.vue"
import SignInPage from "./components/SignInPage.vue"
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomePage },
  { path: '/mapping', component: MappingPage },
  { path: '/university', component: UniversityPage },
  { path: '/register', component: RegisterPage },
  { path: '/signin', component: SignInPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

createApp(App).use(router).mount('#app')
  

