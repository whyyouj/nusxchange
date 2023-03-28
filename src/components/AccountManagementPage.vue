<template>
  <v-dialog
    v-model="showErrorModal"
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
      <v-card-title>Error</v-card-title>
      <v-card-text>
        <div v-if="this.username.length < 1">
          Please ensure that the username is at least 1 character long.
        </div>
        <div v-if="!this.majorList.includes(this.major)">
          Please fill in an appropriate major.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="showErrorModal = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="showDeleteModal"
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
      <v-card-title>Delete Confirmation</v-card-title>
      <v-card-text> Are you sure you want to Delete your Account </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteAccount">Yes</v-btn>
        <v-btn color="primary" @click="showDeleteModal = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="photo">
    <!---<div id="photoname">{{ personname }}</div>--->
    <img id="photo" :src="source" alt="" /> <br />
    <input
      type="file"
      @change="handleFileInputChange"
      accept="image/*"
      id="fileinput"
    />

    <label id="filelabel" for="fileinput">Edit Image</label>
    <button
      @click="showPhotoModal = true"
      style="
        background-color: rgb(204, 204, 204, 0.5);
        padding: 5px 10px;
        border-radius: 10px;
        margin-left: 2%;
        font-size: 100%;
      "
    >
      <font-awesome-icon :icon="['fas', 'trash-alt']" />
    </button>
    <div style="text-align: center">
      <v-dialog v-model="showPhotoModal" max-width="700" :persistent="true">
        <v-card>
          <v-card-title>Confirm Delete</v-card-title>
          <v-card-text> Are you sure you want to delete? </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="deleteImage">Yes</v-btn>
            <v-btn @click="showPhotoModal = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

  <div class="info" style="margin-top: 5%">
    <div id="username-email">
        <div class="username">
        <h3>Username <button style="margin-left: 7%" id="changeusername" @click="changeUsername">
          <font-awesome-icon :icon="showusername ? 'pen' : 'check'" />
        </button></h3>
        <input
          id="username-input"
          type="text"
          v-model="username"
          :disabled="showusername"
          style="
            font-family: Raleway, sans-serif;
            color: #194569;
            font-weight: 1;
          "
          required
          minlength="1"
        />
        
    </div>
      <div id="email">
        <div v-if="this.email">
          <h3>Email</h3>
          {{ email }}
        </div>
        <div v-else>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            width="20"
            height="20"
          />
          <div>Signed in with Google</div>
        </div>
      </div>
    </div>
    <div id="tele-major">
      <div id="tele">
        <h3>Telegram Handle <button style="margin-left: 7%" id="changetele" @click="changeTele">
          <font-awesome-icon :icon="showtele ? 'pen' : 'check'" />
        </button></h3>
        <input
          id="tele-input"
          type="text"
          v-model="tele"
          :disabled="showtele"
          style="font-family: Raleway, sans-serif; color: #194569"
        />
        
      </div>
            <div id="major">
        <h3>Faculty
        <button id="changemajor" @click="changeMajor">
          <font-awesome-icon :icon="showmajoroptions ? 'pen' : 'check'" />
        </button></h3>
        <!--input
          id="major-input"
          type="text"
          v-model="major"
          list="major-options"
          :disabled="showmajoroptions" style="font-family: Raleway, sans-serif; color: #194569; width: 100%"
        />
        <datalist id="major-options">
          <option v-for="(option, id) in majorList" :key="id" :value="option">
            {{ option }}
          </option>
        </datalist-->
        <span v-if="showmajoroptions">{{major}}</span>
        <v-autocomplete v-else class="v-auto" v-model="major" label="Faculty" :items="majorList"> 
        <v-list>
          <v-list-item v-for="(option, index) in majorList" :key="index" @click="major = option">
            <v-list-item-title>{{ option }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-autocomplete>
        
      </div>

    </div>

    <hr />
      <div id="exchangeuni">
        <h3>Exchange University</h3>
      <div id="childComponent" :key="refreshComp1" style="display: flex; flex-direction: column;">
        <span>{{exchangeuni}}</span>
        <h3 v-if="!(semester === 'None' || !semester)">Semester</h3>
        <span v-if="!(semester === 'None' || !semester)">{{semester}}</span>
      </div>

      <button
        id="exchangeUniversity"
        @click="showModal = true"
        v-if="!showModal"
        style="
          background-color: rgb(204, 204, 204, 0.5);
          margin: 4px 2px;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: bold;
        "
      >
        Change
      </button>
      <div class="modal" v-show="showModal">
        <div class="modal-body">
        <div>
        <!--label for="exchange-input">University: </label>
        <input
          id="exchange-input"
          type="text"
          v-model="tempexchangeuni"
          list="exchange-options"
          style="font-family: Raleway, sans-serif; color: #194569;  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); width: 80%;"
          
        />
        <datalist id="exchange-options">
          <option v-for="(option, id) in uniList" :key="id" :value="option">
            {{ option }}
          </option>
        </datalist--> 
      <h3>Change:</h3>
      <v-autocomplete class="v-auto" v-model="tempexchangeuni" label="Exchange University" :items="uniList"> 
      <v-list>
        <v-list-item v-for="(option, index) in uniList" :key="index" @click="exchangeUni = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-autocomplete>

        </div>
        <div>
        <!--label for="sem-input">Semester: </label>
        <input
          id="sem-input"
          type="text"
          v-model="semesterTemp"
          list="sem-options"
          style="font-family: Raleway, sans-serif; color: #194569;  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); width: 80%;"
          
        />
        <datalist id="sem-options">
          <option v-for="(option, id) in semList" :key="id" :value="option">
            {{ option }}
          </option>
        </datalis-->  
      <v-autocomplete class="v-auto" v-model="semesterTemp" label="Semester" :items="semList"> 
      <v-list>
        <v-list-item v-for="(option, index) in semList" :key="index" @click="semester = option">
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-autocomplete>
        </div>
        <div>
        <h4 v-if="exchangeError" id="errorMsg" style="color: red; font-size: 10px">INVALID UNIVERSITY / SEMESTER </h4>
        </div>
        <div class="modal-footer" style="margin-top: 2%">
          <button class="modalSaveButton" @click="changeExchange" style="    background-color: rgb(204, 204, 204, 0.5);
    padding: 2px 8px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 2px;">Save</button>
          <button class="modalCancelButton" @click="showModal = false, exchangeError = false, tempexchangeuni = '' " style="    background-color: rgb(204, 204, 204, 0.5);
    padding: 2px 8px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 2px;">Cancel</button>
        </div> 
      </div>
      </div>
    </div>
    <hr />

    <div id="password" v-if="this.password">
      <label for="passwordInput">Password</label>
      <div id="passwordAccount" :key="refreshComp">
        <input
          id="passwordInput"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :disabled="true"
        />
        <!--button id="showPassword" @click="showPassword = !showPassword">
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
          </button-->
      </div>
      <div id="passwordModal">
        <PasswordModal @passwordData="changePassword" />
      </div>
    </div>
    <hr v-if="this.password" />

    <div id="favourite">
      <!---DeleteFavouriteUni /--->
      <h3>
        Favourites
        <button v-if="!(favList.length ===0)"
          id="changefavourite"
          @click="changeFavourite = !changeFavourite"
          style="transform: translateX(70%)"
        >
           <font-awesome-icon :icon="['fas','trash-alt']" />
             &nbsp;
          <font-awesome-icon :icon="changeFavourite ? 'unlock' : 'lock'" />
        </button>
      </h3>
      <div v-if="favList.length === 0" id="favouriteList">
        No favourites selected
      </div>
      <div v-for="(uni, idx) in favList" :key="idx" id="favouriteList">
        {{ idx + 1 }}.
        <router-link
          class="uni-link"
          :to="`/university/` + uni"
          style="text-decoration: none; color: var(--primary)"
          >{{ uni }}</router-link
        >
        <span
          v-if="changeFavourite"
          class="delete-icon"
          @click="deleteFavourite(idx)"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </span>
      </div>
    </div>
    <hr />
    <div id="teleothers" :key="refreshComp1">
      <h3>Telegram Handles</h3>
      <div v-if="tele === '-' || exchangeuni == 'None'" id="teleHandles">
        Please include your telegram handle and exchange university to access
        this information!
      </div>
      <div v-else-if="this.teleList.length === 0" id="teleHandles">
        There is currently no user that is going on the same exchange as you.
      </div>
      <div v-else v-for="(ele, idx) in teleList" :key="idx" id="teleHandles">
        <div id="teleHandlesName">{{ ele.username }}</div>
        <div id="teleHandlesMajor">{{ ele.major }}</div>
        <div id="teleHandlesTele">{{ ele.telegram }}</div>
      </div>
    </div>
    <hr />
    <button id="deleteaccount" @click="showDeleteModal = true">
      Delete Account
    </button>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"; // npm install --save @fortawesome/free-solid-svg-icons
import {
  faPen,
  faCheck,
  faEye,
  faEyeSlash,
  faTrashAlt,
  faTimes,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons"; // npm install --save @fortawesome/fontawesome-free
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // npm install --save @fortawesome/vue-fontawesome
//import PasswordAccount from "./PasswordAccount.vue";
import PasswordModal from "./PasswordModal.vue";
//import DeleteFavouriteUni from "./DeleteFavouriteUni.vue";
import { auth, firebaseApp, storage } from "../firebase.js";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

library.add(
  faPen,
  faCheck,
  faEye,
  faEyeSlash,
  faTrashAlt,
  faTimes,
  faLock,
  faUnlock
);
const db = getFirestore(firebaseApp);
export default {
  name: "AccountManagementPage",

  async beforeMount() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.userData = await this.getUserData(user.uid);
        this.uId = user.uid;
        this.semester = this.userData.semester;
        this.username = this.userData.username;
        this.password = this.userData.password;
        this.email = this.userData.email;
        this.major = this.userData.major;
        this.tele = this.userData.telegram ? this.userData.telegram : "-";
        this.exchangeuni = this.userData.exchangeUniversity;
        this.favList = this.userData.favouriteUniversity;
        this.photo = this.userData.photo;
      } else {
        this.$router.push("/login");
      }
      const universityList = await getDocs(
        collection(db, "ListOfUniversities")
      );
      universityList.forEach((docs) => {
        this.uniList.push(docs.id);
      });
      const year = new Date().getFullYear();
      const year2 = year + 1;
      const year3 = year + 2;
      this.semList.push("Semester 1" + ", " + year + "/" + year2);
      this.semList.push("Semester 2" + ", " + year + "/" + year2);
      this.semList.push("Semester 1" + ", " + year2 + "/" + year3);
      this.semList.push("Semester 2" + ", " + year2 + "/" + year3);
      const teleHandles = await getDocs(collection(db, "Account"));
      this.teleListAll = teleHandles.docs.map((doc) => doc.data());
      this.updateTeleList();
      if (this.photo) {
        const imageRef = ref(storage, `images/${this.uId}/profile.jpg`);
        this.source = await getDownloadURL(imageRef);
      }
    });
  },

  components: {
    FontAwesomeIcon,
    //PasswordAccount,
    PasswordModal,
    //DeleteFavouriteUni,
  },
  watch: {
    refreshComp1() {
      this.updateTeleList();
    },
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
    async updateUserData(email, newData) {
      try {
        const docRef = doc(collection(db, "Account"), email);
        await updateDoc(docRef, newData);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    },
    async changeUsername() {
      this.showusername = !this.showusername;
      if (this.username.length < 1) {
        this.showErrorModal = true;
        this.showusername = false;
        return;
      }
      if (this.showusername) {
        await this.updateUserData(this.uId, { username: this.username });
      }
    },
    async changeTele() {
      this.showtele = !this.showtele;
      if (this.showtele) {
        if (this.tele.length === 0) {
          await this.updateUserData(this.uId, { telegram: "" });
          this.refreshComp1 += 1;
          this.tele = "-";
        } else {
          await this.updateUserData(this.uId, { telegram: this.tele });
          this.refreshComp1 += 1;
        }
      }
    },
    async changeMajor() {
      this.showmajoroptions = !this.showmajoroptions;
      if (!this.majorList.includes(this.major)) {
        this.showErrorModal = true
        this.showmajoroptions = false
        return 
      }
      if (this.showmajoroptions) {
        await this.updateUserData(this.uId, { major: this.major });
      }
    },
    async changeExchange() {
      if (this.tempexchangeuni === "None") {
        this.showModal = false;
        this.exchangeuni = this.tempexchangeuni;
        this.semesterTemp = "";
        this.tempexchangeuni = "";
        this.semester = "";
        this.refreshComp1 += 1;
        await this.updateUserData(this.uId, {
          exchangeUniversity: this.exchangeuni,
        });
        await this.updateUserData(this.uId, { semester: "None" });
        return;
      }
      if (
        this.semList.includes(this.semesterTemp) &&
        this.uniList.includes(this.tempexchangeuni)
      ) {
        this.exchangeuni = this.tempexchangeuni;
        this.semester = this.semesterTemp;
        this.refreshComp1 += 1;
        this.showModal = false;
        this.semesterTemp = "";
        this.tempexchangeuni = "";
        await this.updateUserData(this.uId, {
          exchangeUniversity: this.exchangeuni,
        });
        await this.updateUserData(this.uId, { semester: this.semester });
        return;
      } else {
        this.exchangeError = true;
      }
    },
    async changePassword(newPw) {
      // do something with new password
      try {
        const credential = EmailAuthProvider.credential(
          this.email,
          this.password
        );
        await reauthenticateWithCredential(this.user, credential);
        await updatePassword(this.user, newPw);
        await this.updateUserData(this.uId, { password: newPw });
        this.password = newPw;
        this.refreshComp += 1;
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          // Handle error here if the user needs to reauthenticate
          console.log(
            "User needs to reauthenticate before updating their password."
          );
        } else {
          console.error("Error updating the password:", error);
        }
      }
    },
    async deleteFavourite(idx) {
      this.favList.splice(idx, 1);
      await this.updateUserData(this.uId, {
        favouriteUniversity: this.favList,
      });
    },

    updateTeleList() {
      if (this.tele !== "-" && this.exchangeuni !== "None") {
        this.teleList = this.teleListAll.filter((item) => {
          return (
            item.exchangeUniversity === this.exchangeuni &&
            item.semester === this.semester &&
            this.email !== item.email
          );
        });
      } else {
        this.teleList = [];
      }
    },

    async deleteImage() {
      this.source = require("../assets/nusxchange.png");
      this.showPhotoModal = false;

      if (this.photo) {
        try {
          const imageRef = ref(storage, `images/${this.uId}/profile.jpg`);
          await deleteObject(imageRef);
          console.log("Delete sucess");
          await this.updateUserData(this.uId, { photo: false });
          this.photo = false;
        } catch (error) {
          console.log("error: ", error);
        }
      }
      return;
    },
    async handleFileInputChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.source = reader.result;
      };
      reader.readAsDataURL(file);
      //console.log(reader);
      //console.log(file);
      const imageRef = ref(storage, `images/${this.uId}/profile.jpg`);
      try {
        await uploadBytes(imageRef, file);
        await this.updateUserData(this.uId, { photo: true });
        this.photo = true;
        document.getElementById("fileinput").value = "";
        console.log("success uploading photo");
      } catch (error) {
        console.error("error in image: ", error);
      }
    },
    async deleteAccount() {
      try {
        await this.deleteImage();
        await deleteDoc(doc(db, "Account", this.uId));
        await deleteUser(this.user);
        this.$router.push("/signin");
        console.log("Delete successfully!");
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    },
  },
  data() {
    return {
      source: require("../assets/nusxchange.png"),
      photo: false,
      showPhotoModal: false,
      refreshComp: 0,
      refreshComp1: 0,
      user: null,
      userData: null,
      uId: null,
      username: "",
      email: "",
      major: "",
      tele: "-",
      exchangeuni: "-",
      tempexchangeuni: "",
      exchangeError: false,
      semester: "",
      semesterTemp: "",
      showmajoroptions: true,
      showusername: true,
      showtele: true,
      majorList: ['College of Humanities and Sciences (CHS)','NUS Business School', 'Computing', 'Dentistry', 'College of Design and Engineering (CDE)','Law', 'Medicine','Nursing','Pharmacy','Nus College', "Music"],
      password: "password",
      //showPassword: false,
      uniList: ["None"],
      semList: ["None"],
      showModal: false,
      showErrorModal: false,
      showDeleteModal: false,
      newPassword: "",
      passwordError: false,
      showPassword: false,
      favList: [],
      changeFavourite: false,
      deleteIdx: null,
      teleList: [],
      teleListAll: [],
    };
  },
};
</script>

<style scoped>
.photo {
  float: left;
  margin-right: 50%;
  width: 50%;
  text-align: center;
  margin: 0 auto;
}

.info {
  margin-left: 50%;
  width: 50%;
}

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
}
/*#photoname {
  position: relative;
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  left: 50%;
  transform: translate(-50%, 250%);
  font-size: 150%;
}*/
#fileinput {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-80%, 50%);
}
#filelabel {
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  background-color: rgb(204, 204, 204, 0.5);
}
#fileinput {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-80%, 50%);
  opacity: 0;
  width: 1px;
  height: 1px;
}
#username {
  margin-top: 10%;
  font-weight: 100;
}
#email {
  font-weight: 100;
}
#major {
  font-weight: 100;
}
#changemajor {
  margin-left: 10%;
}

#major-input option {
  color: #333;
}
#major-input:not([disabled]) {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 2px solid;
}

#username-input option {
  color: #333;
}
#username-input:not([disabled]) {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 2px solid;
}

#tele-input option {
  color: #333;
}
#tele-input:not([disabled]) {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 2px solid;
}

#changePassword {
  background-color: rgb(204, 204, 204, 0.5);
  margin: 4px 2px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
}
#childComponent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

#passwordAccount {
  width: 48%;
}

#changeFav {
  margin-left: 10%;
}

#tele {
  font-weight: 100;
}
#exchangeuni {
  font-weight: 100;
}
#username-email {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

#email,
#major {
  width: 48%;
}

#favouriteList {
  font-weight: 100;
}

#tele-major {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

#tele,
#exchangeuni {
  width: 48%;
}
#teleHandles {
  display: flex;
  flex-direction: row;
  font-weight: 100;
  justify-content: space-between;
  flex: 1 1 25%;
  width: 80%;
}

hr {
  border-color: #7eb9ea;
  border-width: 0.3px;
  margin-top: 10px;
  margin-bottom: 20px;
  opacity: 0.3;
}

#deleteaccount {
  margin: 4px 2px;
  margin-left: auto;
  display: block;
  margin-right: auto;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
  background: red;
  color: white;
}

#changefavourite {
  background-color: rgb(204, 204, 204, 0.5);
  margin: 4px 2px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
  margin-left: 60%;
}
.uni-link:hover {
  font-weight: bold;
}
.v-auto {
  width: 80%
}

.delete-icon {
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
.delete-icon:hover {
  color: red;
}


</style>
