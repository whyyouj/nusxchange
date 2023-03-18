<template>
  <div class="home">
    <img
      src="https://content.presspage.com/uploads/2580/1920_utown.jpg?10000"
      class="image"
    />
    <div class="login">
      <img style="width: 80px; height: 80px" src="../assets/nusxchange.png" />
      <h2>Login</h2>
      <div style="width: 70%">
        <v-text-field v-model="email" label="Email" type="email" />
        <v-text-field v-model="password" label="Password" type="password" />
        <v-btn class="button" block @click="Login">Login</v-btn>
      </div>
      <div class="error-handling">
        <router-link class="links" to="/register"
          >Forgot your password?</router-link
        >
        <div
          style="
            display: flex;
            align-content: center;
            justify-content: space-between;
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async Login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      this.$router.push("/signin/account-management-page"); // Redirect to the desired page after login
    } catch (error) {
      console.error("Login error:", error);
      // Handle errors here, such as displaying an error message to the user
    }
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
}
.home .login .button {
  background-color: var(--primary);
  color: white;
}
.home .error-handling {
  justify-content: center;
  font-size: 14px;
  width: 60%;
  margin-top: 5%;
  width: 70%;
}
.home .error-handling .links {
  color: var(--secondary);
  align-self: center;
  font-weight: bold;
}
</style>
