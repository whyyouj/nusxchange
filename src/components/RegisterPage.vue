<template>
  <!--v-dialog
    v-model="showErrorModal"
    max-width="500"
    style="
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    "
  >
    <v-card>
      <v-card-title>Error</v-card-title>
      <v-card-text>
        <div
          v-if="
            !(
              this.userName &&
              this.email &&
              this.major &&
              this.password &&
              this.confirmPassword
            )
          "
        >
          Ensure that all required fields are filed.
        </div>
        <div
          v-else-if="
            this.password !== this.confirmPassword || this.password.length < 6
          "
        >
          Ensure that both passwords are the same and at least 6 characters
          long.
        </div>
        <div v-if="this.errorMessage">
          Email invalid / taken. Please fill in another email address.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="(showErrorModal = false), (errorMessage = '')"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog-->

  <v-snackbar v-model="showErrorModal" :timeout="3000" style="left: 70%; right: 0; transform: translateY(-1%);">
    <div id="v-snack" v-if="
        !(
          this.userName &&
          this.email &&
          this.major &&
          this.password &&
          this.confirmPassword
        )
      ">
        Ensure that all required fields are filled.
    </div>
    <div id="v-snack"
          v-else-if="
            this.password !== this.confirmPassword || this.password.length < 6
          "
    >
        Ensure that both passwords are the same / 6 characters long.
    </div>
    <div id="v-snack" v-else-if="this.errorMessage">
      Email invalid / taken. Please fill in another email address.
    </div>
    <template v-slot:actions>
        <v-btn color="grey" variant="text" @click="(showErrorModal = false), (errorMessage = '') ">
        Close
        </v-btn>
    </template>
  </v-snackbar>

  <!--v-dialog
    v-model="showSuccessModal"
    max-width="700"
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
      <v-card-title style="color: green">Success</v-card-title>
      <v-card-text style="color: green">
        Success! Please verify your email before Signing In.
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="closeSuccessModal">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog-->

  <v-snackbar v-model="showSuccessModal" :timeout="3000" style="left: 70%; right: 0; transform: translateY(-5%);">
    <div style="color: green">
      Success! Please verify your email before Signing In.
    </div>
    <template v-slot:actions>
        <v-btn color="grey" variant="text" @click="closeSuccessModal">
        Close
        </v-btn>
    </template>
  </v-snackbar>


  <div class="register">
    <img id="image" src="../assets/register.jpg" alt="" />
    <div class="">
      <h2 style="transform: translateX(65%); margin-top: 5%">Register</h2>
      <form id="form">
        <v-text-field
          v-model="userName"
          label="Username *"
          type="text"
          :maxlength="20"
          required
        />
        <!--v-text-field v-model="name" label="Name *" type='text' required/-->
        <v-text-field v-model="email" label="Email *" type="email" required />
        <v-autocomplete
          v-model="major"
          label="Select Your Faculty *"
          :items="majorOption"
        >
          <v-list>
            <v-list-item
              v-for="(option, index) in majorOption"
              :key="index"
              @click="major = option"
            >
              <v-list-item-title>{{ option }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-autocomplete>
        <v-text-field
          v-model="password"
          label="Password *"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          required
        >
          <template v-slot:append>
            <v-btn
              style="width: 5px; height: 10px"
              icon
              @click="showPassword = !showPassword"
            >
              <v-icon>{{
                showPassword ? "mdi mdi-eye-off" : "mdi mdi-eye"
              }}</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password *"
          :type="showPassword ? 'text' : 'password'"
          required
        />
        <v-text-field v-model="tele" label="Telegram Handle" type="text" />
        <v-autocomplete
          v-model="exchangeUni"
          label="Exchange University"
          :items="uniOption"
        >
          <v-list>
            <v-list-item
              v-for="(option, index) in uniOption"
              :key="index"
              @click="exchangeUni = option"
            >
              <v-list-item-title>{{ option }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-autocomplete>
        <v-autocomplete
          v-model="semester"
          label="Semester"
          :items="semesterOption"
        >
          <v-list>
            <v-list-item
              v-for="(option, index) in semesterOption"
              :key="index"
              @click="semester = option"
            >
              <v-list-item-title>{{ option }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-autocomplete>
      </form>
      <v-btn
        class="button"
        block
        @click="register"
        style="transform: translateX(65%; margin-top: 5%"
        >Register</v-btn
      >
    </div>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.min.css";
import { auth, firebaseApp } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "RegisterPage",

  async mounted() {
    const universityList = await getDocs(collection(db, "ListOfUniversities"));
    universityList.forEach((docs) => {
      this.uniOption.push(docs.id);
    });
    const year = new Date().getFullYear();
    const year2 = year + 1;
    const year3 = year + 2;
    this.semesterOption.push("Semester 1" + ", " + year + "/" + year2);
    this.semesterOption.push("Semester 2" + ", " + year + "/" + year2);
    this.semesterOption.push("Semester 1" + ", " + year2 + "/" + year3);
    this.semesterOption.push("Semester 2" + ", " + year2 + "/" + year3);
  },

    data() {
      return {
        showPassword: false,
        majorOption: ['College of Humanities and Sciences (CHS)','NUS Business School', 'Computing', 'Dentistry', 'College of Design and Engineering (CDE)','Law', 'Medicine','Nursing','Pharmacy','NUS College', "Music"],
        userName: "",
        name: "",
        email: "",
        major: '',
        password: "",
        confirmPassword: "",
        tele: "",
        exchangeUni: "",
        semester: "",
        uniOption: ['None'],
        semesterOption: ["None"],
        errorMessage: "",
        showErrorModal: false,
        user: null,
        showSuccessModal: false,
      }
    }, 

  watch: {
    showErrorModal(value) {
      if (!value) {
        this.errorMessage = ''
      }
    },
    showSuccessModal(value) {
      if (!value) {
        this.closeSuccessModal()
      }
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
          this.user = userCredential.user;
          await this.addAccount(userCredential.user);
          await sendEmailVerification(userCredential.user);

          // Navigate to the account management page
          this.showSuccessModal = true;
          document.getElementById("form").reset();
        } catch (error) {
          console.error("Error registering user", error);
          this.errorMessage = error.message;
          this.showErrorModal = true;
        }
      } else {
        this.showErrorModal = true;
      }
    },

    async addAccount() {
      try {
        if (this.tele) {
          if (this.tele.charAt(0) !== "@"){
            this.tele = "@" + this.tele
          }
        }
        const docRef = await setDoc(doc(db, "Account", this.user.uid), {
          username: this.userName,
          email: this.email,
          major: this.major,
          password: true,
          exchangeUniversity: this.exchangeUni ? this.exchangeUni : "None",
          favouriteUniversity: [],
          semester: this.semester ? this.semester : "None",
          photo: false,
          telegram: this.tele ? this.tele : "",
        });
        console.log(docRef);
      } catch (error) {
        console.error("Error adding document", error);
        this.showErrorModal = true;
      }
    },

    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push("/signin");
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
};
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
  border-radius: 0% 0% 2% 0%;
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
  margin-top: 15%;
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
.register h3,
.register .button {
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

#v-snack {
  color: red;
}

</style>
