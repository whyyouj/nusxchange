<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">

  <div>
    <h1 class="header">List of Exchange Universities</h1>
    <div class="filter-bar">
      <ul>
        <li
          v-for="continent in continents"
          :key="continent.id"
          :class="{ active: continent.active }"
          @click="toggleContinent(continent)"
        >
          {{ continent.name }}
        </li>
      </ul>
    </div>
    <div class="tile tile-list">
      <UniTile
        v-for="university in filteredUniversities"
        :key="university.id"
        :name="university.name"
        :country="university.country"
        :continent="university.continent"
        :gpa="university.gpa"
        :imageUrl="university.imageUrl"
        :universityUrl="university.url"
      />
    </div>
  </div>
</template>

<script>
import UniTile from "@/components/UniversityTile.vue";
import {firebaseApp} from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getDoc } from 'firebase/firestore';


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
        url: documentData.WebsiteURL,
      };

      this.universities.push(toAdd);
      console.log(this.universities);
    });
  },

async created() {
  // Retrieve data from NusModuleMapping collection
  const nusModuleMappingCollectionRef = collection(db, 'NusModuleMapping');
  const nusModuleMappingDocsSnapshot = await getDocs(nusModuleMappingCollectionRef);
  const nusModuleMapping = {};
  nusModuleMappingDocsSnapshot.forEach((doc) => {
    nusModuleMapping[doc.id] = doc.data();
  });

  // Retrieve data from ListOfUniversities collection
  const listOfUniversitiesCollectionRef = collection(db, 'ListOfUniversities');
  const listOfUniversitiesDocsSnapshot = await getDocs(listOfUniversitiesCollectionRef);
  const moduleSets = [];
  listOfUniversitiesDocsSnapshot.forEach((doc) => {
    const localModule = {
      code: doc.id,
      name: doc.data().name
    };
    const partnerModules = [];
    doc.data().universities.forEach(async (university) => {
      const universityDoc = await getDoc(doc(db, 'NusModuleMapping', university));
      const partnerModule = {
        university: university,
        code: universityDoc.data().modules[doc.id]
      };
      partnerModules.push(partnerModule);
    });
    moduleSets.push({
      localModule: localModule,
      partnerModules: partnerModules
    });
  });

  // Assign the retrieved data to the component data property
  this.moduleSets = moduleSets;
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
      moduleSets: []
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
.header {
  width: 88%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  font-family: "Outfit";
  font-weight: 700;
  font-size: 32px;
}
.tile-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 5% 0 5%;
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
  font-weight: 700;
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
