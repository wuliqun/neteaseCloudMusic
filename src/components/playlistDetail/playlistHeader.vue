<template>
	<div id="playlist-header" class="clearfix" v-if="playlist">
		<div class="img-wrap">
			<img :src="playlist.coverImgUrl" alt="">
		</div>
		<div class="infos">
			<h2 class="name">
				<i class="list-icon"></i>
				<span>{{playlist.name}}</span>
			</h2>
			<div class="create clearfix">
				<div class="user-img">
					<router-link :to="{name:'userHome',query:{id:playlist.creator.userId}}">
						<img :src="playlist.creator.avatarUrl" alt="">
					</router-link>
				</div>
				<div class="username">
					<router-link :to="{name:'userHome',query:{id:playlist.creator.userId}}">
						{{playlist.creator.nickname}}
					</router-link>
				</div>
				<div class="time">
					{{playlist.createTime | time2str}} 创建
				</div>
			</div>
			<div class="operate clearfix">
				<div class="btn-wrapper">
					<play-add-button
						@play="playAll"
						@add="addToList">						
					</play-add-button>
				</div>
				<div class="btn-wrapper">
					<collect-button 
						:disabled="playlist.tracks.length === 0">
						({{playlist.subscribedCount}})
					</collect-button>
				</div>
				<div class="btn-wrapper">
					<share-button 
						:disabled="playlist.tracks.length === 0">
						({{playlist.shareCount}})
					</share-button>
				</div>
				<div class="btn-wrapper">
					<download-button 
						:disabled="playlist.tracks.length === 0">
						下载
					</download-button>
				</div>
				<div class="btn-wrapper">
					<comment-button
						:disabled="playlist.tracks.length === 0">
						({{ playlist.commentCount }})
					</comment-button>
				</div>
			</div>
			<div class="tags clearfix">
				<span>标签：</span>
				<span v-for="tag in playlist.tags" class="tag" :key="tag">{{tag}}</span>
			</div>
			<div class="description">
				<span class="tit">介绍：</span>
				<txt-panel :txt="playlist.description"></txt-panel>
			</div>
		</div>
	</div>
</template>
<script>
	import TxtPanel from './txtPanel'
	import {
			CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
			ShareButton
		}from '@components/buttons'
	import {mapMutations,mapActions} from 'vuex'
	export default{
		data(){
			return {
			}
		},
		methods:{
			...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
			playAll(){
				if(!this.playlist.tracks.length) return;
                this.insertIntoPlaylist(this.playlist.tracks);
                this.$message.playerMessage('已开始播放');
			},
			addToList(){
                this.pushIntoPlaylist(this.playlist.tracks);
                this.$message.playerMessage('已添加至播放列表');
			}
		},
		filters:{
			time2str(time){
				let d = new Date(time);
				let y = d.getFullYear();
				let m = d.getMonth() +1;
				let date = d.getDate();
				let result = y + '-';
				result += m>9?m:'0' + m;
				result += '-';
				result += date>9?date:'0'+date;
				return result; 
			}
		},
		props:['playlist'],
		components:{
			TxtPanel,
			CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
			ShareButton
		}
	}
</script>

<style scoped>
	#playlist-header{

	}
	#playlist-header .img-wrap{
		float:left;
		width:200px;
		height:200px;
		padding:3px;
		border:1px solid #d5d5d5;
	}	
	#playlist-header .img-wrap img{
		height:100%;
		width:100%;
	}
	#playlist-header .infos{
		margin:0 0 25px 234px;
		padding-top:5px;
	}
	#playlist-header .name .list-icon{
		float:left;
		width:54px;
		height:24px;
		margin-right:10px;
		background:url(../../img/icon-1.png) no-repeat 0 -243px;
	}
	#playlist-header .name{
		margin-bottom:12px;
		line-height:24px;
		font-size:20px;
		color:#333;
	}
	#playlist-header .create .user-img{
		float:left;
		width:35px;
		height:35px;
	}
	#playlist-header .create{
		height:35px;
		margin-bottom:20px;
		line-height:35px;
	}
	#playlist-header .create .user-img img{
		width:100%;
		height:100%;
	}
	#playlist-header .create .username{
		float:left;
		margin:0 10px;
	}
	#playlist-header .create .username a{
		color:#0c73c2;
	}
	#playlist-header .create .time{
		color:#999;
	}
	#playlist-header .operate{
		height:31px;
		margin-bottom:25px;
	}
	#playlist-header .operate .btn-wrapper{
		float: left;
		margin-right: 5px;
	}
	#playlist-header .tags{
		height:22px;
		margin-bottom:8px;
	}
	#playlist-header .tags span{
		float:left;
		margin-right:2px;
		line-height:20px;
	}
	#playlist-header .tags .tag{
		margin-right:10px;
		padding:0 12px;
		border:1px solid #d1d1d1;
		border-radius:10px;
		cursor:pointer;
		background-color:#f5f5f5;
	}
	#playlist-header .tags .tag:hover{
		background-color:#fdfdfd;
	}
	#playlist-header .description .tit{
		float:left;
	}
</style>