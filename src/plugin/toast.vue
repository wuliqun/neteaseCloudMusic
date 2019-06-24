<template>
    <div class="info" v-if="isShow">
        <div class="info-content" :class="type">
            <i class="icon"></i>
            <span class="txt">{{msg}}</span>	
        </div>
    </div>
</template>
<script>
	export default{
		data(){
			return {
                isShow:false,
                type:'',
                msg:''
			}
		},
		methods:{
            // type 'success','warn','reject'
            show({msg,type="success",duration=2000} = {}){
                this.type = type
                this.isShow = true
                this.msg = msg
                setTimeout(()=>{
                    this.isShow = false
                },duration)
            }
        }
	}
</script>

<style lang="scss" scoped>
    .info{
        position:fixed;
        z-index:9999;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        border:1px solid #c0c0c0;
        box-shadow:0 0 8px #999;
        .info-content{
            width:280px;
            line-height: 50px;
            text-align: center;
            font-size: 12px;
            &.success{
                color:#000;
                background-color: #fff;
                .icon{
                    display:inline-block;
                    width:18px;
                    height:18px;
                    margin-right: 6px;
                    vertical-align:middle;
                    background:url(../assets/icon-1.png) no-repeat -25px -430px;
                }
            }
            &.warn{
                color:#000;
                background-color: #fff;
                .icon{
                    display:inline-block;
                    width:18px;
                    height:18px;
                    margin-right: 6px;
                    vertical-align:middle;
                    background:url(../assets/icon-1.png) no-repeat -25px -407px;
                }
            }
            &.reject{
                color:#fff;
                background-color: #313131;
                .icon{
                    display:none;
                }
            }
        }
    }
</style>