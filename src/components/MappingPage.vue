<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Outfit:b"
  />
  <div class="main">
    <h2>Module Mapping Page</h2>
    <img src="https://wallpapercave.com/wp/wp1954746.jpg" alt="" style="width: 100%; border-radius: 15px;">
    <div class="search-container">
      <input type="text" :placeholder="inputText ? '' : 'Which NUS Module would you like to map?'" v-model="inputText" @input="inputText = inputText.toUpperCase()" @keyup.enter="addInput">
      <button class="add-module-btn" @click="addInput">Add Module</button>
    </div>
    <div v-if="inputs.length > 0" class="input-list-container" style="margin-top: 20px;">
      <div class="input-list">
        <p v-for="(input, index) in inputs" :key="index">{{ input.toUpperCase() }}</p>
      </div>
      <div class="clear-submit-btn-container">
        <button v-if="inputs.length > 0" class="clear-module-btn" @click="clearInputs">Clear</button>
        <button v-if="inputs.length > 0" class="submit-module-btn" @click="submitInputs">Submit</button>
      </div>
    </div>
    <!-- Add the filter bar below the input list -->
    <div class="filter-bar" style="margin-top: 20px;">
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
    <div class="module-tile-container" v-for="moduleTile in filteredandSortedModuleTiles" :key="moduleTile.university">
      <ModuleTile
        :university="moduleTile.university"
        :local-modules-count="moduleTile.localModules.length"
        :partner-university="moduleTile.partnerUniversity"
        :continent="moduleTile.continent"
        :country="moduleTile.country"
        :gpa="moduleTile.gpa"
        :language-requirements="moduleTile.languageRequirements"
        :module-sets="moduleTile.moduleSets"
      />
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {collection, getDocs, getFirestore, doc, getDoc} from 'firebase/firestore'
import ModuleTile from '@/components/ModuleTile.vue';

const db = getFirestore(firebaseApp);

export default {
  components: {
    ModuleTile,
  },
  data() {
    return {
      inputText: '',
      inputs: [],
      errorMessage: 'You have already added this module!',
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
      universityInformation: {},
      uniAvail: [],
      universityData: []
      // universityData: [
      //     {
      //       university: 'National University of Singapore',
      //       localModules: ['Module A', 'Module B', 'Module C'],
      //       continent: 'Asia',
      //       country: 'Singapore',
      //       gpa: 3.5,
      //       languageRequirements: 'English',
      //       moduleSets: [
      //         {
      //           localCode: 'MA1234',
      //           localName: 'Module A',
      //           partnerModules: [
      //             {
      //               partnerCode: 'PA1234',
      //               partnerName: 'Partner Module 1'
      //             },
      //             {
      //               partnerCode: 'PA5678',
      //               partnerName: 'Partner Module 2'
      //             }
      //           ]
      //         },
      //         {
      //           localCode: 'MB5678',
      //           localName: 'Module B',
      //           partnerModules: [
      //             {
      //               partnerCode: 'PB1234',
      //               partnerName: 'Partner Module 3'
      //             },
      //             {
      //               partnerCode: 'PB5678',
      //               partnerName: 'Partner Module 4'
      //             },
      //             {
      //               partnerCode: 'PB9012',
      //               partnerName: 'Partner Module 5'
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       university: 'University of California, Berkeley',
      //       localModules: ['Module X', 'Module Y', 'Module Z'],
      //       continent: 'North America',
      //       country: 'United States',
      //       gpa: 3.8,
      //       languageRequirements: 'English',
      //       moduleSets: [
      //         {
      //           localCode: 'CX1234',
      //           localName: 'Module X',
      //           partnerModules: [
      //             {
      //               partnerCode: 'PX1234',
      //               partnerName: 'Partner Module 1'
      //             },
      //             {
      //               partnerCode: 'PX5678',
      //               partnerName: 'Partner Module 2'
      //             }
      //           ]
      //         },
      //         {
      //           localCode: 'CY5678',
      //           localName: 'Module Y',
      //           partnerModules: [
      //             {
      //               partnerCode: 'PY1234',
      //               partnerName: 'Partner Module 3'
      //             },
      //             {
      //               partnerCode: 'PY5678',
      //               partnerName: 'Partner Module 4'
      //             },
      //             {
      //               partnerCode: 'PY9012',
      //               partnerName: 'Partner Module 5'
      //             }
      //           ]
      //         },
      //         {
      //           localCode: 'CZ9012',
      //           localName: 'Module Z',
      //           partnerModules: [
      //             {
      //               partnerCode: 'PZ1234',
      //               partnerName: 'Partner Module 6'
      //             },
      //             {
      //               partnerCode: 'PZ5678',
      //               partnerName: 'Partner Module 7'
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      }
  },
  async created() {
    const listOfUnis = await getDocs(collection(db, "ListOfUniversities"));

    listOfUnis.forEach((doc) => {
      this.uniAvail.push(doc.id)
      this.universityInformation[doc.id] = {}
      this.universityInformation[doc.id]["Country"] = doc.data().Country
      this.universityInformation[doc.id]["Continent"] = doc.data().Continent
      this.universityInformation[doc.id]["GPA"] = doc.data().MinGPA
      this.universityInformation[doc.id]["LangReq"] = doc.data().LanguageProficiency
    })
  },
  computed: {
    filteredandSortedModuleTiles() {
     let filteredModuleTiles = [];
      if (this.getActiveContinent() === 'All') {
        filteredModuleTiles = this.universityData;
      } else {
        filteredModuleTiles = this.universityData.filter((university) => university.continent === this.getActiveContinent());
      }
      return filteredModuleTiles.sort((a, b) => b.localModules.length - a.localModules.length);
    }
  },
    methods: {
    addInput() {
      if (this.inputText !== '' && this.inputs.length < 6) {
        if (this.inputs.indexOf(this.inputText.toUpperCase()) === -1) {
          this.inputs.push(this.inputText.toUpperCase());
          this.inputText = '';
        } else {
          window.alert('This module has already been added.'); // Show the error message as a pop-up
        }
      }
    },
    toggleContinent(continent) {
      if (continent.active) {
        continent.active = false;
      } else {
        this.continents.forEach((item) => { item.active = false;
        });
        continent.active = true;
      }
    },
    getActiveContinent() {
      return this.continents.find((continent) => continent.active).name;
    },
    clearInputs() {
      this.inputs = [];
    },
    async submitInputs() {
      this.universityData = []
      let universityModHash = {}

      for (const mod of this.inputs) { // Getting the input NUS Modules
        const nusModRef = doc(db, "NUS Module Mapping", mod)
        const modSnap = await getDoc(nusModRef)
        if (modSnap.exists()) {  
        const nusModTitle = modSnap.data()
        console.log(nusModTitle.ModuleTitle)

        for (const uni of this.uniAvail) { // Getting the universities that offer that NUS Module
          const nusModInfo = await getDocs(collection(nusModRef, uni.toLowerCase()))
          nusModInfo.forEach(info => {
            if (!(uni in universityModHash)) {
              universityModHash[uni] = {}
            }
            if (!(mod in universityModHash[uni])) {
              universityModHash[uni][mod] = {}
              universityModHash[uni][mod]["localName"] = nusModTitle
              universityModHash[uni][mod]["partnerModules"] = []
            }
            let PUModCode = info.id
            let PUModTitle = info.data().PUModTitle
            let addToPartnerModules = {}
            addToPartnerModules["partnerCode"] = PUModCode
            addToPartnerModules["partnerName"] = PUModTitle
            universityModHash[uni][mod]["partnerModules"].push(addToPartnerModules)
          })
        }
        } else {
          console.log(`Module code "${mod}" not found in database.`)
          window.alert(`Module code "${mod}" not found in database.`)
        }
      }

      for (let uni in universityModHash) {
        const toAdd = {
          university: uni,
          localModules: [],
          continent: this.universityInformation[uni]["Continent"],
          country: this.universityInformation[uni]["Country"],
          gpa: this.universityInformation[uni]["GPA"],
          languageRequirements: this.universityInformation[uni]["LangReq"],
          moduleSets: []
        }

        for (let localModCode in universityModHash[uni]) {
          toAdd["localModules"].push(localModCode)
          let toAddToModuleSet = {
            localCode: localModCode,
            localName: universityModHash[uni][localModCode]["localName"]["ModuleTitle"],
            partnerModules: universityModHash[uni][localModCode]["partnerModules"]
          }
          toAdd["moduleSets"].push(toAddToModuleSet)
        }

        this.universityData.push(toAdd)
      }
    },
    filterModules(moduleSets, continent) {
      let filteredModules = [];

      moduleSets.forEach((moduleSet) => {
        if (moduleSet.countryContinent === continent) {
          filteredModules.push(moduleSet);
        }
      });

      return filteredModules;
    }
  }
}
</script>

<style scoped>
.main {
  margin: auto;
  max-width: 80%;
}

.search-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

input[type=text] {
  flex: 1;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  margin-right: 10px;
  text-transform: none; /* added line to auto capitalize text */
}

::placeholder { /* added placeholder style */
  text-transform: none;
}

.add-module-btn {
  background-color: #194569;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
}

.add-module-btn:hover {
  background-color: #3e88c5;
}

.input-list-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.input-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.input-list p {
  margin: 5px;
  font-size: 14px;
  white-space: nowrap;
  background-color: #f2f2f2;
  color: black;
  border-radius: 20px;
  padding: 5px 10px;
}

.clear-submit-btn-container {
  display: flex;
  justify-content: flex-end;
}

.clear-module-btn {
  background-color: #194569;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
  margin-right: 10px;
}

.clear-module-btn:hover {
  background-color: #3e88c5;
}

.submit-module-btn {
  background-color: #194569;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
}

.submit-module-btn:hover {
  background-color: #3e88c5;
}

.filter-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

.module-tile-container {
  margin-top: 20px;
  /* display: flex; */
  flex-wrap: wrap;
  gap: 20px;
}
</style>       
