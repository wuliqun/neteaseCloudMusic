<template>
	<div id="singer-list-wrapper" v-if="singerList">
		<div class="title clearfix">
			<h4 class="txt">入驻歌手</h4>
			<a href="" class="more">查看全部&gt;</a>
		</div>
		<ul class="singer-list">
			<li v-for="singer in singerList" :key="singer.id">
				<router-link :to="{name:'userHome',query:{id:singer.accountId}}" class="singer-list-item clearfix">
					<div class="avatar">
						<img :src="singer.img1v1Url" alt="">
					</div>
					<div class="info">
						<h4 class="name">{{singer.name}}</h4>
						<p class="desc">{{singer.briefDesc}}</p>
					</div>
				</router-link>
			</li>
		</ul>
		<a href="https://music.163.com/nmusician/web/recruit" class="recruit" target="_blank">申请成为网易音乐人</a>
	</div>
</template>

<script>
	import {getSingerList} from 'API/getData'
	export default{
		data(){
			return {
				singerList:null
			}
		},
		methods:{
			initData(){
				getSingerList({
					cat:'5001',
					limit:5,
					offset:0
				}).then(response=>{
					this.singerList = response.data.artists;
				});
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style scoped>
	#singer-list-wrapper{
		padding:16px 20px;
	}
	#singer-list-wrapper .title{
		padding-bottom:6px;
		border-bottom:1px solid #ccc;
	}
	#singer-list-wrapper .title .txt{
		float:left;
		line-height:18px;
		font-weight:700;
		color:#333;
	}
	#singer-list-wrapper .title .more{
		float:right;
	}
	#singer-list-wrapper .singer-list{
		margin-top:20px;
	}
	#singer-list-wrapper .singer-list>li{
		margin-bottom:16px;
	}
	#singer-list-wrapper .singer-list-item{
		display:block;
	}
	#singer-list-wrapper .singer-list-item:hover{
		text-decoration:none;
	}
	#singer-list-wrapper .singer-list-item .avatar{
		float:left;
		width:62px;
		height:62px;
	}
	#singer-list-wrapper .singer-list-item .avatar img{
		width:100%;
		height:100%;
	}
	#singer-list-wrapper .singer-list-item .info{
		width:148px;
		height:62px;
		margin-left:62px;
		padding:6px 12px;
		box-sizing:border-box;
		border:solid #e9e9e9;
		border-width:1px 1px 1px 0;
		line-height:24px;
		background-color:#fafafa;
	}
	#singer-list-wrapper .singer-list-item .info:hover{
		background-color:#f4f4f4;
	}
	#singer-list-wrapper .singer-list-item .info .name{
		font-size:14px;
		font-weight:700;
		color:#333;
	}
	#singer-list-wrapper .singer-list-item .info .name,
	#singer-list-wrapper .singer-list-item .info .desc{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	#singer-list-wrapper .recruit{
		display:block;
		line-height:28px;
		text-align:center;
		color:#333;
		border:1px solid #c8c6c6;
		border-radius:5px;
		background-color:#fafafa;
	}
	#singer-list-wrapper .recruit:hover{
		text-decoration:none;
		background-color:#fff;
	}
</style>