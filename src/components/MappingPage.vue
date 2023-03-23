<template>
  <div class="main">
    <h2>Module Mapping Page</h2>
    <img src="https://wallpapercave.com/wp/wp1954746.jpg" alt="" style="width: 100%; border-radius: 15px;">
    <div class="search-container">
      <input type="text" placeholder="Search...">
      <button class="add-module-btn">Add Module</button>
    </div>
  </div>
</template>

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
}

.add-module-btn {
  background-color: #4CAF50;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
}

.add-module-btn:hover {
  background-color: #45a049;
}
</style>
