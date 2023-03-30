<template>
  <v-dialog
    v-model="showSignOutModal"
    max-width="350"
    style="
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    "
    :persistent="true"
  >
    <v-card>
      <v-card-title>Sign-Out Confirmation</v-card-title>
      <v-card-text> Are you sure you want to Sign-Out? </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="signOut">Yes</v-btn>
        <v-btn color="primary" @click="showSignOutModal = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="main">
    <img class="logo" src="../../src/assets/nusxchange1.png" />
    <h1 style="margin-left: 2%">NUSXchange</h1>
    <div class="link">
      <router-link class="links" to="/">Home</router-link>
      <router-link class="links" to="/university">Universities</router-link>
      <router-link class="links" to="/mapping">Module Mapping</router-link>
      <router-link class="links" to="/generalhelp">General Help</router-link>
    </div>
    <div style="width: 5%; margin-right: -2%; margin-left: auto">
      <img v-if="logIn" id="photo" :src="source" alt="" style="width: 100%" />
    </div>
    <div class="navbar-buttons">
      <router-link v-if="!logIn" class="links" to="/register"
        >Register</router-link
      >
      <router-link v-if="!logIn" class="links" to="/signin"
        >Sign In</router-link
      >
      <router-link
        v-if="logIn"
        class="links"
        to="/signin/account-management-page"
        >Welcome, {{ userName }}</router-link
      >
      <router-link
        v-if="logIn"
        class="links"
        to=""
        @click="showSignOutModal = true"
        >Sign Out</router-link
      >
    </div>
  </div>
</template>

<script>
import { auth, firebaseApp, storage } from "../firebase.js";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
const db = getFirestore(firebaseApp);
export default {
  mounted() {
    // console.log("mount nav bar");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (
          user.emailVerified ||
          user.providerData.some(
            (provider) => provider.providerId === "google.com"
          )
        ) {
          try {
            this.userData = await this.getUserData(user.uid);
            this.userName = this.userData.username;
            this.logIn = true;
            this.photo = this.userData.photo;
            if (this.photo) {
              const imageRef = ref(storage, `images/${user.uid}/profile.jpg`);
              this.source = await getDownloadURL(imageRef);
            }
          } catch (error) {
            this.logIn = false;
            console.log("Logout", error);
          }
        } else {
          this.logIn = false;
        }
      } else {
        this.logIn = false;
      }
    });
  },
  data() {
    return {
      logIn: false,
      userName: "",
      userData: null,
      photo: false,
      source: require("../assets/nusxchangee.png"),
      showSignOutModal: false,
    };
  },
  methods: {
    async getUserData(email) {
      try {
        const docRef = doc(collection(db, "Account"), email);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          return docSnapshot.data();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    async signOut() {
      try {
        await auth.signOut();
        console.log("Logged out");
        this.showSignOutModal = false;
        this.$router.push("/signin");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
#photo {
  border-radius: 50%;
  border: 2px solid black;
  box-shadow: 2px 2px 2px gray;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  margin-top: 20%;
  z-index: 0;
  position: relative;
  max-width: 120%;
}
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
  display: flex;
  align-items: center;
}
.links:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100%;
  width: 40%;
}

.navbar-buttons .links {
  padding: 0% 5%;
}
</style>
