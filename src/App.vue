<template>
  <div class="nusxchange-font">
    <NavBar :key="$route.fullPath" />
    <router-view></router-view>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
export default {
  components: {
    NavBar,
    FooterBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap");
@import url("../styles.css");
@import "~@mdi/font/css/materialdesignicons.css";

a {
  text-decoration: none;
  color: var(--primary);
  font-weight: bold;
  text-align: left;
}
a:hover {
  color: rgb(144, 175, 196);
}
</style>
