<template>
  <div class="main">
    <h1 style="margin-left: 2%">NUSXchange</h1>
    <div class="link">
      <router-link class="links" to="/">Home</router-link>
      <router-link class="links" to="/university">Universities</router-link>
      <router-link class="links" to="/mapping">Module Mapping</router-link>
    </div>
    <div class="navbar-buttons">
      <router-link class="links" to="/register">Register</router-link>
      <router-link class="links" to="/signin">Sign In</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  color: rgba(255, 255, 255, 0.85);
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  background-color: #194569;
  width: 100%;
  height: 10%;
  display: flex;
}

.link {
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  justify-content: flex-start;
  width: 40%;
  padding-left: 5%;
}

.links {
  color: rgba(255, 255, 255, 0.85);
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  text-decoration: none;
  padding: 20px 50px;
}
.links:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-self: center;
  width: 20%;
  margin-left: auto;
}
</style>
