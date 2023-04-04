<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Outfit:b"
  />
  <div class="main">
    <h2>Module Mapping Page</h2>
    <img
      src="https://wallpapercave.com/wp/wp1954746.jpg"
      alt=""
      style="width: 100%; border-radius: 15px"
    />
    <div class="search-container">
      <input
        class = "z-10"
        type="text"
        :placeholder="
          inputText ? '' : 'Which NUS Module would you like to map?'
        "
        v-model="inputText"
        @input="autoFilterModules"
        @keyup.enter="addInput"
        @focus="filterModal = true"
      />
      <button class="add-module-btn" @click="addInput">Add Module</button>
    </div>
    <div v-if="autoFilteredModules && filterModal" class = "z-10">
      <ul style = "list-style: none;">
        <li v-for="autoFilteredModule in autoFilteredModules" :key="autoFilteredModule" class = "py-2 border-b cursor-pointer" @click="setState(autoFilteredModule)">{{ autoFilteredModule }}</li>
      </ul>
    </div>
    <div
      v-if="inputs.length > 0"
      class="input-list-container"
      style="margin-top: 20px"
    >
      <div class="input-list">
        <p v-for="(input, index) in inputs" :key="index">
          {{ input.toUpperCase() }}
        </p>
      </div>
      <div class="clear-submit-btn-container">
        <button
          v-if="inputs.length > 0"
          class="clear-module-btn"
          @click="clearInputs"
        >
          Clear
        </button>
        <button
          v-if="inputs.length > 0"
          class="submit-module-btn"
          @click="submitInputs"
        >
          Submit
        </button>
      </div>
    </div>
    <!-- Add the filter bar below the input list -->
    <div class="filter-bar" style="margin-top: 20px">
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
    <div
      class="module-tile-container"
      v-if="filteredandSortedModuleTiles.length > 0"
    >
      <div
        v-for="moduleTile in filteredandSortedModuleTiles"
        :key="moduleTile.university"
      >
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
    <div v-else class="text-center">
      <div v-if="isLoading" class="loading-container">
      <p>Loading Universities...</p>
      <div class="loader"></div>
    </div>
      <div v-if = "!isLoading" class="no-mappable-universities">
      <br />
      <p>No mappable universities. Try keying in more / different modules.</p>
      <br />
      </div>
    </div>
  </div>
</template>

<script>
import {firebaseApp} from "../firebase.js";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import ModuleTile from "@/components/ModuleTile.vue";

const db = getFirestore(firebaseApp);

export default {
  components: {
    ModuleTile,
  },
  data() {
    return {
      inputText: "",
      isLoading: false,
      inputs: [],
      errorMessage: "You have already added this module!",
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
      universityData: [],
      nusModuleCode: ['CS2108', 'CS4226', 'CS4215', 'CS5224', 'CS2102', 'CS3235', 'CS5332', 'IS3240', 'IS4234', 'CS3245', 'CS5228', 'IS4262', 'IS4242', 'BT4301', 'IS4302', 'BT4221', 'CS1231', 'CS3230', 'BT4013', 'BT4222', 'IS4228', 'CS3244', 'CS4243', 'BT4016', 'CS3223', 'CS3211', 'BT4240', 'IS3107', 'IS1108', 'CS2105', 'IS4100', 'IS4241', 'CS4880', 'CS2103', 'IS4246', 'CS2107', 'CS3219', 'CS3210', 'CS4234', 'IT3011', 'CS4225', 'IT2002', 'IS3261', 'CS3240', 'CS2106', 'IS4240', 'IS3221', 'CS2100', 'BT4211', 'IS4243', 'BT4212', 'BT3102', 'CS1010E', 'CS3243', 'CS3241', 'CS1010S', 'CS2040', 'CS2030', 'CS4261', 'CS4231', 'IS3150', 'IS3223', 'IS4233', 'CS4236', 'BT3103', 'BT1101', 'IS3106', 'IS4261', 'IS3101', 'CS3226', 'IS4151', 'IS3103', 'IS4303', 'CS2104', 'CS5242', 'IS4226', 'CS1010J', 'IS4231', 'IS4236', 'IS4301', 'CS4212', 'IS4204', 'CS4248', 'CS3234', 'CS3103', 'IS3251', 'CS4247', 'CS1010', 'IS2102', 'CS4240', 'CS4269', 'CS5330', 'CS4268', 'CS2220', 'CS4218', 'CS4235', 'CS2309', 'CS5340', 'IS4152', 'CS3237', 'CS4232', 'CS5343', 'CS5339', 'CS3236', 'BT4012', 'CS3213', 'CS4211', 'BT4015', 'IS4250', 'CS3231', 'CS3218', 'BT2102', 'CS3242', 'CS5231', 'BT2101', 'IT3010', 'CS4239', 'IFS4101', 'IS1103', 'CS4242', 'CS5229', 'CS4222', 'CS4278', 'CS2040C', 'IT1001', 'CS4249', 'CS2109S', 'CS3220', 'BT4014', 'CS3249', 'CS3247', 'CS4345', 'CG2271', 'CS5234', 'CS4277', 'CS5346', 'CS5321', 'IFS4103', 'CS4246', 'BT2103', 'CS3221', 'CS4244', 'CS5223', 'CS5239', 'IS4232', 'CS3217', 'CS4223', 'CS3233', 'CS5232', 'CS3238', 'IFS4102', 'CS5241', 'CS2113', 'CS5272', 'CS2010', 'CS5331', 'CS5250', 'CS3216', 'CS4220', 'CS4238'],
      autoFilteredModules: [],
      filterModal: false
    };
  },
  async created() {
    const listOfUnis = await getDocs(collection(db, "ListOfUniversities"));

    listOfUnis.forEach((doc) => {
      this.uniAvail.push(doc.id);
      this.universityInformation[doc.id] = {};
      this.universityInformation[doc.id]["Country"] = doc.data().Country;
      this.universityInformation[doc.id]["Continent"] = doc.data().Continent;
      this.universityInformation[doc.id]["GPA"] = doc.data().MinGPA;
      this.universityInformation[doc.id]["LangReq"] =
        doc.data().LanguageProficiency;
    });
  },
  computed: {
    filteredandSortedModuleTiles() {
      let filteredModuleTiles = [];
      if (this.getActiveContinent() === "All") {
        filteredModuleTiles = this.universityData;
      } else {
        filteredModuleTiles = this.universityData.filter(
          (university) => university.continent === this.getActiveContinent()
        );
      }
      return filteredModuleTiles.sort(
        (a, b) => b.localModules.length - a.localModules.length
      );
    },
  },
  methods: {
    autoFilterModules() {
      console.log(this.autoFilteredModules)
      if (this.inputText.length < 2) {
        return this.autoFilteredModules = [];
      }
      this.autoFilteredModules = this.nusModuleCode.filter(text => {
        return text.toUpperCase().startsWith(this.inputText.toUpperCase());
      });
      if (this.autoFilteredModules.length > 0) {
      this.filterModal = true;
    } else {
      this.filterModal = false;
    }
  },
    setState(autoFilteredModule) {
      this.inputText = autoFilteredModule;
      this.autoFilteredModules = [];
      this.filterModal = false;
    },
    addInput() {
    this.autoFilterModules();
    if (this.autoFilteredModules.length === 1) {
      this.setState(this.autoFilteredModules[0]);
    }
    if (this.inputText !== "") {
      if (this.inputs.indexOf(this.inputText.toUpperCase()) === -1) {
        this.inputs.push(this.inputText.toUpperCase());
        this.inputText = "";
      } else {
        window.alert("This module has already been added.");
      }
    }
    this.filterModal = false;
  },
    toggleContinent(continent) {
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
    clearInputs() {
      this.inputs = [];
    },
    async submitInputs() {
      this.universityData = [];
      let universityModHash = {};
      this.isLoading = true;

      for (const mod of this.inputs) {
        // Getting the input NUS Modules
        const nusModRef = doc(db, "NUS Module Mapping", mod);
        const modSnap = await getDoc(nusModRef);
        if (modSnap.exists()) {
          const nusModTitle = modSnap.data();
          console.log(nusModTitle.ModuleTitle);

          for (const uni of this.uniAvail) {
            // Getting the universities that offer that NUS Module
              const nusModInfo = await getDocs(
                collection(nusModRef, uni.toLowerCase())
              );
            nusModInfo.forEach((info) => {
              if (!(uni in universityModHash)) {
                universityModHash[uni] = {};
              }
              if (!(mod in universityModHash[uni])) {
                universityModHash[uni][mod] = {};
                universityModHash[uni][mod]["localName"] = nusModTitle;
                universityModHash[uni][mod]["partnerModules"] = [];
              }
              let PUModCode = info.id;
              let PUModTitle = info.data().PUModTitle;
              let addToPartnerModules = {};
              addToPartnerModules["partnerCode"] = PUModCode;
              addToPartnerModules["partnerName"] = PUModTitle;
              universityModHash[uni][mod]["partnerModules"].push(
                addToPartnerModules
              );
            });
          }
        } else {
          console.log(`Module code "${mod}" not found in database.`);
          window.alert(`Module code "${mod}" not found in database.`);
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
          moduleSets: [],
        };

        for (let localModCode in universityModHash[uni]) {
          toAdd["localModules"].push(localModCode);
          let toAddToModuleSet = {
            localCode: localModCode,
            localName:
              universityModHash[uni][localModCode]["localName"]["ModuleTitle"],
            partnerModules:
              universityModHash[uni][localModCode]["partnerModules"],
          };
          toAdd["moduleSets"].push(toAddToModuleSet);
        }

        this.universityData.push(toAdd);
      }
      this.isLoading = false;
    },
    filterModules(moduleSets, continent) {
      let filteredModules = [];

      moduleSets.forEach((moduleSet) => {
        if (moduleSet.countryContinent === continent) {
          filteredModules.push(moduleSet);
        }
      });

      return filteredModules;
    },
  },
};
</script>

<style scoped>
.main {
  margin: auto;
  max-width: 88%;
}

.main > * {
  margin: 1% 0%;
}

.search-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

input[type="text"] {
  flex: 1;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  margin-right: 10px;
  text-transform: none; /* added line to auto capitalize text */
}

::placeholder {
  /* added placeholder style */
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>