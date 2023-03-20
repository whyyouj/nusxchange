<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit:b">

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
        name: docs.id,
        country: documentData.Country,
        continent: documentData.Continent,
        gpa: documentData.MinGPA,
        imageUrl: documentData.ImageURL,
        url: documentData.UniversityURL,
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
<style scoped>
  .tile-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tile-list UniTile {
    margin-right: 20px;
    flex-basis: calc(25% - 5px);
  }

  .tile-list UniTile:nth-child(4n) {
    margin-right: 0;
  }

  .filter-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-family: "Outfit";
  }

  .filter-bar ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .filter-bar li {
    margin: 0 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.3s ease-out;
    position: relative;
  }

  .filter-bar li::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background-color: transparent;
    bottom: -0.2rem;
    left: 0;
    transform: translateX(-100%);
    transition: background-color 0.2s ease-out, transform 0.3s ease-out;
  }

  .filter-bar li:hover::before {
    background-color: #cadeed;
    transform: translateX(0%);
  }

  .filter-bar li.active::before {
    background-color: #5f84a2;
    transform: translateX(0%);
  }
</style>

