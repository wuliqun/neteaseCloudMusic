<template>
	<div id="player" :class="{'locked':locked,'mouse-active':mouseActive,'list-active':listAct}" @mouseenter="mouseOn" @mouseleave="mouseOff">
		<div class="lock-wrap player-icon">
			<a class="lock player-icon" @click="toggleLock"></a>
		</div>
		<div class="player-wrapper clearfix">
			<div class="control">
				<a class="prev player-icon" @click="prev"></a>
				<a class="play player-icon" :class="{'playing':playing}" @click="togglePlay"></a>
				<a class="next player-icon" @click="next"></a>
			</div>
			<div class="process">
				<div class="left-img">
					<a :href="currentSong.url">
						<img :src="currentSong.al.picUrl" alt="">
					</a>
				</div>
				<div class="right-dp">
					<div class="desc">
						<a :href="currentSong.url" class="name">{{currentSong.name}}</a>
						<a class="player-icon icon-mv" v-show="currentSong.hasMv"></a>
						<a href="" class="artist">{{currentSong.artist}}</a>
						<a href="" class="player-icon from" :title="'来自'+currentSong.from" v-show="currentSong.from"></a>
					</div>
					<div class="process-wrap clearfix">
						<div class="process-bar">
							<div class="loaded" :style="{'width':loaded + '%'}"></div>
							<div class="played" :style="{'width':playedPercent + '%'}">
								<a class="end-point"></a>
							</div>
							<input type="range" min="0" max="100" v-model="played" />
						</div>
						<div class="time">
							<span>{{currentSong.dt*played/100 | duration2str}}</span>/
							<span>{{currentSong.dt | duration2str}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="operate">
				<a class="player-icon add"></a>
				<a class="player-icon share"></a>
			</div>
			<div class="setting">
				<div class="volumn" :class="{act:volumnAct}">
					<a class="player-icon voice" :class="{muted:volumn == 0}" @click="toggleVolumnAct"></a>
					<div class="volumn-bar">
						<div class="volumn-tube">
							<div class="volumn-setted" :style="{height:volumn+'%'}">
								<i class="top-point"></i>
							</div>
						</div>						
						<input type="range" min="0" max="100" v-model="volumn">
					</div>
				</div>
				<a class="player-icon loop"></a>
				<div class="play-list">
					<a class="player-icon list-icon" @click="toggleListAct">
						<span class="count">{{playlist.length}}</span>
					</a>
					<div class="list-detail">					
						<div class="head clearfix">
							<h4 class="title">播放列表({{playlist.length}})</h4>
							<div class="operate">
								<a class="add-all"  @click="collectList">
									<i class="playlist-icon list-add"></i>
								收藏全部</a>
								<a class="clear"  @click="clear">
									<i class="playlist-icon list-clear"></i>
								清除</a>
								<a class="playlist-icon close" @click="toggleListAct"></a>
							</div>				
						</div>
						<div class="list-wrap">
							<ul class="list">
								<li 
									v-for="(item,index) in playlist" 
									class="clearfix" 
									:class="{current:index == currentIndex}" 
									@click="playIndex(index)" 
									:key="item.id">
									<div class="col col-1">
										<i class="playlist-icon delta"></i>
									</div>
									<div class="col col-2">
										<span>{{item.name}}</span>
									</div>
									<div class="col col-3">
										<a class="playlist-icon list-add" title="收藏" @click.stop="collectSong(index)"></a>
										<a class="playlist-icon list-share" title="分享"></a>
										<a class="playlist-icon download" title="下载"></a>
										<a class="playlist-icon list-del" @click.stop ="del(index)" title="从列表中删除"></a>
									</div>
									<div class="col col-4">
										<a class="artist">{{item.artist}}</a>
									</div>
									<div class="col col-5">
										<span>{{item.dt | duration2str}}</span>
									</div>
									<div class="col col-6">
										<a class="playlist-icon from"></a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div id="info">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapActions} from 'vuex'
	import {getAudioUrl} from 'API/getData'
	export default{
		data(){
			return {
				locked:false,
				mouseActive:false,
				playing:false,
				//鼠标移出时，隔1秒再隐藏播放器，用leaveTimer计时，如果再次鼠标进入，清除计时器
				leaveTimer:undefined,
				currentIndex:0, //当前播放的第几首,默认没有当前
				played:0,//已播放百分比
				volumn:50, //默认音量50
				volumnAct:false,
				listAct:false, //是否显示播放列表	
				audio:new Audio(),
				audioUrls:new Map(),
				playTimer:null, //刷新播放进度计时器
				//播放模式  loop循环 single-loop单曲循环 random随机
				playType:'',
				loaded:0 //已加载部分，percentage
			}
		},
		watch:{
			restartPlayer(value){
				if(value){
					this.toggleRestartPlayer();
					this.currentIndex = 0;
					this.pause();
					this.play();
				}
			},
			volumn(value){
				this.audio.volume = value/100;
			},
			played(newVal,oldVal){//监测手动更改播放进度
				let difference = (newVal-oldVal)/100*this.audio.duration;
				if(Math.abs(difference) > 0.5){ //超过0.5s,判定为手动更改
					this.audio.currentTime = this.audio.duration*newVal/100;
				}
			}
		},
		methods:{
			...mapMutations('playlist',['toggleRestartPlayer','clearPlaylist',
				'removeItemOfPlaylist','setPlayingId','removePlayingId']),
			...mapMutations('userDiyPlaylist',['showAddDiyListPanel','setSongWaitToAdd','setSongListWaitToAdd']),
			toggleLock(){
				this.locked = !this.locked;
			},
			mouseOn(){
				clearTimeout(this.leaveTimer);
				this.mouseActive = true;
			},
			mouseOff(){
				this.leaveTimer = setTimeout(()=>{
					this.mouseActive = false;
				},1000)
			},
			toggleVolumnAct(){
				this.volumnAct = !this.volumnAct;
			},
			toggleListAct(){
				this.listAct = !this.listAct;
			},
			clear(){
				this.pause();
				this.clearPlaylist();
				this.played = 0;
				this.loaded = 0;
			},
			async play(){
				this.playing = true;
				let id = this.playlist[this.currentIndex].id;
				if(!this.audioUrls.has(id)){
					await getAudioUrl(id).then(response=>{
						this.audioUrls.set(id,response.data.data[0].url);
					});
				}
				this.audio.src = this.audioUrls.get(id);
				this.audio.play();
				this.autoRefresh();
				this.setPlayingId(id);
			},
			playIndex(index){
				if(index == this.currentIndex && this.playing){//若是当前歌曲，不重新播放
					return;
				}
				this.pause();
				this.currentIndex = index;
				this.play();
			},
			pause(){
				this.playing = false;
				this.audio.pause();
				this.removePlayingId();
				clearInterval(this.playTimer);
			},
			togglePlay(){
				if(this.playing){
					this.pause();
				}else{
					this.play();
				}
			},
			del(index){
				if(index == this.currentIndex){
					this.currentIndex = 0;
					this.pause();
				}else if(index < this.currentIndex){
					this.currentIndex --;
				}
				this.removeItemOfPlaylist(index);
			},
			autoRefresh(){
				clearInterval(this.playTimer);
				this.playTimer = setInterval(()=>{
					this.played = (this.audio.currentTime/this.audio.duration)*100 || 0;
					let tr = this.audio.buffered;
					if(tr.length > 0){
						let end = tr.end(tr.length - 1);
						this.loaded = end/this.audio.duration*100 || 0;
					}
					if(this.audio.ended){
						this.currentIndex ++;
						if(this.currentIndex == this.playlist.length){
							this.currentIndex = 0;
						}
						this.play();
					}
				},500);  //500ms刷新一次
			},
			prev(){
				this.pause();
				this.currentIndex --;
				if(this.currentIndex < 0){
					this.currentIndex = this.playlist.length - 1;
				}
				this.play();
			},
			next(){
				this.pause();
				this.currentIndex ++;
				if(this.currentIndex == this.playlist.length){
					this.currentIndex = 0;
				}
				this.play();
			},
			collectSong(index){
				var song = this.playlist[index];
				this.setSongWaitToAdd(song);
				this.showAddDiyListPanel();
			},
			collectList(){
				if(!this.playlist.length){
					this.$message.warning('播放列表为空，快去添加歌曲吧~~');
				}else{
					this.setSongListWaitToAdd(this.playlist);
					this.showAddDiyListPanel();
				}				
			}
		},
		filters:{
			duration2str(duration){
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
			}
		},
		computed:{
			...mapState('playlist',['playlist','restartPlayer']),
			currentSong(){
				// name artist from hasMv picUrl dt(string) url
				if(!this.playlist || !this.playlist.length || this.currentIndex === undefined){
					return {
						name:'',
						artist:'',
						from:'',
						hasMv:false,
						al:{picUrl:'http://s4.music.126.net/style/web2/img/default/default_album.jpg'},
						dt:0,
						url:'javascript:;'
					}
				}
				return this.playlist[this.currentIndex];
			},
			playedPercent(){
				return this.played;
			}
		},
		created(){
			this.audio.volume = 0.5;
			this.audio.loop = false;
		}
	}
</script>

<style scoped>
	#player{
		position:fixed;
		bottom:-46px;
		left:0;
		width:100%;
		height:53px;
		background:url(../../img/playbar.png) repeat-x 0 0;
		transition:all .5s;
	}
	#player .player-icon{
		background:url(../../img/playbar.png) no-repeat 0 0;
	}
	#player .playlist-icon{
		background:url(../../img/playlist.png) no-repeat 0 0;
	}
	#player.locked,#player.mouse-active,#player.list-active{
		bottom:0;
	}
	#player .lock-wrap{
		position:absolute;
		width:67px;
		height:61px;
		bottom:0;
		right:0;
		background-position:0 -386px;
	}
	#player .lock-wrap .lock{
		display:block;
		width:14px;
		height:14px;
		margin:2px 0 0 18px;
		background-position:-82px -382px;
	}
	#player .lock-wrap .lock:hover{
		background-position:-82px -402px;
	}
	#player.locked .lock-wrap .lock{
		background-position:-101px -382px;
	}
	#player.locked .lock-wrap .lock:hover{
		background-position:-101px -402px;
	}
	#player .player-wrapper{
		width:982px;
		margin:0 auto;
		padding:12px 0 6px;
	}
	#player .control{
		float:left;
		margin-right:10px;
	}
	#player .control a{
		float:left;
		margin-right:12px;
	}
	#player .control .prev,#player .control .next{
		width:25px;
		height:25px;
		margin-top:6px;
	}
	#player .control .prev{
		background-position:-1px -131px;
	}
	#player .control .prev:hover{
		background-position:-31px -131px;
	}
	#player .control .next{
		background-position:-82px -131px;
	}
	#player .control .next:hover{
		background-position:-112px -131px;
	}
	#player .control .play{
		width:33px;
		height:33px;
		margin-top:1px;
		background-position:-1px -205px;
	}
	#player .control .play:hover{
		background-position:-41px -205px;
	}
	#player .control .play.playing{
		background-position:-1px -166px;
	}
	#player .control .play.playing:hover{
		background-position:-41px -166px;
	}
	#player .process{
		float:left;		
	}
	#player .process .left-img{
		float:left;
		margin-right:15px;
	}
	#player .process .left-img a{
		display:block;
		width:32px;
		height:32px;
		border:1px solid #000;
		border-radius:3px;
	}
	#player .process .left-img img{
		width:100%;
		height:100%;
	}
	#player .process .right-dp{
		float:left;
	}
	#player .process .right-dp .desc .name{
		color:#e8e8e8;
	}
	#player .process .right-dp .desc .artist{
		margin-left:15px;
		color:#9b9b9b;
	}
	#player .process .right-dp .desc .name:hover,
	#player .process .right-dp .desc .artist:hover{
		text-decoration:underline;
	}
	#player .process .right-dp .icon-mv{
		position:relative;
		top:3px;
		display:inline-block;
		width:18px;
		height:15px;
		margin-left:3px;
		background-position:0 -58px;
	}
	#player .process .right-dp .icon-mv:hover{
		background-position:-20px -58px;
	}
	#player .process .right-dp .from{
		position:relative;
		top:2px;
		display:inline-block;
		width:14px;
		height:14px;
		margin-left:14px;
		background-position:-110px -103px;
	}
	#player .process .right-dp .from:hover{
		background-position:-130px -103px;
	}
	#player .process-bar{
		position:relative;
		float:left;
		width:493px;
		height:10px;
		margin-top:4px;
		background-color:#191919;
		border-radius:5px;
	}
	#player .process-bar:hover .end-point{
		box-shadow:0 0 8px #fff;
	}
	#player .process-bar input{
		position:absolute;
		top:0;
		left:-3px;
		width:500px;
		height:10px;
		border-radius:5px;
		opacity:0;
	}
	#player .process-bar .loaded,#player .process-bar .played{
		position:absolute;
		left:0;
		top:0;
		height:10px;		
		border-radius:5px;
	}
	#player .process-bar .loaded{
		background-color:#535353;
	}
	#player .process-bar .played{
		background-color:#c70c0c;
	}
	#player .process-bar .played .end-point{
		position:absolute;
		top:-4px;
		right:-8px;
		width:6px;
		height:6px;
		border:5px solid #f3f3f3;
		border-radius:50%;
		background-color:#c70c0c;
	}
	#player .process .time{
		float:left;
		margin-left:14px;
		color:#797979;
	}
	#player .process .time span:first-child{
		color:#a1a1a1;
	}
	#player .operate{
		float:left;
		margin:8px 10px 0 30px;
	}
	#player .operate .add,#player .operate .share{
		display:inline-block;
		width:19px;
		height:18px;
	}
	#player .operate .add{
		margin-right:5px;
		background-position:-92px -166px;
	}
	#player .operate .add:hover{
		background-position:-92px -192px;
	}
	#player .operate .share{
		background-position:-118px -166px;
	}
	#player .operate .share:hover{
		background-position:-118px -192px;
	}
	#player .setting{
		float:left;
		height:21px;
		margin:7px 0;
		padding-left:13px;
		border-left:1px solid #000;
	}
	#player .setting .volumn{
		position:relative;
		float:left;
	}
	#player .setting .volumn .voice{
		display:block;
		width:20px;
		height:20px;
		background-position:-5px -250px;
	}
	#player .setting .volumn .voice:hover{
		background-position:-34px -250px;
	}
	#player .setting .volumn .voice.muted{
		background-position:-111px -71px;
	}
	#player .setting .volumn .voice.muted:hover{
		background-position:-133px -71px;
	}
	#player .setting .volumn.act .volumn-bar{
		display:block;
	}
	#player .setting .volumn-bar{
		display:none;
		position:absolute;
		z-index:2;
		top:-126px;
		left:-7px;
		height:112px;
		width:30px;
		border:1px solid #000;
		background-color:#292929;
	}
	#player .setting .volumn-bar .volumn-tube{
		position:relative;
		height:94px;
		width:4px;
		margin:10px 13px;
		border-radius:4px;
		background-color:#000;
	}
	#player .setting .volumn-bar .volumn-setted{
		position:absolute;
		bottom:0;
		left:0;
		width:4px;
		border-radius:4px;
		background-color:#c70c0c;
	}
	#player .setting .volumn-bar .top-point{
		position:absolute;
		top:-6px;
		left:-4px;
		width:4px;
		height:4px;
		border:4px solid #fff;
		border-radius:50%;
		background-color:#c70c0c;
	}
	#player .setting .volumn-bar input{
		position:absolute;
		width:100px;
		height:4px;		
		left:-35px;
		top:55px;
		transform:rotate(-90deg);
		opacity:0;
	}
	#player .setting .loop{
		float:left;
		width:20px;
		height:20px;
		margin-left:8px;
		background-position:-5px -346px;
	}
	#player .setting .loop:hover{
		background-position:-35px -346px;
	}
	#player .play-list{
		position:relative;
		float:left;
		margin-left:10px;
	}
	#player .play-list .list-icon{
		display:block;
		width:56px;
		height:24px;
		line-height:21px;
		background-position:-45px -71px;
	}	
	#player .play-list .list-icon:hover{
		background-position:-45px -101px;
	}
	#player .play-list .count{
		display:inline-block;
		width:22px;
		margin-left:25px;
		text-align:center;
		color:#666;
	}
	#player.list-active .list-detail{
		display:block;
	}
	#player .list-detail{
		display:none;
		position:absolute;
		width:560px;
		height:300px;
		top:-314px;
		left:-460px;
		border:1px solid #000;
		border-top-left-radius:6px;
		border-top-right-radius:6px;
	}
	#player .list-detail .head{
		border-bottom:1px solid #000;
		background-color:#181818;
	}
	#player .list-detail .head .title{
		float:left;
		margin-left:26px;
		color:#e2e2e2;
		font-size:14px;
		font-weight:700;
		line-height:38px;
	}
	#player .list-detail .head .operate{
		float:right;
	}
	#player .list-detail .head .add-all,#player .list-detail .head .clear{
		float:left;
		margin-right:20px;
		color:#ccc;
	}
	#player .list-detail .head .add-all:hover,
	#player .list-detail .head .clear:hover{
		color:#e2e2e2;
		text-decoration:underline;
	}
	#player .list-detail .head .list-add,
	#player .list-detail .head .list-clear{
		float:left;
		width:16px;
		height:16px;
		margin:2px 3px 0 0;
	}
	#player .list-detail .head .list-add{
		background-position:-24px 0;
	}
	#player .list-detail .head .add-all:hover .list-add{
		background-position:-24px -20px;
	}
	#player .list-detail .head .list-clear{
		background-position:-48px 0;
	}
	#player .list-detail .head .clear:hover .list-clear{
		background-position:-48px -20px;
	}
	#player .list-detail .head .close{
		float:left;
		width:12px;
		height:12px;
		margin-top:5px;
		background-position:-204px 0;
	}
	#player .list-detail .head .close:hover{
		background-position:-204px -30px;
	}
	#player .list-wrap{
		height:261px;
		overflow-y:scroll;
		background-color:#292929;
	}
	/* 自定义滚动条样式 */
	#player .list-wrap::-webkit-scrollbar{
		width:6px;
		background-color:#121212;
	}
	#player .list-wrap::-webkit-scrollbar-thumb{
		border-radius:6px;
		background-color:#474747;
	}
	#player .list-wrap .list li{
		line-height:29px;
		color:#ccc;
	}
	#player .list-wrap .list li.current,
	#player .list-wrap .list li:hover{
		cursor:pointer;
		color:#fff;
		background-color:#1b1b1b;
	}
	#player .list-wrap .list li.current a,
	#player .list-wrap .list li:hover a{
		color:#fff;
	}
	#player .list-wrap .col{
		float:left;
	}
	#player .list-wrap .col-1{
		width:29px;
		height:29px;
	}
	#player .list-wrap .delta{
		display:none;
		width:12px;
		height:12px;
		margin:8px;
		background-position:-182px 0;
	}
	#player .list-wrap li.current .delta{
		display:block;
	}
	#player .list-wrap .col-2{
		width:354px;
	}
	#player .list-wrap .col-3{
		display:none;
	}
	#player .list-wrap .list li:hover .col-3{
		display:block;
	}
	#player .list-wrap .list li:hover .col-2{
		width:256px;
	}
	#player .list-wrap .col-3 a{
		float:left;
		width:14px;
		height:14px;
		margin:8px 10px 0 0;
	}
	#player .list-wrap .col-3 .list-add{
		width:16px;
		background-position:-24px 0;
	}
	#player .list-wrap .col-3 .list-add:hover{
		background-position:-24px -20px;
	}
	#player .list-wrap .col-3 .list-share{
		background-position:0 0;
	}
	#player .list-wrap .col-3 .list-share:hover{
		background-position:0 -20px;
	}
	#player .list-wrap .col-3 .download{
		background-position:-57px -50px;
	}
	#player .list-wrap .col-3 .download:hover{
		background-position:-80px -50px;
	}
	#player .list-wrap .col-3 .list-del{
		background-position:-51px -0;
	}
	#player .list-wrap .col-3 .list-del:hover{
		background-position:-51px -20px;
	}
	#player .list-wrap .col-4{
		width:80px;
	}
	#player .list-wrap .col-4 a{
		color:#9b9b9b;
	}
	#player .list-wrap .col-4 a:hover{
		text-decoration:underline;
	}
	#player .list-wrap .col-5{
		width:65px;
	}
	#player .list-wrap .from{
		display:block;
		width:15px;
		height:15px;
		margin-top:7px;
		background-position:-80px 0;
	}
	#player .list-wrap .from:hover{
		background-position:-80px -20px;
	}
</style>