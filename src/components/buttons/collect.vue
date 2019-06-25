<template>
    <div class="collect-btn">
        <a class="collect" @click="$emit('click')">
            {{ text }}
        </a>
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String,
            default:'收藏'
        }
    }
}
</script>
<style lang="scss" scoped>
    .collect-btn{
        .collect{
            position: relative;
            height:31px;

            &:after{
                content: '';
                position: absolute;
                width: 5px;
                height: 100%;
                right: 0;
                top: 0;
                background: url(../../assets/button2.png) no-repeat -245px -1020px;
            }
        }
    }
</style>

