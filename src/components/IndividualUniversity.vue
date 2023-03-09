<template>
  <div class="main">
    <div style="display: flex; justify-content: space-between">
      <div class="uni-name">
        <h1>University of Manchester</h1>
      </div>
      <div class="favourite" style="align-self: center; padding-right: 2%">
        <v-icon
          :class="isPressed ? 'red--text' : ''"
          @click="isPressed = !isPressed"
        >
          {{ isPressed ? "mdi-cards-heart" : "mdi-heart-outline" }}
        </v-icon>
      </div>
    </div>
    <img
      class="image"
      src="https://www.wur.nl/upload/6f37ab47-390e-4a11-8677-7728208787e3_291033426_6067606606599046_5002841370475822249_n.jpg"
    />
    <div class="subtitle">
      <span>Location: <strong>England, Manchester</strong></span>
      <span>Minimum GPA: <strong>4.0/5.0</strong></span>
      <span>Reviews: <strong> 2</strong></span>
      <span>Language Proficiency Requirements: <strong>English</strong></span>
    </div>
    <v-divider></v-divider>
    <div class="details">
      <div class="description">
        The University of Manchester is based in the north of England and is
        among the largest universities in the UK, with around 38,000 students
        (almost 9,000 international) currently enrolled alongside 10,000 staff.
        The University is famous for its academic and research excellence, and
        is also a member of the Russell Group.
      </div>
      <div style="display: flex; width: 100%">
        <div class="academic-window">
          <h3>Academic Window:</h3>
          <p>Semester 1: Mid-September to late January</p>
          <p>Semester 2: Late January to early June</p>
        </div>
        <div class="vacancies">
          <h3>Vacancies:</h3>
          <p>Semester 1: 6</p>
          <p>Semester 2: 6</p>
        </div>
      </div>
      <v-divider></v-divider>
      <div style="display: flex; justify-content: space-around">
        <div class="attractions">attractions!</div>
        <div class="google-maps">google maps!</div>
      </div>
      <div class="forum">
        <Disqus shortname="nusxchange" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPressed: false,
    };
  },
};
</script>

<style scoped>
.main {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.main > * {
  margin: 1% 0%;
}
strong {
  font-weight: bold;
}
.image {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.subtitle {
  font-weight: 300;
  color: var(--secondary);
  color: #5f84a1;
  display: flex;
  justify-content: space-between;
}
.description {
  font-weight: 500;
  width: 50%;
  margin-bottom: 5%;
}
.academic-window,
.vacancies {
  font-weight: 100;
  display: flex;
  flex-direction: column;
  width: 50%;
}
.attractions {
  background-color: #5f84a1;
  width: 50%;
  height: 500px;
}
.google-maps {
  background-color: green;
  width: 50%;
  height: 500px;
}
</style>
