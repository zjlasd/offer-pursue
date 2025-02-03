<template>
    <div>
        <div class="dropdown-container" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLease">
            <slot name="icon"></slot>
            <slot name="text"></slot>
            <slot name="button"></slot>
        </div>

        <Transition name="fade">
            <ul v-if="isOpen">
                <li v-for="(item,index) in menuItems" :key="item" @click="item.action" >
                    {{ item.text }}
                </li>
            </ul>
        </Transition>
    </div>


</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
    trigger: {
        type: String,
        default:'click'
    },
    menuItems: {
        type: Array,
        default: []
    },
    animationDuration: {
        type: String,
        default:0.3
    }
})

const isOpen = ref(false)

const handleClick = () => {
    if (trigger === 'click') {
        isOpen.value = !isOpen.value
    }
}

const handleMouseEnter = () => {
    if (trigger === 'hover') {
        isOpen.value = true;
    }
}

const handleMouseLease = () => {
    if (trigger === 'hover') {
        isOpen.value = true;
    }
}


</script>


<style scoped>
    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.3s ease;
    }

    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

</style>