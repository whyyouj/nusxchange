<template>
  <div class="main">
    <img class="logo" src="../../src/assets/nusxchange.png" />
    <h1 style="margin-left: 2%">NUSXchange</h1>
    <div class="link">
      <router-link class="links" to="/">Home</router-link>
      <router-link class="links" to="/all-universities"
        >Universities</router-link
      >
      <router-link class="links" to="/individual-university"
        >Individual University</router-link
      >
      <router-link class="links" to="/mapping">Module Mapping</router-link>
      <router-link class="links" to="/generalhelp">General Help</router-link>
    </div>
    <div class="navbar-buttons">
      <router-link class="links" to="/register">Register</router-link>
      <router-link class="links" to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  color: rgba(255, 255, 255, 0.85);
  background-color: var(--primary);
  font: bold;

  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}

.main .logo {
  width: 50px;
  height: 50px;
  margin-left: 2%;
}
.link {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 90%;
  padding-left: 5%;
}

.links {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 3% 3%;
}
.links:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 25%;
  margin-left: auto;
}
</style>
