<template>
  <div>
    <h2>List of Exchange Universities</h2>
    <div class="filter-bar">
      <ul>
        <li v-for="continent in continents"
            :key="continent.id"
            :class="{ active: continent.active }"
            @click="toggleContinent(continent)">
          {{ continent.name }}
        </li>
      </ul>
    </div>
    <div class="tile-list">
      <UniTile v-for="university in filteredUniversities"
               :key="university.id"
               :name="university.name"
               :country="university.country"
               :continent="university.continent"
               :gpa="university.gpa"
               :imageUrl="university.imageUrl"
               :universityUrl="university.url"
               class="tile" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
