<template>
    <div class="share-btn clearfix">
        <a @click="$emit('click')" class="share" :class="{disabled:disabled}">
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
    .share-btn{
        .share{
            position:relative;
            float: left;
            height:31px;
            line-height:31px;
            padding:0 7px 0 28px;
            color:#333;            
            background:url(../../img/button2.png) no-repeat 0 -1225px;
            &:after{
                content:'';
                position:absolute;
                width:5px;
                height:100%;
                right:0;
                top:0;
                background:url(../../img/button2.png) no-repeat -245px -1020px;
            }
            &:hover{
                background-position:0 -1268px;
            }
            &:hover:after{
                background-position:-245px -1106px;
            }
            &.disabled{
                background-position:0 -1311px;
            }
            &.disabled:after{
                background-position:-245px -1192px;
            }
        }
    }    
</style>