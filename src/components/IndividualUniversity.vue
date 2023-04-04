<template>
  <div class="main">
    <div v-if="this.firebaseError" style="text-align: center; padding-top: 20%">
      <h1>
        Error with getting information from Cloud Firebase. Please try again
        later or contact us at nusxhange@gmail.com.
      </h1>
    </div>
    <div
      v-else-if="!this.isDataLoaded"
      style="text-align: center; padding-top: 20%"
    >
      <h1>
        Error with loading Google Maps attractions. Please try again later or
        contact us at nusxhange@gmail.com.
      </h1>
    </div>
    <div v-else>
      <div style="display: flex; justify-content: space-between">
        <div class="uni-name">
          <h1>{{ this.universityName }}</h1>
        </div>
        <div
          v-if="isLoggedIn"
          class="favourite"
          style="align-self: center; padding-right: 2%"
        >
          <v-icon @click="this.updateFavouriteUni(this.universityName)">
            {{ isFavourite ? "mdi-cards-heart" : "mdi-heart-outline" }}
          </v-icon>
          <v-snackbar v-model="showSnackbar" :timeout="2000">
            <div v-if="isFavourite">
              Successfully added {{ this.universityName }} to Favourites!
            </div>
            <div v-else>
              Successfully removed {{ this.universityName }} from Favourites.
            </div>
            <template v-slot:actions>
              <v-btn color="red" variant="text" @click="showSnackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
      <img
        class="image"
        :src="this.universityData.imageURL"
        style="max-width: 100%; height: 500px"
      />
      <div class="subtitle">
        <span
          >Location:
          <strong
            >{{ this.universityData.country }},
            {{ this.universityData.continent }}</strong
          ></span
        >
        <span
          >Minimum GPA: <strong>{{ this.universityData.minGPA }}</strong></span
        >
        <span
          >Language Proficiency Requirements:
          <strong>{{ this.universityData.languageProficiency }}</strong></span
        >
      </div>
      <v-divider></v-divider>
      <div class="details">
        <div style="display: flex">
          <div class="description">
            {{ this.universityData.uniDescription }}
          </div>
          <div style="width: 40%; margin-left: 10%">
            <div class="academic-window">
              <h3>Academic Window:</h3>
              <p>Semester 1: {{ this.universityData.semOneWindow }}</p>
              <p>Semester 2: {{ this.universityData.semTwoWindow }}</p>
            </div>
            <div class="vacancies">
              <h3>Vacancies:</h3>
              <div
                v-if="
                  this.universityData.semOneVacancies ||
                  this.universityData.semTwoVacancies
                "
              >
                <p>Semester 1: {{ this.universityData.semOneVacancies }}</p>
                <p>Semester 2: {{ this.universityData.semTwoVacancies }}</p>
              </div>
              <div v-else>
                <p>Any Semester: {{ this.universityData.anyVacancies }}</p>
              </div>
            </div>
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
                  <v-table class="table">
                    <thead>
                      <tr>
                        <th style="font-weight: bold; color: var(--primary)">
                          Name
                        </th>
                        <th style="font-weight: bold; color: var(--primary)">
                          Rating
                        </th>
                        <th style="font-weight: bold; color: var(--primary)">
                          Total Ratings
                        </th>
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
                        <td>
                          <span v-if="data.name">
                            <a
                              :href="
                                'https://www.google.com/maps/search/?api=1&query=' +
                                data.latitude +
                                ',' +
                                data.longitude
                              "
                              target="_blank"
                              >{{ data.name }}</a
                            >
                          </span>
                          <span v-else> NA </span>
                        </td>
                        <td>{{ data.rating ? data.rating : "NA" }}</td>
                        <td>
                          {{
                            data.user_ratings_total
                              ? data.user_ratings_total
                              : "NA"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>
              </v-window>
            </v-container>
          </div>
          <div class="google-maps">
            <GoogleMap
              :api-key="api_key"
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
                <td v-if="row.link" style="padding-left: 110px">
                  <a :href="row.link">{{ row.link }}</a>
                </td>
                <td v-else>No link available.</td>
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
                <td v-if="row.link">
                  <a
                    :href="row.link"
                    onclick="window.open(this.href,'_blank');return false;"
                    >{{ row.link }}</a
                  >
                </td>
                <td v-else>No link available.</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import { firebaseApp } from "../firebase.js";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  components: {
    GoogleMap,
    Marker,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.favouriteUniversities = await this.getFavouriteUnis(user.uid);
        this.isLoggedIn = true;
      } else {
        console.log("SIGNED OUT!");
        this.isLoggedIn = false;
      }
    });
  },

  methods: {
    async updateFavouriteUni(universityName) {
      const index = this.favouriteUniversities.indexOf(universityName);
      if (index === -1) {
        // Not favourited
        this.favouriteUniversities.push(universityName);
      } else {
        // Favourited
        this.favouriteUniversities.splice(index, 1);
      }
      await setDoc(
        this.accountRef,
        { favouriteUniversity: this.favouriteUniversities },
        { merge: true }
      );
      console.log(this.favouriteUniversities);
      this.showSnackbar = true;
    },
    async getFavouriteUnis(email) {
      try {
        this.accountRef = doc(db, "Account", email);
        const userData = await getDoc(this.accountRef);
        if (userData.exists()) {
          return userData.data().favouriteUniversity;
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    async fetchAllData() {
      this.nearbyHotelsData = await this.fetchData("lodging");
      // this.nearbyAttractionsData = await this.fetchData("tourist_attraction");
      this.nearbyAttractionsData = await this.fetchData("point_of_interest");
      this.nearbyRestaurantsData = await this.fetchData("restaurant");
    },
    async fetchData(placeType) {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Replace with your own proxy server
      // https://developers.google.com/maps/documentation/places/web-service/supported_types
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.latitude},${this.longitude}&radius=1000&type=${placeType}&key=${this.api_key}`;
      const response = await fetch(proxyUrl + apiUrl, {
        headers: {
          Origin: "http://localhost:8080",
          // change to your localhost
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      const data = await response.json();
      const result = data.results;
      let processed_results = [];
      for (let i = 1; i < result.length; i++) {
        // try {
        //   let row = {
        //     name: result[i].name,
        //     rating: result[i].rating,
        //     user_ratings_total: result[i].user_ratings_total,
        //     latitude: result[i].geometry.location.lat,
        //     longitude: result[i].geometry.location.lng,
        //   };
        //   processed_results.push(row);
        // } catch (err) {
        //   console.log("SKIP");
        // }
        if (
          result[i].name === undefined ||
          result[i].rating === undefined ||
          result[i].user_ratings_total === undefined ||
          result[i].geometry.location.lat === undefined ||
          result[i].geometry.location.lng === undefined
        ) {
          console.log("SKIP");
          continue;
        }

        // Add row to processed_results
        let row = {
          name: result[i].name,
          rating: result[i].rating,
          user_ratings_total: result[i].user_ratings_total,
          latitude: result[i].geometry.location.lat,
          longitude: result[i].geometry.location.lng,
        };
        processed_results.push(row);
      }
      processed_results.sort((a, b) => {
        // Sort by rating in descending order
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // If ratings are equal, sort by number of ratings in descending order
        return b.user_ratings_total - a.user_ratings_total;
      });
      processed_results = processed_results.slice(0, 5);
      // Limit to top 5 results
      console.log(processed_results);
      return processed_results;
    },
    onTabSelected(index) {
      console.log("Selected tab:", index);
    },
    async getCoordinates() {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.universityName}&key=${this.api_key}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
        this.center = { lat: this.latitude, lng: this.longitude };
      } else {
        this.latitude = null;
        this.longitude = null;
        console.log("Unable to get coordinates.");
      }
      // console.log(this.center);
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
    countryLinks() {
      return [
        {
          name: "Course Catalogue",
          link: this.universityData.courseCatalogueURL,
        },
        {
          name: "Necessary VISA:",
          link: this.universityData.visaURL,
        },
        {
          name: "Cost of Living:",
          link: this.universityData.livingCostURL,
        },
      ];
    },
    otherLinks() {
      return [
        {
          name: "Website:",
          link: this.universityData.websiteURL,
        },
        {
          name: "Scholarships:",
          link: this.universityData.scholarshipsURL,
        },
        {
          name: "Housing:",
          link: this.universityData.housingURL,
        },
      ];
    },
    isFavourite() {
      return this.favouriteUniversities.includes(this.universityName);
    },
  },
  async beforeMount() {
    // Get Attractions Data
    this.fetchAllData();
    // Get latitude/longitude
    this.getCoordinates();
    // Get Firebase Data
    try {
      const docRef = doc(db, "ListOfUniversities", this.universityName);
      const firebaseData = await getDoc(docRef);
      if (firebaseData.exists) {
        const {
          AnyVacancies,
          Continent,
          Country,
          CourseCatalogueURL,
          ScholarshipsURL,
          HousingURL,
          ImageURL,
          LivingCostURL,
          LanguageProficiency,
          MinGPA,
          SemOneVacancies,
          SemOneWindow,
          SemTwoVacancies,
          SemTwoWindow,
          UniDescription,
          VisaURL,
          WebsiteURL,
        } = firebaseData.data();

        this.universityData = {
          anyVacancies: AnyVacancies || null,
          continent: Continent || null,
          country: Country || null,
          courseCatalogueURL: CourseCatalogueURL || null,
          scholarshipsURL: ScholarshipsURL || null,
          housingURL: HousingURL || null,
          imageURL: ImageURL || null,
          livingCostURL: LivingCostURL || null,
          languageProficiency: LanguageProficiency || null,
          minGPA: MinGPA || null,
          semOneVacancies: SemOneVacancies || null,
          semOneWindow: SemOneWindow || null,
          semTwoVacancies: SemTwoVacancies || null,
          semTwoWindow: SemTwoWindow || null,
          uniDescription: UniDescription || null,
          visaURL: VisaURL || null,
          websiteURL: WebsiteURL || null,
        };
      } else {
        this.firebaseError = true;
      }
    } catch (error) {
      this.firebaseError = true;
    }
    // Once Firebase data & Google Maps data have loaded, then we can return isDataLoaded = true
    // isDataLoaded is for Google Maps, firebaseError is for Firebase
    this.isDataLoaded = true;
  },
  data() {
    return {
      universityName: this.$route.params.universityName,
      api_key: "AIzaSyCcEZCP5u8LgWpLbsWnfGeDwREh22vuYJ8",
      accountRef: null,
      selectedTab: 0,
      isDataLoaded: false,
      isLoggedIn: false,
      showSnackbar: false,
      nearbyRestaurantsData: null,
      nearbyAttractionsData: null,
      nearbyHotelsData: null,
      universityData: null,
      favouriteUniversities: [],
      firebaseError: false,
      center: null,
      longitude: null,
      latitude: null,
      markerOptions: {
        position: this.center,
        label: this.universityName,
        title: this.universityName,
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
  margin: 2% 0%;
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
  margin: 2% 0%;
}
.description {
  font-weight: 500;
  width: 100%;
  margin: 2% 0%;
}
.academic-window,
.vacancies {
  font-weight: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2% 0%;
}
.table {
  font-weight: 100;
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
