<template>
    <div class="loading" v-show="show" ref="loading">
        <div class="loading-content" v-show="canBeSeen">
            <i class="icon rotating" v-if="hasMore"></i><span>{{ hasMore ? loadingText:loadedText }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                canBeSeen:false
            }
        },
        watch:{
            canBeSeen(val){
                if(val && this.hasMore){
                    // 提示父组件加载更多
                    this.$emit('loadingShowed');
                }
            }
        },
        mounted(){
            this.caculateCanBeSeen();
            document.addEventListener('scroll',()=>{
                if(this.show){
                    this.caculateCanBeSeen();
                }
            });
        },
        methods:{
            caculateCanBeSeen(){
                if(!this.$refs.loading) return;
                var winHeight = window.screen.availHeight;
                var offsetTop = this.$refs.loading.offsetTop;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                this.canBeSeen = offsetTop - scrollTop < winHeight;
            }
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            hasMore:{
                type:Boolean,
                default:true
            },
            loadingText:{
                type:String,
                default:'加载中...'
            },
            loadedText:{
                type:String,
                default:'已加载完成'
            }
        }        
    }
</script>
<style lang="scss">
    .loading{
        padding:10px 0;
        .loading-content{
            line-height:30px;
            font-size: 12px;
            text-align:center;
            transition: all .5s;
        }
        .icon{
            display: inline-block;
            vertical-align: middle;
            width:22px;
            height:22px;
            margin-right:10px;
            background: url(../../assets/loading.png) no-repeat 0 0;
        }
        .rotating{
            animation:rotate 1s linear infinite;
        }
    }
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(200deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>


