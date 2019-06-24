<template>
	<div id="bottom">
		<div class="wrapper clearfix">
			<div class="left">
				<p class="link">
					<a target="_blank">关于网易</a>|
					<a target="_blank">客户服务</a>|
					<a target="_blank">服务条款</a>|
					<a target="_blank">网站导航</a>|
					<a target="_blank">意见反馈</a>
				</p>
				<p class="copyright">
					<span>网易公司版权所有&copy;1997-2019</span>
					<span>杭州乐读科技有限公司运营：<a>浙网文[2018]3506-263号</a></span>
				</p>
				<p class="contact">
					<span>违法和不良信息举报电话：0571-89853516</span>
					<span>举报邮箱：<a href="mailto:ncm5990@163.com">ncm5990@163.com</a></span>
				</p>
			</div>
			<div class="right">
				<ul class="user-links clearfix">
					<li class="unit">
						<a class="logo logo-user"></a>
						<span class="txt txt-user"></span>
					</li>
					<li class="unit">
						<a class="logo logo-musician"></a>
						<span class="txt txt-musician"></span>
					</li>
					<li class="unit">
						<a class="logo logo-reward"></a>
						<span class="txt txt-reward"></span>
					</li>
					<li class="unit">
						<a class="logo logo-cash"></a>
						<span class="txt txt-cash"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	#bottom{
		height:146px;
		border-top:1px solid #d3d3d3;
		background-color:#f2f2f2;	
		.wrapper{
			width:980px;
			margin:0 auto;
		}
		.left{
			float:left;
			margin-top:21px;
		}
		.left a{
			color:#666;
		}
		.left a:hover{
			text-decoration:underline;
		}
		.left p{
			margin-top:8px;
			line-height:16px;
			color:#666;
		}
		.left span{
			margin-right:14px;
		}
		.left .link{
			margin-left:-10px;
			color:#999;
		}
		.left .link a{
			margin:0 10px;
			color:#999;
		}
		.right{
			float:right;
			margin-top:21px;
		}
		.user-links{
			margin-right:-30px;
		}
		.unit{
			float:left;
			margin-right:30px;
		}
		.unit .logo{
			display:block;
			width:50px;
			height:45px;
			margin:0 5px;
			background:url(../../assets/foot_enter_new.png) no-repeat 0 0;
			background-size:110px 450px;
		}
		.unit .txt{
			display:block;
			width:52px;
			height:14px;
			margin:5px 5px 0;
			background:url(../../assets/foot_enter_tt.png) no-repeat 0 0;
			background-size:180px 100px;
		}
		.unit .logo-user{
			background-position:-62px -102px;
		}
		.unit .logo-musician{
			background-position:0 0;
		}
		.unit .logo-reward{
			background-position:-62px -50px;
		}
		.unit .logo-cash{
			background-position:0 -102px;
		}
		.unit .txt-user{
			background-position:0 -90px;
		}
		.unit .txt-musician{
			background-position:0 0;
		}
		.unit .txt-reward{
			background-position:0 -54px;
		}
		.unit .txt-cash{
			background-position:0 -72px;
		}
	}
</style>