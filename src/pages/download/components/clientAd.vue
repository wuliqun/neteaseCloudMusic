<template>
	<div id="client-ad">
		<div class="row row1">
			<div class="wrapper clearfix">
				<div class="left info">
					<h2 class="title">千万曲库 首首CD音质</h2>
					<p class="desc">
						<span>囊括百万无损SQ音乐，你在用手机听歌时，</span><br>
						<span>也能感受到纤毫毕现的CD音质，更能免费离线收听</span>
					</p>
				</div>
				<div class="right img">
					<img src="https://music.163.com/style/web2/img/down/b1.jpg" alt="">
				</div>
			</div>
		</div>
		<div class="row row2">
			<div class="wrapper clearfix">
				<div class="left img">
					<img src="https://music.163.com/style/web2/img/down/b2.jpg" alt="">
				</div>
				<div class="right info">					
					<h2 class="title">千位明星 亲自推荐音乐</h2>
					<p class="desc">陶喆，羽泉等<em>千位明星已入驻</em>，亲自创建私房歌单，录制独家DJ节目，推荐他们心中的好音乐</p>
				</div>
			</div>
		</div>
		<div class="row row3">
			<div class="wrapper clearfix">
				<div class="left info">
					<h2 class="title">听歌识曲 助你疯狂猜歌</h2>
					<p class="desc">
						<span>歌曲很动听却不知道歌名，歌名在嘴边却想不起来……</span><br>
						<span>用<em>听歌识曲</em>功能，几秒钟就知道歌名</span>
					</p>
				</div>
				<div class="right img">
					<img src="https://music.163.com/style/web2/img/down/b5.jpg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {}
		}
	}
</script>

<style scoped>
	#clinet-ad{

	}
	#client-ad .wrapper{
		width:982px;
		margin:0 auto;
	}
	#client-ad .row{
		height:438px;
		border-bottom:1px solid #e3e3e3;
	}
	#client-ad .row:nth-child(n){
		background-color:#f8f8f8;
	}
	#client-ad .row:nth-child(2n+1){
		background-color:#fff;
	}
	#client-ad .row1 .wrapper{
		padding-top:120px;
	}
	#client-ad .row2 .wrapper{
		padding-top:106px;
	}
	#client-ad .row3 .wrapper{
		padding-top:53px;
	}
	#client-ad .left{
		float:left;
	}
	#client-ad .right{
		float:right;
	}
	#client-ad .info{
		width:415px;
	}
	#client-ad .info .title{
		font-size:38px;
		color:#333;
	}
	#client-ad .info .desc{
		font-size:16px;
		color:#666;
		line-height:24px;
	}
	#client-ad .info .desc em{
		color:#cc0000;
	}
	#client-ad .row1 .title{
		margin-top:50px;
	}
	#client-ad .row2 .title{
		margin-top:64px;
	}
	#client-ad .row3 .title{
		margin-top:117px;
	}
</style>