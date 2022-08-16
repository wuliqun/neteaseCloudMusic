<template>
	<div id="toplist-list" v-if="playlist">
		<div class="header clearfix">
			<h2>歌曲列表</h2>
			<p class="track-count">{{playlist.tracks.length}}首歌</p>
			<p class="play-count">
				播放：<em>{{playlist.playCount}}</em>次
			</p>
		</div>
		<ul class="list">
			<li class="list-item list-header clearfix">
				<div class="col col-1"></div>
				<div class="col col-2">
					<span>标题</span>
				</div>
				<div class="col col-3">
					<span>时长</span>
				</div>
				<div class="col col-4">
					<span>歌手</span>
				</div>
			</li>
			<li class="list-item clearfix" v-for="(item,index) in playlist.tracks" :class="{top3:index < 3}" :key="item.id">
				<div class="col col-1">
					<span class="index">{{index + 1}}</span>
					<span class="hot-description"></span>
				</div>
				<div class="col col-2">
					<div class="img" v-if="index < 3">
						<img :src="item.al.picUrl" alt="">
					</div>
					<a class="icon play" :class="{playing:item.id == playingId}" title="播放" @click="play(index)"></a>
					<router-link :to="{name:'song',query:{id:item.id}}" class="name f-thide">{{item.name}}</router-link>
					<router-link :to="{name:'mv',query:{id:item.mv}}" class="mv-icon" v-if="item.mv" title="播放MV">
					</router-link>
				</div>
				<div class="col col-3">
					<span class="duration">{{item.dt | time2str}}</span>
					<div class="operate">
						<a class="icon add" title="添加到播放列表" @click="addToList(index)"></a>
						<a class="icon collect" title="收藏" @click="addSong(item)"></a>
						<a class="icon share" title="分享"></a>
						<a class="icon download" title="下载"></a>
					</div>
				</div>
				<div class="col col-4 f-thide" :title="item.ar | joinName">
					<template v-for="artist in item.ar">
						<router-link :to="{name:'artist',query:{id:artist.id}}" :key="artist.id">{{artist.name}}
						</router-link><span class="sep" :key="'sep' + artist.id">/</span>
					</template>
				</div>
			</li>
		</ul>		
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return {
			}
		},
		methods:{
			...mapMutations('userDiyPlaylist',['setSongWaitToAdd','showAddDiyListPanel']),
			...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
			addSong(song){
				this.setSongWaitToAdd(song);
				this.showAddDiyListPanel();
			},
			play(index){
				this.insertIntoPlaylist(this.playlist.tracks[index]);
				this.$message.playerMessage('已开始播放');
			},
			addToList(index){
				this.pushIntoPlaylist(this.playlist.tracks[index]);
				this.$message.playerMessage('已添加至播放列表');
			}
		},
		computed:{
			...mapState('playlist',['playingId'])	
		},
		filters:{
			time2str(duration){
				duration = Math.round(duration/1000);
				let secs = duration % 60;
				duration = parseInt(duration/60);
				let minutes = duration % 60;
				let hours = parseInt(duration/60);
				var s = '';
				if(hours > 0){
					s += hours > 9? hours: '0' + hours;
					s += ':';
				}
				s += minutes > 9? minutes: '0' + minutes;
				s += ':';
				s += secs > 9? secs: '0' + secs;
				return s;
			},
			joinName(artists){
				return artists.map(artist=>{
					return artist.name;
				}).join('/');
			}
		},
		props:['playlist']
	}
</script>

<style lang="scss" scoped>
	#toplist-list{
		.header{
			height:38px;
			line-height:38px;
			border-bottom:2px solid #c20c0c;
			h2{
				float:left;
				font-size:18px;
				color:#333;
			}
			.track-count{
				float:left;
				margin-left:20px;
				color:#666;
			}
			.play-count{
				float:right;
				color:#666;
				em{
					color:#c60c0c;
				}
			}
		}
		.list{
			border:1px solid #e1e1e1;
		}
		.list-item{
			height:30px;
			line-height:30px;
			&:nth-child(2n){
				background-color:#f7f7f7;
			}
			&:nth-child(2n+1){
				background-color:#fff;
			}
			&.list-header{
				background-color:#f3f3f3;
				border-bottom:1px solid #e1e1e1;
				.col-2{
					border:solid #e1e1e1;
					border-width:0 1px;
				}
				.col-4{
					border-left:1px solid #e1e1e1;
				}
			}
			&.top3{
				height:72px;
				line-height:72px;
				.play{
					margin-top:27px;
				}
				.col-3 .operate{
					top:29px;
				}
				.col-2 .mv-icon{
					margin-top:27px;
				}
			}
			&:hover .col-3{
				.duration{
					display:none;
				}
				.operate{
					display:block;
				}
			}
		}
		.icon{
			float:left;
			background:url(../../../img/table.png) no-repeat 0 0;
		}
		.col{
			float:left;
			height:100%;
			padding-left:8px;
			box-sizing:border-box;
		}
		.col-1{
			width:78px;
			.index{
				float:left;
				margin-left:20px;
			}
			.hot-description{
				float:right;
				margin-right:12px;
			}
		}
		.col-2{
			width:408px;
			.img{
				float:left;
				width:50px;
				height:50px;
				margin:11px 14px 11px 9px;
				img{
					width:100%;
					height:100%;
				}
			}
			.play{
				width:17px;
				height:17px;
				margin-top:6px;
				margin-right:8px;
				background-position:0 -103px;
				&:hover{
					background-position:0 -128px;
				}
				&.playing{
					background-position:-20px -128px;
				}
			}
			.name{
				float:left;
				max-width:340px;
				color:#333;
				&:hover{
					text-decoration:underline;
				}
			}
			.mv-icon{
				float:left;
				width:23px;
				height:17px;
				margin:6px 0 0 3px;
				background:url(../../../img/table.png) no-repeat 0 -151px;
				&:hover{
					background-position:-30px -151px;
				}
			}
		}
		.col-3{
			position:relative;
			width:90px;
			.duration{
				color:#666;
			}
			.operate{
				display:none;
				position:absolute;
				top:8px;
				left:8px;
				height:100%;
			}
			.icon{
				height:14px;
			}
			.add{
				width:13px;
				margin-right:5px;
				background:url(../../../img/icon.png) no-repeat 0 -700px;
				&:hover{
					background-position:-22px -700px;
				}
			}
			.collect{
				width:16px;
				margin-right:7px;
				background-position:-1px -174px;
				&:hover{
					background-position:-21px -174px;
				}
			}
			.share{
				width:14px;
				margin-right:8px;
				background-position:-2px -195px;
				&:hover{
					background-position:-22px -195px;
				}
			}
			.download{
				width:14px;
				background-position:-83px -174px;
				&:hover{
					background-position:-106px -174px;
				}
			}
		}
		.col-4{
			width:92px;
			a{
				float:left;
				color:#333;
				&:hover{
					text-decoration:underline;
				}
			}
			.sep{
				float:left;
				color:#333;
				&:last-child{
					display:none;
				}
			}
		}
	}
</style>