<template>
    <div class="search-tab clearfix">
        <div 
            class="tab-item"
            :style="{width:tabWidth}"
            v-for="tab in tabInfo"
            :class="{active:type===tab.type}"
            :key="tab.type">
            <div      
                @click="changeType(tab.type)"           
                class="tab-link">
                {{ tab.name }}
            </div>
        </div>
    </div>
</template>
<script>
    import tabInfo from './searchTabData'
    export default {
        data(){
            return {
                tabInfo:tabInfo
            }
        },
        props:{
            type:{
                type:Number,
                default:1
            }
        },
        methods:{
            changeType(type){
                this.$emit('changetype',type);
            }
        },
        computed:{
            tabWidth(){
                return (1/this.tabInfo.length)*100 + '%';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .search-tab{
        margin-bottom: 20px;
        border:solid #ccc;
        border-width:0 1px;
        .tab-item{
            float: left;
            box-sizing: border-box;
            border-top:2px solid #ccc;            
            border-bottom:1px solid #ccc;
            line-height: 36px;
            color:#333;
            text-align: center;
            transition:all .5s;
            background-color: #f7f7f7;
            &.active{
                border-top-color:#d13030;
                border-bottom-color:transparent;
                background-color: #fff;
                .tab-link{
                    border-color:transparent #ccc;
                }
            }
            &:first-child{
                .tab-link{
                    border-left: none;
                }                
            }
            &:last-child{
                .tab-link{
                    border-right: none;
                }                
            }
            &:hover{
                border-top-color:#d13030;
                background-color: #fff;
            }            
        }
        .tab-link{
            border:solid transparent;
            border-width:0 1px;
            cursor:pointer;
        }
    }
</style>
