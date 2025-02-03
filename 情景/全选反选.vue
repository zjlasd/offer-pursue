<template>
    <div>
        <!-- 全选 -->
        <input type="checkbox" :checked="isAllSelected" @change="selectAll" /> 全选

        <!-- 反选 -->
        <input type="checkbox" :checked="isAllSelected && isPartiallySelected" @change="toggleInverseSelection" /> 反选

        <!-- 子项选择 -->
        <div v-for="(item, index) in items" :key="index">
            <input type="checkbox" v-model="checked[index]" />
            {{ item }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ['项1', '项2', '项3', '项4', '项5'];

// 记录每个子项的选中状态
const checked = ref([false, false, false, false, false]);

// 计算是否所有项都被选中
const isAllSelected = computed(() => checked.value.every(Boolean));

// 计算是否有部分选中
const isPartiallySelected = computed(() => {
    const selected = checked.value.filter(value => value).length;
    return selected > 0 && selected < checked.value.length;
});

// 全选
const selectAll = () => {
    if (isAllSelected.value) {
        checked.value = Array(items.length).fill(false);  // 取消全选
    } else {
        checked.value = Array(items.length).fill(true);   // 全选
    }
};

// 反选
const toggleInverseSelection = () => {
    checked.value = checked.value.map(item => !item);  // 反转每个项的选中状态
};
</script>