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
            width:31px;
            text-indent: 25px;
            color: #fff;
            background:url(../../assets/button2.png) no-repeat 0 -633px;
        }
        .add{
            float: left;
            width:31px;
            height: 31px;
            line-height: 31px;
            background: url(../../assets/button2.png) no-repeat 0 -1588px;
        }
    }
</style>
