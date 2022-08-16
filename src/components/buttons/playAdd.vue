<template>
    <div class="play-add clearfix">
        <a class="play" @click="$emit('play')">播放</a>
        <a class="add" title="添加到播放列表" @click="$emit('add')">
        </a>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="scss" scoped>
    .play-add{
        .play{
            float: left;
            width: 62px;
            line-height: 31px;
            text-indent: 25px;
            text-align: center;
            color: #fff;
            background:url(../../img/button2.png) no-repeat 0 -633px;
            &:hover{
                background-position:0 -719px;
            }
        }
        .add{
            float: left;
            width:31px;
            height: 31px;
            line-height: 31px;
            background: url(../../img/button2.png) no-repeat 0 -1588px;
            &:hover{
                background-position:-40px -1588px;
            }
        }
    }
</style>
