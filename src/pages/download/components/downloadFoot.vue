<template>
	<div id="download-foot">
		<div class="wrapper">
			<div class="info">
				<h3 class="title">网易云音乐</h3>
				<p class="desc">
					<span>下载网易云音乐客户端，随时随地畅享动听好音乐</span>
				</p>
			</div>
			<div class="client-list">
				<ul class="list clearfix">
					<li>
						<div class="img">
							<img src="https://music.163.com/style/web2/img/down/b8.jpg" alt="">
						</div>
						<div class="dld-btn">
							<a href="" class="win">
								<span>PC版下载</span>
							</a>
						</div>
					</li>
					<li>
						<div class="img">
							<img src="https://music.163.com/style/web2/img/down/b6.png" alt="">
						</div>
						<div class="dld-btn">
							<a href=""  class="apple">
								<span>iPhone版下载</span>
							</a>
						</div>
					</li>
					<li>
						<div class="img">
							<img src="https://music.163.com/style/web2/img/down/b9.jpg" alt="">
						</div>
						<div class="dld-btn">
							<a href="" class="apple">
								<span>iPad版下载</span>
							</a>
						</div>
					</li>
					<li>
						<div class="img">
							<img src="https://music.163.com/style/web2/img/down/b7.png" alt="">
						</div>
						<div class="dld-btn">
							<a href="" class="android">
								<span>安卓版下载</span>
							</a>
						</div>
					</li>
					<li>
						<div class="img">
							<img src="https://music.163.com/style/web2/img/down/b10.png" alt="">
						</div>
						<div class="dld-btn">
							<a href="" class="uwp">
								<span>UWP版下载</span>
							</a>
						</div>
					</li>
				</ul>
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
	#download-foot{
		background-color:#f8f8f8;
	}
	#download-foot .wrapper{
		width:1068px;
		margin:0 auto;
	}
	#download-foot .info{
		padding-top:48px;
		text-align:center;
	}
	#download-foot .info .title{
		font-size:26px;
		color:#333;
	}
	#download-foot .info .desc{
		color:#999;
		font-size:14px;
	}
	#download-foot .client-list{
		margin-top:48px;
		padding-bottom:58px;
	}
	#download-foot .list{
		margin-right:-106px;
	}
	#download-foot .list li{
		float:left;
		margin-right:106px;
	}
	#download-foot .list .img{
		width:125px;
		height:105px;
		text-align:center;
	}
	#download-foot .list .img img{
		vertical-align:middle;
	}
	#download-foot .list .dld-btn{
		width:125px;
		margin-top:20px;
	}
	#download-foot .list .dld-btn a{
		display:block;
		line-height:31px;
		color:#fff;
		text-align:center;
		text-indent:18px;
		background:url(../../../img/dld.png) no-repeat 0 0;
	}
	#download-foot .list .dld-btn .win{
		background-position:0 -62px;
	}
	#download-foot .list .dld-btn .win:hover{
		background-position:0 -93px;
	}
	#download-foot .list .dld-btn .apple{
		background-position:0 -124px;
	}
	#download-foot .list .dld-btn .apple:hover{
		background-position:0 -155px;
	}
	#download-foot .list .dld-btn .android{
		background-position:0 -186px;
	}
	#download-foot .list .dld-btn .android:hover{
		background-position:0 -217px;
	}
	#download-foot .list .dld-btn .uwp{
		background-position:0 0;
	}
	#download-foot .list .dld-btn .uwp:hover{
		background-position:0 -31px;
	}
</style>