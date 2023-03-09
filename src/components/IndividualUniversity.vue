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
          <v-card>
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab v-for="item in items" :key="item">{{ item.tab }}</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item v-for="item in items" :key="item"
                  >{{ item.content }}
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
        <div class="google-maps">
          <!-- <GoogleMap
            api-key="AIzaSyCcEZCP5u8LgWpLbsWnfGeDwREh22vuYJ8"
            style="width: 100%; height: 500px"
            :center="center"
            :zoom="15"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap> -->
        </div>
      </div>
      <div class="forum">
        <!-- <Disqus shortname="nusxchange" /> -->
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
// import { GoogleMap, Marker } from "vue3-google-map";
export default {
  components: {
    // GoogleMap,
    // Marker,
  },
  methods: {
    async fetchNearbyRestaurants() {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Replace with your own proxy server
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.46699022421609,-2.2338408013104565&radius=1000&type=restaurant&key=AIzaSyCcEZCP5u8LgWpLbsWnfGeDwREh22vuYJ8`;
      const response = await fetch(proxyUrl + apiUrl, {
        headers: {
          Origin: "http://localhost:8081",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      const data = await response.json();
      this.nearbyRestaurantsData = data.results;
      // for (let i = 1; i < this.nearbyRestaurantsData.length; i++) {
      //   console.log(i);
      //   console.log(typeof this.nearbyRestaurantsData);
      //   console.log(this.nearbyRestaurantData[i]);
      // }
      // for (let i = 0; i < this.nearbyRestaurantsData.length; i++) {
      // let name = this.nearbyRestaurantsData[i].name;
      // let rating = this.nearbyRestaurantsData[i].rating;
      // console.log(name);
      // console.log(rating);
      // }
    },
  },
  computed: {
    nearbyRestaurants() {
      return this.nearbyRestaurantsData;
    },
  },
  mounted() {
    this.fetchNearbyRestaurants();
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Restaurants", content: "Tab 1 Content" },
        { tab: "Activities", content: "Tab 2 Content" },
        { tab: "Hotels", content: "Tab 3 Content" },
      ],
      isPressed: false,
      nearbyRestaurantsData: null,
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
        title: "LADY LIBERTY",
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
.attractions {
  width: 50%;
  height: 500px;
  margin-top: 5%;
}
.google-maps {
  width: 50%;
  height: 500px;
}
.country-information,
.other-information {
  margin: 5% 0%;
}
</style>
