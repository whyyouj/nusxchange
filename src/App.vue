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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap");
@import url("../styles.css");
@import "~@mdi/font/css/materialdesignicons.css";
</style>
