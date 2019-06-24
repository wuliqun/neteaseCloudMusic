<template>
	<div id="user-info-container">
		<div class="user-info" v-if="logged">
			
		</div>
		<div class="user-login" v-if="!logged">
			<p class="desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
			<div class="login-btn-wrapper">
				<a class="login-btn">用户登录</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				logged:false
			}
		}
	}
</script>

<style scoped>
	#user-info-container{
		width:250px;
		height:125px;
		border-bottom:1px solid #b1b1b1;
		background-color:#e2e2e2;
	}
	#user-info-container .user-login .desc{
		margin:0 20px;
		padding:16px 0;
		line-height:22px;
		color:#666;
	}
	#user-info-container .user-login .login-btn-wrapper{
		text-align:center;
	}
	#user-info-container .user-login .login-btn{
		display:inline-block;
		width:100px;
		line-height:30px;
		color:#fff;
		background:url(../../../assets/index.png) no-repeat 0 -195px;;
	}
	#user-info-container .user-login .login-btn:hover{
		text-decoration:none;
		background-position:-110px -195px;
	}
</style>