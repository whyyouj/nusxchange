<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="tile" @click="navigateToUniversityPage">
    <div class="tile-image">
      <img :src="imageUrl" :alt="name">
    </div>
    <div class="tile-content">
      <h3 class="tile-title">{{ name }}</h3>
      <div class="tile-location">
        <p>
          <i class="fa fa-location-arrow"></i>{{ country }}&nbsp;
          <i class="fa fa-globe"></i>{{ continent }}
        </p>
      </div>
      <div class="tile-gpa">
        <p>Minimum GPA: {{ gpa }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UniTile',
  props: {
    name: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    continent: {
      type: String,
      required: true
    },
    gpa: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    universityUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    navigateToUniversityPage() {
      window.location.href = this.universityUrl;
    }
  }
}
</script>
<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 270px;
  height: 350px;
  transition: transform 0.3s ease;
  margin-right: 20px;
  margin-bottom: 30px;
  cursor: pointer;
}

.tile:last-child {
  margin-right: 0;
}

.tile:hover {
  transform: translateY(-2.5%);
}

.tile-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.tile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-content {
  padding: 20px;
}

.tile-title {
  font-size: 20px;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.tile-location {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0 0 10px 0;
}

.tile-location i {
  margin-right: 5px;
}

.tile-gpa {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0 0 15px 0;
}

.tile-gpa i {
  margin-right: 5px;
}

.tile-button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ff5a5f;
  color:white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tile-button:hover {
  background-color: #ff4247;
}

.tile-icon {
  margin-right: 5px;
}
</style>
