<template>
  <div class="main">
    <h2> Module Mapping Page </h2>
    <img src="https://wallpapercave.com/wp/wp1954746.jpg" alt="" style="width: 100%; border-radius: 15px;">
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {

};
</script>

<style scoped>
.main {
  margin: auto;
  max-width: 80%;
}
</style>
