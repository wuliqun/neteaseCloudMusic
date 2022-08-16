<template>
	<div id="dj-list-wrapper" v-if="list">
		<div class="title clearfix">
			<h4 class="txt">付费精选</h4>
		</div>
		<ul class="dj-list">
			<li v-for="item in list" class="dj-list-item clearfix" :key="item.id">
				<a class="avatar">
					<img :src="item.picUrl" alt="">
				</a>
				<div class="info">
					<h4 class="name-wrapper clearfix">
						<a href="" class="name" :title="item.name">{{item.name}}</a>
					</h4>
					<p class="desc" :title="item.rcmdText">{{item.rcmdText}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import {getPaygift} from 'API/getData'
	export default{
		data(){
			return {
				list:null
			}
		},
		methods:{
			initData(){
				getPaygift().then(response=>{
					this.list = response.data.data.list.slice(0,10);
				});
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style scoped>
	#dj-list-wrapper{
		padding:16px 20px;
	}
	#dj-list-wrapper .title{
		padding-bottom:6px;
		border-bottom:1px solid #ccc;
	}
	#dj-list-wrapper .title .txt{
		float:left;
		line-height:18px;
		font-weight:700;
		color:#333;
	}
	#dj-list-wrapper .dj-list{
		margin-top:20px;
	}
	#dj-list-wrapper .dj-list-item{
		margin-bottom:10px;
	}
	#dj-list-wrapper .dj-list-item .avatar{
		float:left;
		width:40px;
		height:40px;
	}
	#dj-list-wrapper .dj-list-item .avatar img{
		width:100%;
		height:100%;
	}
	#dj-list-wrapper .dj-list-item .info{
		width:170px;
		height:40px;
		margin-left:40px;
		padding:0 12px;
		box-sizing:border-box;
		line-height:20px;
		color:#999;
	}
	#dj-list-wrapper .dj-list-item .info .name-wrapper{
		height:20px;
	}
	#dj-list-wrapper .dj-list-item .info .name{
		float:left;
		max-width:130px;
		color:#333;
	}
	#dj-list-wrapper .dj-list-item .info .bigV{
		float:left;
		margin:4px 0 0 4px;
		width:12px;
		height:12px;
		background:url(../../../img/icon.png) no-repeat 0 0;
	}
	#dj-list-wrapper .dj-list-item .info .name,
	#dj-list-wrapper .dj-list-item .info .desc{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
</style>