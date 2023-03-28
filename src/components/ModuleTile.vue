<template>
  <div class="module-tile">
    <router-link
      :to="`/university/` + university"
      style="text-decoration: none; color: var(--primary)"
    >
    <div class="module-tile-header">
      <div class="university">{{ university }}</div>
      <div class="local-modules-count">{{ localModulesCount }} </div>
    </div>
    <div class="module-tile-body">
      <div class="module-tile-body-row-1">
        <div class="location-gpa-language">{{ continent }}, {{ country }}&nbsp;&nbsp;&nbsp;&nbsp;Average GPA: {{ gpa }}/5.0&emsp;&emsp;&emsp;&emsp;Language Proficiency: {{ languageRequirements }}</div>
      </div>
      <div v-for="(module, index) in moduleSets" :key="index">
        <div class="module-set-header">{{ module.localCode }} - {{ module.localName }}</div>
        <div class="module-set-body">
          <div class="module-partner" v-for="(partnerModule, index) in module.partnerModules" :key="index">
            <div class="module-partner-code">{{ partnerModule.partnerCode }}</div>
            <div class="module-partner-name">{{ partnerModule.partnerName }}</div>
          </div>
          <hr class="horizontal-rule">
          <br>
        </div>
      </div>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    university: {
      type: String,
      required: true
    },
    localModulesCount: {
      type: Number,
      required: true
    },
    continent: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    gpa: {
      type: Number,
      required: true
    },
    languageRequirements: {
      type: String,
      required: true
    },
    moduleSets: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.module-tile {
  border: 3px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}

.module-tile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.university {
  font-size: 24px;
  font-weight: bold;
}

.local-modules-count {
  font-size: 24px;
  font-weight: bold;
  color: #194569;
}

.module-tile-body-row-1 {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.location-gpa-language {
  flex-basis: 100%;
  font-size: 90%;
  margin-bottom: 10px;
  color: #5F84A1;
  font-weight: bold;  
  line-height: 100%;
  display: flex;
}

.average-gpa {
  flex-basis: 25%;
  font-size: 15px;
  margin-right: 20px;
  font-weight: normal;
}

.language-requirements {
  flex-basis: 25%;
  font-size: 15px;
  font-weight: normal; 
}

.module-set-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.module-partner {
  color: #5F84A1;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.module-partner-code {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .module-tile-body-row-1 {
    flex-direction: column;
    align-items: center;
  }
  
  .module-set-body {
    flex-direction: column;
    margin-left: -5px;
    margin-right: -5px;
    border-bottom: 10px solid #000000;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -5px;
  }
  
  .module-partner-name {
    color: #5F84A1;
    font-weight: normal;
  }
  
  .horizontal-rule {
    opacity: 0.25;
    border: 1px solid #90AFC4;
    height: 0px;
  }
}
</style>
