<template>
    <div class="lazy-image-wrapper">
        <!-- 当图片需要加载时，绑定真实的 src -->
        <img v-if="isIntersecting" :src="src" :alt="alt" class="lazy-image" />
        <!-- 占位符图片 -->
        <img v-else src="placeholder.jpg" alt="loading..." class="lazy-image" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 接收父组件传递的图片真实地址和图片的 alt
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
});

// 定义一个响应式变量来控制图片是否进入视口
const isIntersecting = ref(false);

// 通过 IntersectionObserver 来检测图片是否进入视口
let observer;

onMounted(() => {
    // 创建 IntersectionObserver 实例
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isIntersecting.value = true;
                // 一旦图片进入视口，停止观察
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1  // 设置 10% 进入视口时触发
    });

    // 观察目标元素
    const imageElement = document.querySelector('.lazy-image-wrapper');
    observer.observe(imageElement);
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();  // 在组件卸载时断开观察
    }
});
</script>

<style scoped>
.lazy-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.lazy-image {
    width: 100%;
    height: auto;
}
</style>