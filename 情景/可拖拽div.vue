<template>
    <div class="draggable" ref="draggable" @mousedown="startDrag"
        :style="{ left: position.x + 'px', top: position.y + 'px' }">
        拖拽我
    </div>
</template>

<script setup>
import { ref } from 'vue';

const position = ref({ x: 0, y: 0 });  // 初始位置
const dragging = ref(false);  // 是否正在拖拽
const startPos = ref({ x: 0, y: 0 });  // 鼠标按下时的位置

const startDrag = (event) => {
    dragging.value = true;
    startPos.value = { x: event.clientX - position.value.x, y: event.clientY - position.value.y };

    // 添加鼠标移动和松开事件监听
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
};

const onDrag = (event) => {
    if (dragging.value) {
        position.value.x = event.clientX - startPos.value.x;
        position.value.y = event.clientY - startPos.value.y;
    }
};

const stopDrag = () => {
    dragging.value = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
};
</script>

<style scoped>
.draggable {
    width: 200px;
    height: 200px;
    background-color: lightblue;
    position: absolute;
    cursor: grab;
}

.draggable:active {
    cursor: grabbing;
}
</style>