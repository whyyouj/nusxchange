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
    <div v-if="inputs.length > 0" class="input-list" style="margin-top: 20px;">
      <p v-for="(input, index) in inputs" :key="index">{{ input.toUpperCase() }}</p>

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
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);
db,collection,getDocs

export default {
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
        this.continents.forEach((item) => {
          item.active = false;
        });
        continent.active = true;
      }
    },
    getActiveContinent() {
      return this.continents.find((continent) => continent.active).name;
    },
  }
};
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
  ::placeholder { /* added placeholder style */
    text-transform: none;
  }
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

.input-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
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
