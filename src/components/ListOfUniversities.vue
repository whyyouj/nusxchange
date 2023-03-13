<template>
  <div>
    <h2>List of Exchange Universities</h2>
    <div class="filter-bar">
      <ul>
        <li v-for="continent in continents"
            :key="continent.id"
            :class="{ active: continent.active }"
            @click="toggleContinent(continent)">
          {{ continent.name }}
        </li>
      </ul>
    </div>
    <div class="tile-list">
      <UniTile v-for="university in filteredUniversities"
               :key="university.id"
               :name="university.name"
               :country="university.country"
               :continent="university.continent"
               :gpa="university.gpa"
               :imageUrl="university.imageUrl"
               :universityUrl="university.url"
               class="tile" />
    </div>
  </div>
</template>

<script>
import UniTile from '@/components/UniversityTile.vue'
import firebaseApp from '../firebase.js';
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
  name: "UniversityList",
  components: {
    UniTile,
  },
  async beforeCreate() {
    let allDocuments = await getDocs(collection(db, "ListOfUniversities"));
    allDocuments.forEach((docs) => {
      let documentData = docs.data();

      let toAdd = {
        name: documentData.Name,
        country: documentData.Country,
        continent: documentData.Continent,
        gpa: documentData.MinGPA,
        imageUrl: documentData.ImageURL,
        url: documentData.UniversityWebsite,
      };

      this.universities.push(toAdd);
      console.log(this.universities);
    });
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped></style>
