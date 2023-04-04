<template>
  <Carousel
    :itemsToShow="3"
    :wrapAround="true"
    :transition="1000"
    :autoplay="3500"
  >
    <Slide v-for="uniImg in uniImgList" :key="uniImg">
      <div class="carousel__item">
        <img class="caroImg" :src="uniImg" alt="" />
      </div>
    </Slide>

    ...
  </Carousel>
</template>

<script>
import {
  ARIZONA_STATE_IMAGE,
  EINDHOVEN_IMAGE,
  ETH_ZURICH_IMAGE,
  KOREA_UNIVERSITY_IMAGE,
  KYOTO_UNIVERSITY_IMAGE,
  TOKYO_UNIVERSITY_IMAGE,
  TRINITY_DUBLIN_COLLEGE_IMAGE,
  UNIVERSITY_WESTERN_AUSTRALIA,
} from "@/routes";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Autoplay",

  data() {
    return {
      uniImgList: [
        ARIZONA_STATE_IMAGE,
        EINDHOVEN_IMAGE,
        KOREA_UNIVERSITY_IMAGE,
        ETH_ZURICH_IMAGE,
        TRINITY_DUBLIN_COLLEGE_IMAGE,
        TOKYO_UNIVERSITY_IMAGE,
        KYOTO_UNIVERSITY_IMAGE,
        UNIVERSITY_WESTERN_AUSTRALIA,
      ],
    };
  },

  components: {
    Carousel,
    Slide,
    // eslint-disable-next-line vue/no-unused-components
    Pagination,
  },
};
</script>


<style scoped>
.carousel__item {
  height: 70vh;
}
.caroImg {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>