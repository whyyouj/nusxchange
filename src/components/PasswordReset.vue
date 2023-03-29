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
    <div class="reset-password">
      <!--img style="width: 80px; height: 80px" src="../assets/nusxchange.png" /-->
      <img style="width: 100px; height: 100px" src="../assets/nusxchange.png" />
      <h2>Reset Password</h2>
      <div style="width: 70%">
        <v-text-field v-model="email" label="Enter your registered email" type="email" />
        <v-btn class="button" block @click="emailVeri">Get reset link</v-btn>
        <p v-if="invalidEmail" style="color: red; text-align:center">Invalid Email</p>
        

        <div class="back">
        <h3>Back:</h3>   <router-link class="links" to="/signin">Sign-In Page</router-link>
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
  height: 90vh;
  border-radius: 10px;
}
.home .reset-password {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 5%;
  height:70%;
}
.home .button {
  background-color: var(--primary);
  color: white;
}
.back {
justify-content: center;
  font-size: 14px;
  width: 45%;
  margin-top: 5%;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.back .links {
  color: var(--secondary);
  align-self: center;
  font-weight: bold;

}


</style>
