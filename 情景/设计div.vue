<template>
<div class="container">
    <i class="icon"></i>
    <span class="text">这是一段很长的文字</span>
</div>

</template>

<style scoped>
.container{
    display: flex;
    align-items: center;
    width: 100%;
}

.icon{
    margin-right: 10px;
}

.text{
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  

}


</style>