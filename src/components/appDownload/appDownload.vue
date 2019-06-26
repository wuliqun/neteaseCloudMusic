<template>
    <div class="app-dld">
        <div class="title">
            网易云音乐多端下载
        </div>
        <div class="dld-list">
            <div class="ios icon"></div>
            <div class="win icon"></div>
            <div class="android icon"></div>
        </div>
        <div class="desc">同步歌单，随时畅听320k好音乐</div>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="scss" scoped>
    .app-dld{
        .title{
            line-height: 30px;
            font-size: 12px;
            color:#333;
            border-bottom: 1px solid #ccc;
        }
        .dld-list{
            display: flex;
            justify-content: space-between;
            align-items:center;
            padding:20px 6px;
            .icon{
                width:31px;
                height:48px;
                cursor:pointer;
                background:url(../../assets/app-icon.png) no-repeat 0 0;
            }
            .ios{                
                &:hover{
                    background-position: 0 -66px;
                }
            }
            .win{
                width:61px;
                background-position: 0 -150px;
                &:hover{
                    background-position: 0 -210px;
                }
            }
            .android{
                background-position: 0 -277px;
                &:hover{
                    background-position: 0 -358px;
                }
            }
        }
        .desc{
            line-height: 30px;
            font-size: 12px;
            color:#999;
        }
    }
</style>


