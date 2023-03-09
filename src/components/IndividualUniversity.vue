<template>
  <div class="main">
    <div style="display: flex; justify-content: space-between">
      <div class="uni-name">
        <h1>University of Manchester</h1>
      </div>
      <div class="favourite" style="align-self: center; padding-right: 2%">
        <v-icon
          :class="isPressed ? 'red--text' : ''"
          @click="isPressed = !isPressed"
        >
          {{ isPressed ? "mdi-cards-heart" : "mdi-heart-outline" }}
        </v-icon>
      </div>
    </div>
    <img
      class="image"
      src="https://www.wur.nl/upload/6f37ab47-390e-4a11-8677-7728208787e3_291033426_6067606606599046_5002841370475822249_n.jpg"
    />
    <div class="subtitle">
      <span>Location: <strong>England, Manchester</strong></span>
      <span>Minimum GPA: <strong>4.0/5.0</strong></span>
      <span>Reviews: <strong> 2</strong></span>
      <span>Language Proficiency Requirements: <strong>English</strong></span>
    </div>
    <v-divider></v-divider>
    <div class="details">
      <div class="description">
        The University of Manchester is based in the north of England and is
        among the largest universities in the UK, with around 38,000 students
        (almost 9,000 international) currently enrolled alongside 10,000 staff.
        The University is famous for its academic and research excellence, and
        is also a member of the Russell Group.
      </div>
      <div style="display: flex; width: 100%">
        <div class="academic-window">
          <h3>Academic Window:</h3>
          <p>Semester 1: Mid-September to late January</p>
          <p>Semester 2: Late January to early June</p>
        </div>
        <div class="vacancies">
          <h3>Vacancies:</h3>
          <p>Semester 1: 6</p>
          <p>Semester 2: 6</p>
        </div>
      </div>
      <v-divider></v-divider>
      <div style="display: flex; justify-content: space-around">
        <div class="attractions">
          <v-container>
            <v-tabs v-model="selectedTab">
              <v-tab
                v-for="(item, index) in items"
                :key="index"
                @click="onTabSelected(index)"
                >{{ item.tabName }}</v-tab
              >
            </v-tabs>
            <v-window v-model="selectedTab" v-if="isDataLoaded">
              <v-window-item
                v-for="(item, index) in this.items"
                :key="index"
                :value="index"
              >
                <v-table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Rating</th>
                      <th>Total Ratings</th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(item, index) in [this.items[selectedTab]]"
                    :key="index"
                  >
                    <tr
                      v-for="(data, dataIndex) in item.content"
                      :key="dataIndex"
                    >
                      <td>{{ data.name }}</td>
                      <td>{{ data.rating }}</td>
                      <td>{{ data.user_ratings_total }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>
            </v-window>
          </v-container>
        </div>
        <div class="google-maps">
          <GoogleMap
            api-key="AIzaSyCcEZCP5u8LgWpLbsWnfGeDwREh22vuYJ8"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="15"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap>
        </div>
      </div>
      <div class="forum">
        <Disqus shortname="nusxchange" />
      </div>
      <v-divider></v-divider>
      <div class="country-information">
        <h1>Country Information</h1>
        <v-table>
          <tbody>
            <tr v-for="row in countryLinks" :key="row.name">
              <td>{{ row.name }}</td>
              <td>
                <a :href="row.link">{{ row.link }}</a>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="other-information">
        <h1>Other Information</h1>
        <v-table>
          <tbody>
            <tr v-for="row in otherLinks" :key="row.name">
              <td>{{ row.name }}</td>
              <td>
                <a :href="row.link">{{ row.link }}</a>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  components: {
    GoogleMap,
    Marker,
  },
  methods: {
    async fetchAllData() {
      this.nearbyRestaurantsData = await this.fetchData("restaurant");
      this.nearbyAttractionsData = await this.fetchData("tourist_attraction");
      this.nearbyHotelsData = await this.fetchData("lodging");
      this.isDataLoaded = true;
    },
    async fetchData(placeType) {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Replace with your own proxy server
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.46699022421609,-2.2338408013104565&radius=1000&type=${placeType}&key=AIzaSyCcEZCP5u8LgWpLbsWnfGeDwREh22vuYJ8`;
      const response = await fetch(proxyUrl + apiUrl, {
        headers: {
          Origin: "http://localhost:8081",
          // change to your localhost
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      const data = await response.json();
      const result = data.results;
      let processed_results = [];
      for (let i = 1; i < result.length; i++) {
        try {
          let row = {
            name: result[i].name,
            rating: result[i].rating,
            user_ratings_total: result[i].user_ratings_total,
          };
          processed_results.push(row);
        } catch (err) {
          console.log("SKIP");
        }
      }
      processed_results = processed_results.slice(0, 5);
      // Limit to top 5 results
      return processed_results;
    },
    onTabSelected(index) {
      console.log("Selected tab:", index);
    },
  },
  computed: {
    items() {
      return [
        {
          tabName: "Hotels",
          content: this.nearbyHotelsData,
        },
        {
          tabName: "Attractions",
          content: this.nearbyAttractionsData,
        },
        {
          tabName: "Restaurants",
          content: this.nearbyRestaurantsData,
        },
      ];
    },
  },
  created() {
    this.fetchAllData();
  },
  data() {
    return {
      selectedTab: 0,
      isDataLoaded: false,
      isPressed: false,
      nearbyRestaurantsData: null,
      nearbyAttractionsData: null,
      nearbyHotelsData: null,
      countryLinks: [
        {
          name: "Emergency Contact:",
          link: "+44 161 306 9966 (Campus), 999 (England Emergency Services)",
        },
        {
          name: "Necessary VISA:",
          link: "https://www.manchester.ac.uk/study/international/admissions/visa-guidance/",
        },
        {
          name: "Cost of Living:",
          link: "https://www.manchester.ac.uk/study/international/finance-and-scholarships/living-costs/",
        },
      ],
      otherLinks: [
        {
          name: "Website:",
          link: "https://www.manchester.ac.uk/study/international/study-abroad-programmes/exchange/",
        },
        {
          name: "Accommodation:",
          link: "https://www.manchester.ac.uk/study/international/accommodation/",
        },
        {
          name: "Scholarship for Exchange:",
          link: "https://www.manchester.ac.uk/study/international/finance-and-scholarships/",
        },
      ],
      center: { lat: 53.46699022421609, lng: -2.2338408013104565 },
      markerOptions: {
        position: this.center,
        label: "L",
        title: "University of Manchester",
      },
    };
  },
};
</script>

<style scoped>
.main {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.main > * {
  margin: 1% 0%;
}
strong {
  font-weight: bold;
}
.image {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.subtitle {
  font-weight: 300;
  color: var(--secondary);
  color: #5f84a1;
  display: flex;
  justify-content: space-between;
}
.description {
  font-weight: 500;
  width: 50%;
  margin-bottom: 5%;
}
.academic-window,
.vacancies {
  font-weight: 100;
  display: flex;
  flex-direction: column;
  width: 50%;
}
.attractions,
.google-maps {
  width: 50%;
  height: 500px;
  margin: 5% 0%;
}
.country-information,
.other-information {
  margin: 5% 0%;
}
</style>
