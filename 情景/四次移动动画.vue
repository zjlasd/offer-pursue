<template>
    <div class="wrapper">
        <!-- 动画控制，通过绑定类来启用动画 -->
        <div class="box" :class="{ move: isMoving }"></div>
        <button @click="startAnimation">开始动画</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 控制动画状态
const isMoving = ref(false);

// 启动动画的函数
const startAnimation = () => {
    if (isMoving.value) return; // 防止重复点击触发动画

    isMoving.value = true;

    // 动画完成后重置
    setTimeout(() => {
        isMoving.value = false;
    }, 4000); // 4秒后停止动画
};
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.box {
    width: 100px;
    height: 100px;
    background-color: coral;
    position: relative;
}

/* 动画控制 */
.move {
    animation: moveLeft 4s linear forwards;
}

@keyframes moveLeft {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-100px);
    }

    50% {
        transform: translateX(-200px);
    }

    75% {
        transform: translateX(-300px);
    }

    100% {
        transform: translateX(-400px);
    }
}
</style>