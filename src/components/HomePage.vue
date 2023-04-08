<template>
  <div class="container">
    <div class="section">
      <h1>FIND ALL YOU NEED ABOUT NUS STUDENT EXCHANGE PROGRAMME</h1>
      <div style="margin-top: 20px">
        <router-link class="links" to="/mapping">
          <button class="button" style="margin-right: 190px">
            Module Mapping
          </button>
        </router-link>
        <router-link class="links" to="/generalhelp">
          <button class="button">General Help</button>
        </router-link>
      </div>
    </div>
    <div class="carousel">
      <CarouselBanner />
      <router-link class="links" to="/university">
        <button
          class="button"
          style="background-color: #b6d0e1; color: white; width: 190px"
        >
          Browse Universities
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import CarouselBanner from "./CarouselBanner.vue";

export default {
  components: {
    CarouselBanner,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  background: linear-gradient(to bottom, #cbdeed, #ffffff);
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.section {
  display: flex;
  flex-direction: column;
  width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.carousel {
  display: flex;
  flex-direction: column;
  width: 680px;
  margin-top: 15px;
  padding-bottom: 20px;
}

h1 {
  font-size: 50px;
}

button {
  width: 150px;
  height: 45px;
  border-radius: 15px;
  background-color: #ffffff;
  color: #194569;
  font-size: 16px;
  font-weight: normal;
}

button:hover {
  transform: scale(1.08);
  transition: all 0.3s ease;
}
</style>
