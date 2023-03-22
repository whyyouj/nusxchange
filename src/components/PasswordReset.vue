<template>
<v-dialog v-model="showSuccessModal" max-width="700" style= "  margin: auto; display: flex; flex-direction: column;justify-content: center;height: 100%;" :persistent="true">
  <v-card>
    <v-card-title style="color: green">Success</v-card-title>
    <v-card-text style="color: green">
      Success! A link to reset your password has been sent to your email.
    </v-card-text> 
    <v-card-actions >
      <v-btn color="green" @click="closeSuccessModal" >OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  <div class="home">
    <img
      src="https://content.presspage.com/uploads/2580/1920_utown.jpg?10000"
      class="image"
    />
    <div class="login">
      <!--img style="width: 80px; height: 80px" src="../assets/nusxchange.png" /-->
      
      <div style="width: 70%">
        <h4 style="margin-bottom: 5%">Please enter your registered email</h4>
        <v-text-field v-model="email" label="Email" type="email" />
        <v-btn class="button" block @click="emailVeri">Get reset link</v-btn>
        <p v-if="invalidEmail" style="color: red; text-align:center">Invalid Email</p>
        <router-link class="links" to="/signin"
          style="color: var(--secondary);
  align-self: center;
  font-weight: bold; font-size: 14px;">Sign-In Page</router-link
        >

        <div
          style="
            display: flex;
            align-content: center;
            justify-content: space-between;
          "
        >
      </div>
      </div>

      
    </div>
  </div>
</template>






<script>
import {auth} from '../firebase.js';
import { sendPasswordResetEmail } from "firebase/auth";
export default {
    name: "PasswordReset",
    methods: {
        async emailVeri() {
            try {
                await sendPasswordResetEmail(auth, this.email)
                this.showSuccessModal = true
                this.invalidEmail = false
                console.log("Email verifiation send to user")
            } catch(error) {
                this.invalidEmail = true
                console.error("Error in sending email verification", error)
            }
        },
        closeSuccessModal() {
            this.$router.push("/signin")
            this.showSuccessModal = false;
        }
    },
    data() {
        return {
            email: "",
            invalidEmail: false,
            showSuccessModal: false,
        }
    }

    
}
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
  margin-top: 3%;
  margin-bottom: 5%;
}
.home .button {
  background-color: var(--primary);
  color: white;
}


</style>
