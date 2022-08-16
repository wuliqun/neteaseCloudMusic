<template>
	<div id="friend">
		<div class="wrapper">
			<div class="nologin">
				<div class="desc">
					<p>你可以关注明星和好友品味他们的私房歌单通过他们的动态发现更多精彩音乐</p>
				</div>
				<a class="login-btn" @click="login"></a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			login(e){
				this.$messageUtil.toast({
					msg:'SORRY,无法进行与登录相关操作',
					type:'warn'
				});
			}
		}
	}
</script>
<style scoped>
	#friend{
		background-color:#f5f5f5;
	}
	#friend .wrapper{
		width:902px;
		margin:0 auto;
		padding:50px 0 120px;
		background-color:#fff;
		border:solid #e3e3e3;
		border-width:0 1px;
	}
	#friend .nologin{
		position:relative;
		width:857px;
		height:430px;
		margin:0 20px;
		background:url(../../img/friend.jpg) no-repeat 0 0;
	}
	#friend .nologin .desc{
		width:280px;
		padding:170px 0 0 534px;
		color:#666;
		line-height:24px;
	}
	#friend .nologin .login-btn{
		position:absolute;
		top:259px;
		left:535px;
		width:158px;
		height:49px;
	}
	#friend .nologin .login-btn:hover{
		background:url(../../img/friend.jpg) no-repeat 0 -430px;
	}
</style>