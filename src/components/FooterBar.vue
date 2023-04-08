<template>
  <div class="main">
    <v-divider></v-divider>
    <div class="content">
      <div class="logo">
        <img
          style="width: 100px; height: 100px"
          src="../assets/clear_nusxchange.png"
        />
        The One-stop Portal for Exchangers.
      </div>
      <div class="links">
        <div class="socials" style="display: flex; flex-flow: column nowrap">
          <h3>Socials</h3>

          <div v-for="socialLink in this.socialLinks" :key="socialLink.name">
            <font-awesome-icon :icon="['fab', socialLink.iconName]" size="lg" />
            <a
              style="padding-left: 5%"
              :href="socialLink.url"
              target="_blank"
              >{{ socialLink.name }}</a
            >
          </div>
        </div>
        <div class="account">
          <h3>Pages</h3>
          <router-link to="/university">Universities</router-link>
          <router-link to="/mapping">Module Mapping</router-link>
          <router-link to="/signin/account-management-page"
            >Account Management</router-link
          >
        </div>
        <div class="report">
          <h3>Report Issues</h3>
          <span style="font-weight: 100"
            >Any issues or suggestions for our website?</span
          >
          <v-btn onclick="window.location.href='mailto:nusxhange@gmail.com'">
            Send email
          </v-btn>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="disclaimer">© 2023 NUSXchange. All rights reserved.</div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  data() {
    return {
      socialLinks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com",
          iconName: "linkedin",
        },
        {
          name: "GitHub",
          url: "https://github.com/BT3103AppDev1/l2-final-project-group-2-1",
          iconName: "github",
        },
        {
          name: "YouTube",
          url: "https://www.youtube.com",
          iconName: "youtube",
        },
      ],
    };
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.main {
  padding-top: 5%;
}
.content {
  display: flex;
  height: 200px;
}
.logo,
.socials,
.account,
.report,
.logo {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
}
.socials {
  width: 20%;
}
a {
  font-weight: 200;
}
a:hover {
  color: black;
}
.logo {
  align-items: center;
  width: 40%;
}
.links {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.disclaimer {
  display: flex;
  justify-content: center;
  font-weight: 100;
  padding: 2%;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
