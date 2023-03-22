<template>
<button id="changePassword" @click="showModal =true" v-if="!showModal">Change</button>
  <div class="modal" v-show="showModal">
    <div class="modal-header">
      <h3>Change Password</h3>
    </div>
    <div class="modal-body" >
    <div class="password-input" style="display: flex; flex-direction: column; align-items: flex-start">
      <div><input class="passwordInput" style="margin-bottom: 5%; width: 85%;" :type="showPassword ? 'text' : 'password'" v-model="newPassword" placeholder="Enter new password" />
      <button id="showPassword" @click="showPassword = !showPassword">
     
        <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
      </button>
      </div>
      <div>
      <input class="passwordInput" :type="showPassword ? 'text' : 'password'"  v-model="newPassword2" placeholder="Confirm new password" style="width: 98%"/>
      </div>
    </div>
    <h4 v-if="passwordError" id="errorMsg">INVALID <p style="font-size= 2%; font-weight:1">Please ensure both password are the same / at least 6 characters long</p></h4>
    </div>
    <div class="modal-footer">
      <button class="modalSaveButton" @click="changePassword">Save</button>
      <button class="modalCancelButton" @click="showModal = false, passwordError = false, newPassword ='', newPassword2= ''">Cancel</button>
    </div> 
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';// npm install --save @fortawesome/free-solid-svg-icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // npm install --save @fortawesome/fontawesome-free
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // npm install --save @fortawesome/vue-fontawesome
library.add(faEye, faEyeSlash);
export default {
    name : "PasswordModal",
    components: {
        FontAwesomeIcon
    },
    data() {
        return {showModal: false,
           newPassword: "",
           newPassword2: "",
          passwordError: false,
          showPassword: false,}
    },
    emits : ["passwordData"],
    methods: {
        changePassword() {
            // do something with new password
            console.log(`New password: ${this.newPassword}`);
            // close modal
            // clear new password field
            if (this.newPassword.length > 5 && this.newPassword === this.newPassword2) {
                this.$emit("passwordData",this.newPassword)
                this.passwordError = false
                this.showModal = false;
                this.refreshComp += 1;
                this.newPassword = '';
                this.newPassword2='';
                return
            }
            this.passwordError = true
            this.newPassword = '';
            this.newPassword2= '';
            },
  },
}


</script>

<style scoped>
#changePassword {
  background-color: rgb(204, 204, 204, 0.5);
  margin: 4px 2px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
}
#errorMsg {
  color: red;
}
.modal-header h3 {
  margin: 0;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-body input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  font-size: 100%;
}

.modal-footer {
  display: flex;
  justify-content:left;
}

.modalSaveButton{
    background-color: rgb(204, 204, 204, 0.5);
    padding: 2px 8px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 2px;
}
.modalCancelButton{
    background-color: rgb(204, 204, 204, 0.5);
    padding: 2px 8px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 2px;
}
.password-input {
  display: flex;
  align-items: center;
  width: 80%;
}
.password-input button {
  margin-left: 5px;
}
.password-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>