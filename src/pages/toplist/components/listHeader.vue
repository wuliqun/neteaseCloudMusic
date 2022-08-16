<template>
	<div id="list-header" v-if="playlist">
		<div class="img">
			<img :src="playlist.coverImgUrl" alt="">
		</div>
		<div class="info">
			<div class="name">
				<h3>{{playlist.name}}</h3>
			</div>
			<div class="update-info">
				<i class="icon time"></i>
				<span class="ut">最近更新: {{playlist.updateTime | time2str}}</span>
				<span class="uf">({{playlist.updateFrequency}})</span>
			</div>
			<div class="operate clearfix">
				<a class="play" @click="playAll">播放</a>
				<a class="add" @click="addToList"></a>
				<a class="collect icon-1" @click="collect">({{playlist.subscribedCount || 0}})</a>
				<a class="share icon-1">({{playlist.shareCount || 0}})</a>
				<a class="download icon-1">下载</a>
				<a class="comment icon-1">({{playlist.commentCount || 0}})</a>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapGetters('collectionList',['isPlaylistCollected'])
		},
		methods:{
			...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
			...mapMutations('collectionList',['addCollect']),
			playAll(){
				this.insertIntoPlaylist(this.playlist.tracks);
				this.$message.playerMessage('已开始播放');
			},
			addToList(){
				this.pushIntoPlaylist(this.playlist.tracks);
				this.$message.playerMessage('已添加至播放列表');
			},
			collect(){
				if(this.isPlaylistCollected(this.playlist.id)){
					this.$message.warning('您已收藏过该歌单');
				}else{
					this.addCollect(this.playlist);
					this.$message.success('收藏成功');
				}
				
			}
		},
		filters:{
			time2str(time){
				let d = new Date(time);
				let year = d.getFullYear();
				let mon = d.getMonth() + 1;
				let day = d.getDate();
				let result = year + '-';
				result += mon>9?mon:'0' + mon;
				result += '-'
				result += day>9?day:'0' + day;
				return result;
			}
		},
		props:['playlist']
	}
</script>

<style lang="scss" scoped>
	#list-header{
		margin-bottom:36px;
		.img{
			float:left;
			width:150px;
			height:150px;
			padding:3px;
			border:1px solid #ccc;
			img{
				width:100%;
				height:100%;
			}
		}
		.info{
			min-height:158px;
			margin:10px 0 0 187px;			
		}
		.name{
			line-height:38px;
			font-size:20px;
			color:#333;
		}
		.update-info{
			margin-top:15px;
		}
		.time{
			float:left;
			width:13px;
			height:13px;
			margin-top:3px;
			background:url(../../../img/icon.png) no-repeat -70px -140px;
		}
		.ut{
			margin-left:4px;
			color:#666;
		}
		.uf{
			margin-left:10px;
			color:#999;
		}
		.operate{
			height:31px;
			margin-top:36px;
			&>a{
				float:left;
				height:31px;
				margin-right:5px;
				line-height:31px;
				text-align:center;
				background:url(../../../img/button2.png) no-repeat 0 0;
			}
			.icon-1{
				position:relative;
				color:#333;
				padding:0 7px 0 28px;
			}
			.icon-1:after{
				content:'';
				position:absolute;
				width:5px;
				height:100%;
				right:0;
				top:0;
				background:url(../../../img/button2.png) no-repeat -245px -1020px;
			}
			.icon-1:hover:after{
				background:url(../../../img/button2.png) no-repeat -245px -1106px;
			}
			.play{
				width:62px;
				margin-right:0;
				text-indent:25px;
				color:#fff;
				background-position:0 -633px;
				&:hover{
					background-position:0 -719px;
				}
			}
			.add{
				width:31px;
				background-position:0 -1588px;
				&:hover{
					background-position:-40px -1588px;
				}
			}
			.collect{
				background-position:0 -977px;
				&:hover{
					background-position:0 -1063px;
				}
			}
			.share{
				background-position:0 -1225px;
				&:hover{

				
				}
			}
			.download{
				background-position:0 -2761px;
				&:hover{
					background-position:0 -2805px;
				}
			}
			.comment{
				background-position:0 -1465px;
				&:hover{
					background-position:0 -1508px;
				}
			}
		}
	}
</style>