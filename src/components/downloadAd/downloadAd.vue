<template>
	<div id="download">
		<router-link :to="{name:'download'}" class="download-btn"></router-link>
		<p class="desc">
			<span>PC</span>
			<span>安卓</span>
			<span>iPhone</span>
			<span>WP</span>
			<span>iPad</span>
			<span>Mac</span>
			<span>六大客户端</span>
		</p>
	</div>  
</template>
<style scoped>
	#download{
		width:252px;
		height:336px;
		padding-top:212px;
		box-sizing:border-box;
		background:url(../../img/download.png) no-repeat -1px 0;
	}
	#download .download-btn{
		display:block;
		width:215px;
		height:56px;
		margin-left:18px;
	}
	#download .download-btn:hover{
		background:url(../../img/download.png) no-repeat 0 -340px;
	}
	#download .desc{
		margin:10px 0 0 15px;
		color:#8d8d8d;
	}
</style>
