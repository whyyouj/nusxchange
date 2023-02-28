<template>
  <div class="nusxchange-font">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap");
/* @import "../../styles.css"; */
@import url("../../styles.css");
</style>
