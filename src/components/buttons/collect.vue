<template>
    <div class="collect-btn clearfix">
        <a @click="$emit('click')" class="collect" :class="{disabled:disabled}">
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
    .collect-btn{
        .collect{
            position:relative;
            float: left;
            height:31px;
            line-height:31px;
            padding:0 7px 0 28px;
            color:#333;            
            background:url(../../img/button2.png) no-repeat 0 -977px;
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
                background-position:0 -1063px;
            }
            &:hover:after{
                background-position:-245px -1106px;
            }
            &.disabled{
                background-position:0 -1149px;
            }
            &.disabled:after{
                background-position:-245px -1192px;
            }
        }
    }    
</style>

