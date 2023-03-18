<template>
<v-dialog v-model="showErrorModal" max-width="700" style= "  margin: auto; display: flex; flex-direction: column;justify-content: center;height: 100%;">
  <v-card>
    <v-card-title>Error</v-card-title>
    <v-card-text>
      <div v-if="this.password !==  this.confirmPassword || this.password.length <6">Please ensure that both passwords match and is at least 6 characters long.</div>
      <div v-else-if="!formIsValid">Please check that the required fields are filed.</div>
      <div v-else>There was an error in the form. Please fill in another email addres.</div>
    </v-card-text> 
    <v-card-actions >
      <v-btn color="primary" @click="showErrorModal = false" >OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  <div class="register">
    <img id='image' src="../assets/register.png" alt="">
  <div class="" >
    <h2 style="transform: translateX(60%)">Register</h2>
    <form id="form">
    <v-text-field v-model="userName" label="Username *" type="text" required/>
    <!--v-text-field v-model="name" label="Name *" type='text' required/-->
    <v-text-field v-model="email" label="Email *" type="email" required/>
    <v-autocomplete v-model="major" label="Select Your Major *" :items="majorOption"> 

      <v-list>
        <v-list-item v-for="(option, index) in majorOption" :key="index" @click="major = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-autocomplete>
    <v-text-field v-model="password" label="Password *" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" required>
      <template v-slot:append >
        <v-btn style="  width: 5px; height: 10px;" icon @click="showPassword = !showPassword">
          <v-icon>{{ showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye' }}</v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <v-text-field v-model="confirmPassword" label="Confirm Password *" :type="showPassword ? 'text' : 'password'" required/>
    <v-text-field v-model="tele" label="Telegram Handle" type="text" />
    <v-autocomplete v-model="exchangeUni" label="Exchange University" :items="uniOption"> 

      <v-list>
        <v-list-item v-for="(option, index) in uniOption" :key="index" @click="exchangeUni = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-autocomplete>
    <v-autocomplete v-model="semester" label="Semester" :items="semesterOption"> 

      <v-list>
        <v-list-item v-for="(option, index) in semesterOption" :key="index" @click="semester = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-autocomplete>

    <v-btn class="button" block @click="register" style="transform: translateX(60%)">Register</v-btn>
    </form>
  </div>
</div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';
import {auth, firebaseApp} from '../firebase.js';
import {getFirestore} from 'firebase/firestore'
import {doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(firebaseApp);


export default {
    name: "RegisterPage",

    data() {
      return {
        showPassword: false,
        majorOption: ["hello", "ok"],
        userName: "",
        name: "",
        email: "",
        major: "",
        password: "",
        confirmPassword: "",
        tele: "",
        exchangeUni: "",
        semester: "",
        uniOption: ['None','a','b'],
        semesterOption: ["None",'a','b'],
        showErrorModal: false,      
      }
    }, 


    methods: {

    async register() {
        if (this.formIsValid) {
          try {
            // Register the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              this.email,
              this.password
            );

            // Add the user information to Firestore
            await this.addAccount(userCredential.user);

            // Navigate to the account management page
            this.$router.push("/signin/account-management-page");
            document.getElementById('form').reset()
          } catch (error) {
            console.error("Error registering user", error);
            
          }
        } 
        else {
          this.showErrorModal = true;
        }
    },

      async addAccount() {
      try {
        const docRef = await setDoc(doc(db, "Account", this.email), {
          username: this.userName,
          email: this.email,
          major: this.major,
          password: this.password,
          telegram: this.tele ? this.tele : "",
          exchangeUniversity: this.exchangeUni ? this.exchangeUni : "None",
          favouriteUniversity: [],
          semester: this.semester ? this.semester : "None",
          photo: false,
          })
          console.log(docRef)
      }
      catch(error) {
        console.error("Error adding document", error)
        this.showErrorModal = true
      }
      },
    },

    computed: {
      formIsValid() {
        return (
          this.userName &&
          this.email &&
          this.majorOption.includes(this.major) &&
          this.password.length > 5 &&
          this.confirmPassword &&
          this.password === this.confirmPassword &&
          (!this.exchangeUni || this.uniOption.includes(this.exchangeUni)) &&
          (!this.semester || this.semesterOption.includes(this.semester))
        );
      },
    },
}
</script>

<style scoped>

.register {
  display: flex;
  flex-flow: row nowrap;
}
#image {
  width: 100%;
  height: 100%;
  margin-right: 10%;
}

.button {
  background-color: var(--primary);
  color: white;
}
.register {
  justify-content: center;
  font-size: 14px;
  width: 80%;
}


.v-text-field {
  color: var(--secondary);
  width: 250%;
  height: 8%;
  margin-bottom: -20%;
}

/*#inner-v {
  position: absolute;
  top: 52%;
  margin-left: 16%;
  border: none;
  cursor: pointer;
}*/
.register {
  align-self: center;
  font-weight: bold;
}
.register h3, .register .button {
  text-align: center;
  width: 100%;
}

.input-container {
  display: flex;
  align-items: center;
}

#inner-v {
  margin-left: 5px;
}

.small {
  width: 10px;
  height: 10px; 
}

</style>
