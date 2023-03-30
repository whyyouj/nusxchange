<template>
  <div class="main">
    <v-divider></v-divider>
    <div class="content">
      <div class="logo">
        <img
          style="width: 100px; height: 100px"
          src="../assets/nusxchange1.png"
        />
        The One-stop portal for Exchangers.
      </div>
      <div class="links">
        <div class="socials" style="display: flex; flex-flow: column nowrap">
          <h3>Socials</h3>
          <div v-for="socialLink in this.socialLinks" :key="socialLink.name">
            <a href="socialLink.url">{{ socialLink.name }}</a>
          </div>
        </div>
        <div class="account">account</div>
        <div class="newsletter">newsletter</div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="disclaimer">© 2023 NUSXchange. All rights reserved.</div>
  </div>
</template>
<!-- 
export default { data() { return { links: [ { name: "NUS SEP Financial Aid",
url: NUS_FINANCIAL_AID_URL, }, { name: "NUS Student Travel Insurance", url:
NUS_STUDENT_TRAVEL_INSURANCE_URL, }, { name: "Third Party Travel Insurance",
url: THIRD_PARTY_TRAVEL_INSURANCE_URL, }, { name: "International SOS", url:
INTERNATIONAL_SOS_URL }, ], }; -->
<script>
export default {
  data() {
    return {
      socialLinks: [
        { name: "Twitter", url: "www.twitter.com" },
        { name: "Gmail", url: "www.gmail.com" },
        { name: "GitHub", url: "https://github.com/wjingen/nusxchange" },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  /* background-color: red; */
}
.content {
  display: flex;
}
.socials {
  width: 500px;
  height: 200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  /* background-color: red; */
}
a {
  font-weight: 200;
  text-decoration: none;
  color: var(--primary);
}
a:hover {
  color: black;
}
.logo {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 40%;
}
.links {
  display: flex;
  /* background-color: red; */
}
.disclaimer {
  display: flex;
  justify-content: center;
  font-weight: 100;
  padding: 3%;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
