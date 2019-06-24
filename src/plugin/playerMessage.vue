<template>
    <div class="info" v-show="show">
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show:false,
            msg:''
        }
    },
    methods:{
        // type 'success','warn','reject'
        showMsg({msg,duration=2000} = {}){
            this.show = true
            this.msg = msg
            setTimeout(()=>{
                this.show = false
            },duration)
        }
    }
}
</script>
<style lang="scss" scoped>
    .info{
		position:absolute;
		width:152px;
		height:48px;
		top:-62px;
		left:-80px;
		text-align:center;
		line-height:40px;
		color:#ccc;
		font-size:13px;
		background:url(../assets/playbar.png) no-repeat 0 -287px;
	}
</style>
