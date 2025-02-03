<template>
    <div>
        <h1>父组件</h1>
        <p>来自子组件的消息：{{ message }}</p>
        <!-- 监听子组件的 'send-message' 事件 -->
        <ChildComponent @send-message="handleMessage" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue'; // 引入子组件

// 接收来自子组件的消息
const message = ref("");

// 处理子组件传递过来的数据
const handleMessage = (msg) => {
    message.value = msg;
};
</script>



<template>
    <div>
        <h2>子组件</h2>
        <button @click="sendMessageToParent">发送消息到父组件</button>
    </div>
</template>

<script setup>
  import { defineEmits } from 'vue';
  
  // 定义向父组件发送的事件
  const emit = defineEmits(['send-message']);
  
  // 发送消息的函数
  const sendMessageToParent = () => {
    emit('send-message', '这是从子组件传来的消息');
  };
  </script>