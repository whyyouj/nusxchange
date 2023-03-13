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
      universities: [],
      continents: [
        {
          id: 1,
          name: "All",
          active: true,
        },
        {
          id: 2,
          name: "Asia",
          active: false,
        },
        {
          id: 3,
          name: "Africa",
          active: false,
        },
        {
          id: 4,
          name: "Europe",
          active: false,
        },
        {
          id: 5,
          name: "North America",
          active: false,
        },
        {
          id: 6,
          name: "South America",
          active: false,
        },
        {
          id: 7,
          name: "Oceania",
          active: false,
        },
      ],
    };
  },
  computed: {
    filteredUniversities() {
      if (this.continents[0].active) {
        return this.universities;
      } else {
        return this.universities.filter((university) => {
          return university.continent === this.getActiveContinent();
        });
      }
    },
  },
  methods: {
    toggleContinent(continent) {
      console.log(this.filteredUniversities);
      if (continent.active) {
        continent.active = false;
      } else {
        this.continents.forEach((item) => {
          item.active = false;
        });
        continent.active = true;
      }
    },
    getActiveContinent() {
      return this.continents.find((continent) => continent.active).name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
