<template>
  <div class="home">
    <img
      src="https://content.presspage.com/uploads/2580/1920_utown.jpg?10000"
      class="image"
    />
    <div class="login">
      <img
        style="width: 100px; height: 100px"
        src="../assets/nusxchange1.png"
      />
      <h2>Login</h2>
      <div style="width: 70%">
        <v-text-field v-model="email" label="Email" type="email" />
        <v-text-field v-model="password" label="Password" type="password" />
        <v-btn class="button" block @click="Login">Login</v-btn>
        <p
          v-if="invalidSignin"
          style="
            color: red;
            text-align: center;
            font-size: 12px;
            font-family: verdana, arial;
          "
        >
          Invalid Email/Password
        </p>
        <p
          v-if="emailNotVerify"
          style="
            color: red;
            text-align: center;
            color: red;
            font-size: 12px;
            font-family: verdana, arial;
          "
        >
          Please verify your email
        </p>
      </div>
      <p style="margin-top: 5%; text-align: center">or</p>
      <div style="width: 100%" id="firebaseui-auth-container" />

      <div class="error-handling">
        <router-link class="links" to="/password-reset"
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
import { auth } from "../firebase.js";

import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      email: "",
      password: "",
      invalidSignin: false,
      emailNotVerify: false,
      user: null,
    };
  },
  /*created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },*/
  /*async mounted() {
      var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
      await this.googleSignin().then(page => {
      var uiConfig = {
        signInSuccessUrl: page,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      };
      ui.start("#firebaseui-auth-container", uiConfig)
      }).catch(error => {
        console.log("Error checking user: ", error);
      });
      const style = document.createElement('style');
      document.head.appendChild(style);
    }, */

  /*const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
  ui.start('#firebaseui-auth-container', uiConfig);
  try {
    const user = await this.googleSignin();
    if (user) {
      console.log('User logged in:', user);
      this.$router.push('/signin/account-management-page');
    } else {
      console.log('User not logged in.');
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }*/
  /*created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.handleUserStateChange();
      } else {
        this.user = null;
      }
    });
  },*/
  mounted() {
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInSuccessUrl: "/register-google",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },

  methods: {
    async googleSignin() {
      return await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const usersRef = doc(db, "Account", user.uid);
            getDoc(usersRef)
              .then((querySnapshot) => {
                if (querySnapshot.exists()) {
                  const userDoc = querySnapshot.data();
                  console.log("User exists: ", userDoc);
                  resolve("/");
                } else {
                  resolve("/register-google");
                  console.log("User does not exist");
                }
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
                resolve("/register-google");
              });
          } else {
            console.log("User does not exist. Here.k");
            resolve("/register-google");
            reject;
          }
        });
      });
    },
    /*async googleSignin() {
  return new Promise((resolve, reject) => {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const usersRef = doc(db, 'Account', user.uid);
        const querySnapshot = await getDoc(usersRef);
        if (querySnapshot.exists()) {
          console.log('User exists:', querySnapshot.data());
          resolve(user);
        } else {
          console.log('User does not exist.');
          resolve(null);
        }
      } else {
        console.log('User does not exist.');
        resolve(null);
      }
      reject
    });
  });*/
    /*async mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },*/ /*
    async handleUserStateChange() {
      if (this.user) {
        const usersRef = doc(db, "Account", this.user.uid);
        getDoc(usersRef)
          .then((querySnapshot) => {
            if (querySnapshot.exists()) {
              const userDoc = querySnapshot.data();
              console.log("User exists: ", userDoc);
              this.$router.push("/");
            } else {
              console.log("User does not exist");
              this.$router.push("/register-google");
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
            this.$router.push("/register-google");
          });
      } else {
        console.log("User does not exist. Here.k");
        this.$router.push("/register-google");
      }
    },*/

    async Login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log("User logged in:", user);
          this.$router.push("/");
        } else {
          console.error("User email not verified");
          this.emailNotVerify = true;
          this.invalidSignin = false;
          await auth.signOut();
        }
        // Redirect to the desired page after login
      } catch (error) {
        console.error("Login error:", error);
        this.emailNotVerify = false;
        this.invalidSignin = true;

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
  height: 90vh;
  border-radius: 10px;
}
.home .login {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 3%;
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
