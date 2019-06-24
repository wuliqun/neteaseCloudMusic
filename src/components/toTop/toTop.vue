<template>
	<a class="to-top" v-show="show" @click="toTop">
		<i class="icon-up"></i>
		<span>TOP</span>
	</a>
</template>

<script>
	export default{
		data(){
			return{
				show:false
			}
		},
		mounted(){
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop > 0){
				this.show = true;
			}
			document.addEventListener('scroll',()=>{
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop > 0){
					this.show = true;
				}else{
					this.show = false;
				}
			});
		},
		methods:{
			toTop(){
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			}
		}
	}
</script>

<style scoped>
	.to-top{
		position:fixed;
		right:50%;
		bottom:160px;
		width:45px;
		height:40px;
		margin-right:-550px;
		border:1px solid #d4d4d4;
		border-radius:5px;
		text-align:center;
		background-color:#f5f5f5;
	}
	.to-top:hover{
		text-decoration:none !important;
		background-color:#ededed;
	}
	.to-top .icon-up{
		display:block;
		width:11px;
		height:8px;
		margin:7px 0 0 17px;
		background:url(../../assets/icon.png) no-repeat -45px -520px;
	}
	.to-top span{
		margin-top:15px;
	}
</style>