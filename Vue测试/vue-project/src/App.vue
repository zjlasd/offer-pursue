<template>
  <div class="carousel">
      <div class="carousel-images">
          <div class="carousel-image" v-for="(image, index) in images" :key="index"
              :class="{ active: currentIndex.value === index }">
              <img :src="image" alt="Carousel image" />
          </div>
      </div>

      <!-- Previous button -->
      <button class="prev" @click="prevImage">Prev</button>

      <!-- Next button -->
      <button class="next" @click="nextImage">Next</button>

      <!-- Indicator dots -->
      <div class="indicators">
          <span v-for="(image, index) in images" :key="index" class="indicator"
              :class="{ active: currentIndex.value === index }" @click="goToImage(index)"></span>
      </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
      // 图片列表
      const images = [
          'https://via.placeholder.com/600x300?text=Image+1',
          'https://via.placeholder.com/600x300?text=Image+2',
          'https://via.placeholder.com/600x300?text=Image+3',
          'https://via.placeholder.com/600x300?text=Image+4'
      ];

      // 当前图片索引
      const currentIndex = ref(0);

      // 定时器 ID
      let autoSlide = null;

      // 自动切换图片
      const startAutoSlide = () => {
          autoSlide = setInterval(() => {
              nextImage();
          }, 3000); // 每3秒切换一次
      };

      // 停止自动切换
      const stopAutoSlide = () => {
          if (autoSlide) {
              clearInterval(autoSlide);
          }
      };

      // 切换到上一张图片
      const prevImage = () => {
          currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
      };

      // 切换到下一张图片
      const nextImage = () => {
          currentIndex.value = (currentIndex.value + 1) % images.length;
      };

      // 跳转到指定图片
      const goToImage = (index) => {
          currentIndex.value = index;
      };

      // 在组件挂载时启动自动轮播
      onMounted(() => {
          startAutoSlide();
      });

      // 在组件卸载时清除定时器
      onBeforeUnmount(() => {
          stopAutoSlide();
      });

      return {
          images,
          currentIndex,
          prevImage,
          nextImage,
          goToImage
      };
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 600px;
  height: 300px;
  overflow: hidden;
  margin: 0 auto;
}

.carousel-images {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-image {
  flex: 0 0 100%;
  display: none;
}

.carousel-image.active {
  display: block;
}

.carousel img {
  width: 100%;
  height: 100%;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.indicator {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.indicator.active {
  background-color: white;
}
</style>