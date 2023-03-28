<template>
<div v-if='view'>
<!--v-dialog v-model="showErrorModal" max-width="500" style= " margin: auto; display: flex; flex-direction: column;justify-content: center;height: 100%;">
  <v-card>
    <v-card-title style= "color:red;">Error</v-card-title>
    <v-card-text>
      <div v-if="!(this.userName && this.major)">Ensure that all required fields are filed.</div>

    </v-card-text> 
    <v-card-actions >
      <v-btn color='blue-grey-darken-2' @click="showErrorModal = false, errorMessage = ''" >OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog-->

    <v-snackbar v-model="showErrorModal" :timeout="3000" style="left: 65%; right: 0; transform: translateY(-25%);">
    <div v-if="!(this.userName && this.major)" style="color: red">
        Error. Ensure that all required fields are filled.
    </div>
    <template v-slot:actions>
        <v-btn color="grey" variant="text" @click="showErrorModal = false">
        Close
        </v-btn>
    </template>
    </v-snackbar>

  <v-snackbar v-model="showSuccessModal" :timeout="3000" style="left: 65%; right: 0; transform: translateY(-25%);">
    <div style="color: green">
      Success!
    </div>
    <template v-slot:actions>
        <v-btn color="grey" variant="text" @click="closeSuccessModal">
        Close
        </v-btn>
    </template>
  </v-snackbar>


  <div class="register">
    <img id='image' src="../assets/register.jpg" alt="">
  <div class="" >
    <h2 style="transform: translateX(65%)">Register</h2>
    <form id="form">
    <v-text-field v-model="userName" label="Username *" type="text" required/>
    <v-autocomplete v-model="major" label="Select Your Major *" :items="majorOption"> 

      <v-list>
        <v-list-item v-for="(option, index) in majorOption" :key="index" @click="major = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-autocomplete>

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

    <v-btn class="button" block @click="register" style="transform: translateX(60%) ">Register</v-btn>
    </form>
  </div>
</div>
</div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';
import {auth, firebaseApp} from '../firebase.js';
import {getFirestore} from 'firebase/firestore'
import {doc, setDoc, getDocs, collection, getDoc} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);


export default {
    name: "RegisterPageGoogle",
    async beforeMount() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
            const usersRef = doc(db, 'Account', user.uid);
            const querySnapshot = await getDoc(usersRef);
            if (querySnapshot.exists()) {
            console.log('User exists:', querySnapshot.data());
            this.registerUser = true;
            this.$router.push("/");
            } else {
            console.log('User does not exist.');
            this.view = true
            }
            } else {
                console.log('User does not exist.');
                this.view = true
            }
                })
    },
    async mounted() {
        const universityList = await getDocs(collection(db, 'ListOfUniversities'))
        universityList.forEach((docs) => {
          this.uniOption.push(docs.id)
        })
        const year = new Date().getFullYear() % 100
        const year2 = year + 1
        const year3 = year + 2
        this.semesterOption.push("Semester 1"+ ", "+year+"/"+ year2)
        this.semesterOption.push("Semester 2"+ ", " +year+"/"+ year2)
        this.semesterOption.push("Semester 1"+ ", " +year2+"/"+ year3)
        this.semesterOption.push("Semester 2"+ ", " +year2+"/"+ year3  )
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user
            }
        })
    },
    async unmounted() {
        if (!this.registerUser) {
            auth.signOut()
            console.log("Sign out unregistered user account")
        }
    },
    data() {
      return {
        majorOption: ['College of Humanities and Sciences (CHS)','NUS Business School', 'Computing', 'Dentistry', 'College of Design and Engineering (CDE)','Law', 'Medicine','Nursing','Pharmacy','Nus College', "Music"],
        userName: "",
        name: "",
        major: "",
        tele: "",
        exchangeUni: "",
        semester: "",
        uniOption: ['None'],
        semesterOption: ["None"],
        errorMessage: "",
        showErrorModal: false,
        user: null,
        view: false,
        registerUser: false,
        showSuccessModal:false,
      }
    }, 

    watch: {
        showSuccessModal(value) {
        if (!value) {
            this.closeSuccessModal()
        }
        }
    },

    methods: {

    async register() {
        if (this.formIsValid) {


            // Navigate to the account management page
            await this.addAccount(this.user)
            this.registerUser = true
            this.showSuccessModal = true;
            document.getElementById('form').reset()
        } 
        else {
          this.showErrorModal = true;
        }
    },

      async addAccount() {
      try {
        const docRef = await setDoc(doc(db, "Account", this.user.uid), {
          username: this.userName,
          email: null,
          major: this.major,
          password: false,
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

    closeSuccessModal() {
            this.$router.push("/")
        },  

    },

    

    computed: {
      formIsValid() {
        return (
          this.userName &&
          this.majorOption.includes(this.major) &&
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
  width: 90%;
  height: 90vh;
  margin-right: 10%;
  border-radius: 1%;
}

.button {
  background-color: var(--primary);
  color: white;
  margin-top: 10%;
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
  margin-top: 10%
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