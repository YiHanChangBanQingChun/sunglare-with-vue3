<template>
  <div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="carousel-item" v-for="(image, index) in images" :key="index">
        <div class="image-container">
          <img :src="image.src" :alt="image.caption">
        </div>
        <div class="carousel-caption">
          <h3>{{ image.caption }}</h3>
          <p>{{ image.text }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control prev" @click="prevSlide">‹</button>
    <button class="carousel-control next" @click="nextSlide">›</button>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentIndex: 0,
      intervalID: null
    }
  },
  mounted () {
    this.startAutoSlide()
  },
  beforeUnmount () {
    this.stopAutoSlide()
  },
  methods: {
    nextSlide () {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
    prevSlide () {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    },
    startAutoSlide () {
      this.intervalId = setInterval(this.nextSlide, 10000) // 每10秒切换一次
    },
    stopAutoSlide () {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-item img {
  width: 100%;
  display: block;
}

.image-container {
  width: 100%;
  padding-top: 33.33%; /* 3:1 aspect ratio */
  position: relative;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片的宽高比 */
  border-radius: 10px;
}

.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}
</style>
