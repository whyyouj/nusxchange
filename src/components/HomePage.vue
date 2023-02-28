<template>
  <div class="home">
    <img
      src="https://content.presspage.com/uploads/2580/1920_utown.jpg?10000"
      class="image"
    />
    <div class="login">
      <h2>Login</h2>
      <input v-model="email" placeholder="Enter email here." />
      <input v-model="password" placeholder="Enter password here." />
      <button @click="testLogin">Login</button>
      <div class="error-handling">
        <router-link class="links" to="/register"
          >Forgot your password?</router-link
        >
        <div
          style="
            display: flex;
            align-content: center;
            justify-content: space-around;
          "
        >
          <h3>Don't have an account?</h3>
          <router-link class="links" to="/register">Register Here</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    testLogin() {
      console.log(this.email);
      console.log(this.password);
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-flow: row nowrap;
}
.home .image {
  width: 70%;
  height: 100%;
  border-radius: 10px;
}
.home .login {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
  color: #194569;
}
.home .error-handling {
  justify-content: center;
  font-size: 14px;
  width: 60%;
}
.home .error-handling .links {
  color: #5f84a2;
  align-self: center;
  font-weight: bold;
}
</style>
