<template>
    <div class="comment-btn clearfix">
        <a @click="$emit('click')" class="comment" :class="{disabled:disabled}">
            <slot></slot>
        </a>
    </div>
</template>
<script>
    export default {
        props:{
            disabled:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .comment-btn{
        .comment{
            position:relative;
            float: left;
            height:31px;
            line-height:31px;
            padding:0 7px 0 28px;
            color:#333;            
            background:url(../../assets/button2.png) no-repeat 0 -1465px;
            &:after{
                content:'';
                position:absolute;
                width:5px;
                height:100%;
                right:0;
                top:0;
                background:url(../../assets/button2.png) no-repeat -245px -1020px;
            }
            &:hover{
                background-position:0 -1508px;
            }
            &:hover:after{
                background-position:-245px -1106px;
            }
            &.disabled{
                background-position:0 -1551px;
            }
            &.disabled:after{
                background-position:-245px -1192px;
            }
        }
    }    
</style>

