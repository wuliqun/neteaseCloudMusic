<template>
    <div class="title">{{ title }}</div>
</template>
<script>
    export default {
        props:{
            title:String
        }
    }
</script>
<style lang="scss" scoped>
    .title{
        line-height: 30px;
        font-size: 12px;
        color:#333;
        font-weight: 700;
        border-bottom: 1px solid #ccc;
    }
</style>


