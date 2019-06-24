<template>
	<div id="song-list" v-if="playlist">
		<div class="header clearfix">
			<h2>歌曲列表</h2>
			<p class="track-count">{{playlist.tracks.length}}首歌</p>
			<p class="play-count">
				播放：<em>{{playlist.playCount}}</em>次
			</p>
		</div>
		<ul class="song-list">
			<li class="title">
				<div class="col col-0"></div>
				<div class="col col-1"></div>
				<div class="col col-2 f-thide">歌曲标题</div>
				<div class="col col-3">时长</div>
				<div class="col col-4 f-thide">歌手</div>
				<div class="col col-5 f-thide">专辑</div>
			</li>
			<li v-for="(track,index) in playlist.tracks" :key="track.id">
				<div class="col col-0">
					<span>{{index+1}}</span>
				</div>
				<div class="col col-1 clearfix">
					<a class="icon play" title="播放" @click="play(index)" :class="{playing:track.id == playingId}"></a>
				</div>
				<div class="col col-2 f-thide">
					<router-link :to="{name:'song',query:{id:track.id}}">
						{{track.name}}
					</router-link>
					<router-link :to="{name:'mv',query:{id:track.mv}}" class="mv-icon" v-if="track.mv" title="播放MV">
					</router-link>
				</div>
				<div class="col col-3">
					<span>{{track.dt | time2str}}</span>
					<div class="operate clearfix">
						<a class="icon add" title="添加到播放列表" @click="addToList(index)"></a>
						<a class="icon collect" title="收藏" @click="addSong(track)"></a>
						<a class="icon share" title="分享"></a>
						<a class="icon download" title="下载"></a>
						<a class="icon del" title="删除" v-if="isCreated" @click="delTrack(index)"></a>
					</div>
				</div>
				<div class="col col-4 f-thide" :title="track.ar | joinName">
					<template v-for="artist in track.ar">
						<router-link :to="{name:'artist',query:{id:artist.id}}" :key="artist.id">
							{{artist.name}}
						</router-link>
						<span class="sep" :key="artist.id +'s'">/</span>
					</template>
				</div>
				<div class="col col-5 f-thide">
					<router-link :to="{name:album,query:{id:track.al.id}}">
						{{track.al.name}}
					</router-link>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return {}
		},
		computed:{
			...mapState('playlist',['playingId'])
		},
		methods:{
            ...mapMutations('userDiyPlaylist',['setSongWaitToAdd','showAddDiyListPanel']),
            ...mapMutations('playlist',['pushIntoPlaylist','insertIntoPlaylist']),
			addSong(song){
				this.setSongWaitToAdd(song);
				this.showAddDiyListPanel();
			},
			delTrack(index){
				this.$emit('delTrack',index);
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
		props:['playlist','isCreated']
	}
</script>

<style scoped>
	#song-list{

	}
	#song-list .header{
		height:36px;
		line-height:36px;
		border-bottom:2px solid #c20c0c;
	}
	#song-list .header h2{
		float:left;
		margin-right:20px;
		color:#333;
		font-size:20px;
	}
	#song-list .header .track-count{
		float:left;
		color:#666;
	}
	#song-list .header .play-count{
		float:right;
		color:#666;
	}
	#song-list .header .play-count em{
		color:#c60c0c;
	}
	#song-list .song-list{
		border:1px solid #d9d9d9;
	}
	#song-list .song-list li{
		height:30px;
		line-height:30px;
	}
	#song-list .song-list li:nth-child(2n){
		background-color:#f7f7f7;
	}
	#song-list .song-list .col{
		float:left;
		color:#999;
	}
	#song-list .song-list .icon{
		float:left;
		background:url(../../assets/table.png) no-repeat 0 0;
	}
	#song-list .song-list .col a{
		color:#333;
	}
	#song-list .song-list .col .mv-icon{
		display:inline-block;
		width:23px;
		height:17px;
		margin-left:2px;
		vertical-align:middle;
		background:url(../../assets/table.png) no-repeat 0 -151px;
	}
	#song-list .song-list .col .mv-icon:hover{
		background:url(../../assets/table.png) no-repeat -30px -151px;
	}
	#song-list .song-list .col a:hover{
		text-decoration:underline;
	}
	#song-list .song-list .col-0{
		width:30px;
		margin:0 2px 0 15px;
	}
	#song-list .song-list .col-1{
		width:28px;
	}
	#song-list .song-list .play{
		width:17px;
		height:17px;
		margin-top:6px;
		background-position:0 -103px;
	}
	#song-list .song-list .play:hover{
		background-position:0 -128px;
	}
	#song-list .song-list .play.playing{
		background-position:-20px -128px;
	}
	#song-list .song-list .col-2{
		width:238px;
		text-indent:9px;
	}
	#song-list .song-list .col-3{
		position:relative;
		width:109px;
		text-indent:8px;
	}
	#song-list .song-list .col-4{
		width:90px;
		text-indent:9px;
	}
	#song-list .song-list .col-4 .sep:last-child{
		display:none;
	}
	#song-list .song-list .col-5{
		width:125px;
		text-indent:8px;
	}
	#song-list .song-list .title .col{
		height:30px;
		box-sizing:border-box;
	}
	#song-list .song-list .title{
		border-bottom:1px solid #d6d6d6;
		background:url(../../assets/table.png) repeat-x 0 0;
	}
	#song-list .song-list .title .col-2,
	#song-list .song-list .title .col-4{
		border:solid #d6d6d6;
		border-width:0 1px;
	}
	#song-list .song-list .operate{
		display:none;
		width:100%;
		height:100%;
	}
	#song-list .song-list li:hover .col-3 .operate{
		display:block;
	}
	#song-list .song-list li:hover .col-3 span{
		display:none;
	}
	#song-list .song-list .operate .icon{
		height:14px;
		margin-top:8px;
	}
	#song-list .song-list .operate .add{
		width:13px;
		margin-left:8px;
		background:url(../../assets/icon.png) no-repeat 0 -700px;
	}
	#song-list .song-list .operate .add:hover{
		background-position:-22px -700px;
	}
	#song-list .song-list .operate .collect{
		width:16px;
		margin-left:5px;
		background-position:-1px -174px;
	}
	#song-list .song-list .operate .collect:hover{
		background-position:-21px -174px;
	}
	#song-list .song-list .operate .share{
		width:14px;
		margin-left:7px;
		background-position:-2px -195px;
	}
	#song-list .song-list .operate .share:hover{
		background-position:-22px -195px;
	}
	#song-list .song-list .operate .download{
		width:14px;
		margin-left:7px;
		background-position:-83px -174px;
	}
	#song-list .song-list .operate .download:hover{
		background-position:-106px -174px;
	}
	#song-list .song-list .operate .del{
		width:13px;
		margin-left:6px;
		background-position:-2px -217px;
	}
	#song-list .song-list .operate .del:hover{
		background-position:-22px -217px;
	}
</style>