<template>
  <div class="container">
    <div class="component">
      <h1>General Help</h1>
      <img src="../assets/about-utown-scaled.jpeg" alt="" />
    </div>

    <div class="component">
      <h1>Application Dates*</h1>
      <table id="table" class="auto-index">
        <thead>
          <tr class="trEnd">
            <th>Faculty</th>
            <th>Round</th>
            <th>Application Period</th>
          </tr>
        </thead>
        <tbody>
          <!-- Biz -->
          <tr>
            <td rowspan="2">BIZ</td>
            <td>1</td>
            <td>Early November to Early December 2022</td>
          </tr>
          <tr class="trEnd">
            <td>2</td>
            <td>Mid May to Mid June 2023</td>
          </tr>

          <!-- FASS/CHS  -->
          <tr>
            <td rowspan="2">FASS/CHS</td>
            <td>1</td>
            <td>End August to Early September 2022</td>
          </tr>

          <tr class="trEnd">
            <td>2</td>
            <td>Mid January to End January 2023</td>
          </tr>

          <!-- CDE -->
          <tr>
            <td rowspan="2">CDE</td>
            <td>1</td>
            <td>Early October to End October 2022</td>
          </tr>

          <tr class="trEnd">
            <td>2</td>
            <td>Late January to Late February 2023</td>
          </tr>

          <!-- CDE breakdown -->
          <tr>
            <td>CDE - DOA / DBE</td>
            <td>1</td>
            <td>Late August to September 2022</td>
          </tr>

          <tr class="trEnd">
            <td>CDE - DOA / DBE / DID</td>
            <td>2</td>
            <td>December to January 2023</td>
          </tr>

          <!-- Fos/CHS -->
          <tr>
            <td rowspan="2">FoS / CHS</td>
            <td>1</td>
            <td>End August to Early September 2022</td>
          </tr>

          <tr class="trEnd">
            <td>2</td>
            <td>Mid January to End January 2023</td>
          </tr>

          <!-- Law -->
          <tr class="trEnd">
            <td>LAW</td>
            <td>1</td>
            <td>21 October to 5 December 2022</td>
          </tr>

          <!-- SoC / CEG -->
          <tr>
            <td rowspan="2">SoC / CEG</td>
            <td>1</td>
            <td>26 August to 25 September 2022</td>
          </tr>

          <tr class="trEnd">
            <td>2</td>
            <td>28 April to 28 May 2023</td>
          </tr>

          <!-- NUSC -->
          <tr>
            <td rowspan="2">NUSC</td>
            <td>1</td>
            <td>19 September to 7 October 2022</td>
          </tr>

          <tr>
            <td>2</td>
            <td>23 January to 10 February 2023</td>
          </tr>
        </tbody>
      </table>
      <h5>
        *Information accurate as at 5 August 2022. Please note that the
        application periods are subjected to change.
      </h5>
    </div>

    <div class="component">
      <h1>Financial Aid, Insurance and International SOS</h1>
      <div class="links">
        <div v-for="link in links" :key="link.url" class="row">
          <p>{{ link.name }}</p>
          <a :href="link.url" target="_blank">{{ link.url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NUS_FINANCIAL_AID_URL,
  NUS_STUDENT_TRAVEL_INSURANCE_URL,
  THIRD_PARTY_TRAVEL_INSURANCE_URL,
  INTERNATIONAL_SOS_URL,
} from "../routes/index";

export default {
  data() {
    return {
      links: [
        {
          name: "NUS SEP Financial Aid",
          url: NUS_FINANCIAL_AID_URL,
        },
        {
          name: "NUS Student Travel Insurance",
          url: NUS_STUDENT_TRAVEL_INSURANCE_URL,
        },
        {
          name: "Third Party Travel Insurance",
          url: THIRD_PARTY_TRAVEL_INSURANCE_URL,
        },
        { name: "International SOS", url: INTERNATIONAL_SOS_URL },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
}
img {
  height: 100%;
  width: 100%;
  border-radius: 20px;
}
h1 {
  padding-top: 10px;
  padding-bottom: 10px;
}
h5 {
  font-weight: bold;
  color: #90afc4;
  border-top: solid;
  border-color: #90afc4;
  border-width: 0.1px;
  padding-top: 5px;
}
.component {
  width: 100%;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  text-align: left;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2px;
}
thead {
  text-align: left;
}
td {
  font-weight: normal;
  width: 100px;
}
.trEnd {
  border-bottom: solid;
  border-color: #90afc4;
  border-width: 0.1px;
}
/* a {
  text-decoration: none;
  color: var(--primary);
  font-weight: bold;
  width: 700px;
}
a:hover {
  color: rgb(144, 175, 196);
} */
</style>
