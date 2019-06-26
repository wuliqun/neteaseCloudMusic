<template>
    <div class="tag" :class="type">
    </div>
</template>
<script>
    export default {
        props:{
            type:{
                type:String,
                default:'song'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tag{
        width:54px;
        height:24px;
        background:url(../../assets/icon-1.png) no-repeat 0 0;
        &.song{            
            background-position: 0 -463px;
        }
        &.playlist{
            background-position: 0 -243px;
        }
        &.dj{
            width:65px;
            background-position: 0 -214px;
        }
        &.album{
            background-position: 0 -186px;
        }
        &.radio{
            background-position: 0 -1014px;
        }
        &.radioProgram{
            width:73px;
            background-position: 0 -1050px;
        }
    }
</style>


