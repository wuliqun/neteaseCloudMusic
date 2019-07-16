<template>
	<div id="top-list" v-if="toplist.length >= 3">
		<section-title
            name="榜单"
            router-name="discoverToplist">
        </section-title>
		<div class="top-list clearfix">
			<dl class="top-list-column" v-for="item in toplist" :key="item.id">
				<dt class="title clearfix">
					<div class="left">
						<router-link :to="{name:'discoverToplist',query:{id:item.id}}" :title="item.name" class="title-img-wrapper">
							<img :src="item.coverImgUrl" alt="">
						</router-link>
					</div>
					<div class="right">
						<h3 class="title-txt" :title="item.name">
							<router-link :to="{name:'discoverToplist',query:{id:item.id}}">{{item.name}}</router-link>
						</h3>
						<div class="operate">
							<a class="play" title="播放" @click="playItem(item.tracks)"></a>
							<a class="subscribe" title="收藏" @click="collectTheList(item)"></a>
						</div>
					</div>
				</dt>
				<dd>
					<ol class="cate-list">
						<li v-for="n in 10" class="list-item" :key="n">				
							<div class="song" :title="item.tracks[n-1].name">
								<span :class="{'top3':n < 4}" class="index">{{n}}</span>
								<router-link :to="{name:'song',query:{id:item.tracks[n-1].id}}" class="name">{{item.tracks[n-1].name}}</router-link>
								<div class="operate">
									<a class="play" title="播放" @click="playItem(item.tracks[n-1])"></a>
									<a class="add-play-list" title="添加到播放列表" @click="appendSong(item.tracks[n-1])"></a>
									<a class="subscribe" title="收藏" @click="collectSong(item.tracks[n-1])"></a>
								</div>
							</div>
						</li>
						<li class="see-all clearfix">
							<router-link :to="{name:'discoverToplist',query:{id:item.id}}">查看全部&gt;</router-link>
						</li>
					</ol>
				</dd>
			</dl>
		</div>
	</div>		
</template>

<script>
    import { getToplistDetail } from '@service/getData'
	import SectionTitle from '@components/sectionTitle'
	import {mapMutations,mapState} from 'vuex'
	export default{
		data(){
			return {
                toplist:[],
                topListId:[0,2,3]
			}
		},
		methods:{
			...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
			...mapMutations('userDiyPlaylist',['showAddDiyListPanel','setSongWaitToAdd']),
			...mapMutations('collectionList',['addCollect']),		
			async initData(){
				for(let id of this.topListId){
                    var res = await getToplistDetail(id);
                    this.toplist.push(res.data.playlist);
                }
			},
			playItem(payload){
				this.insertIntoPlaylist(payload);
				this.$message.playerMessage('已开始播放');
			},
			appendSong(song){
				this.pushIntoPlaylist(song);
				this.$message.playerMessage('已添加至播放列表');
			},
			collectTheList(item){
				if(this.collectionListIdArr.indexOf(item.id) !== -1){
					this.$message.success('您已收藏过该歌单');
				}else{
					this.addCollect({						
						id:item.id,
						name:item.name,
						coverImgUrl:item.coverImgUrl,
						counts:item.tracks.length			
					});
					this.$message.success('已添加至收藏夹');
				}				
			},
			collectSong(song){
				this.setSongWaitToAdd(song);
				this.showAddDiyListPanel();
			}
		},
		created(){
			this.initData();			
		},
		computed:{
			...mapState('collectionList',['collectionListIdArr'])
		},
        components:{
            SectionTitle
        }
	}
</script>

<style scoped>
	#top-list .top-list{
		margin-top:20px;
		border:1px solid #d3d3d3;
	}
	#top-list .top-list-column{
		float:left;
		width:226px;
		padding:1px;
		border-right:1px solid #c3c3c3;
	}
	#top-list .top-list-column:last-child{
		border-right:none;
	}
	#top-list .title-img-wrapper{
		display:block;
		width:80px;
		height:80px;
	}
	#top-list .title{
		padding:18px;
		background-color:#f4f4f4;
	}
	#top-list .left{
		float:left;
	}
	#top-list .title-img-wrapper img{
		width:100%;
		height:100%;
	}
	#top-list .right{
		float:right;
		width:100px;
		margin:8px 0 0 10px;
	}
	#top-list .title-txt a{
		font-weight:bold;
		color:#333;
	}
	#top-list .right .operate{
		margin-top:10px;
	}
	#top-list .right .play,#top-list .right .subscribe{
		float:left;
		width:22px;
		height:22px;
		margin-right:10px;
		background:url(../../../assets/index.png) no-repeat 0 0;
	}	
	#top-list .right .play{
		background-position:-267px -205px;
	}
	#top-list .right .play:hover{
		background-position:-267px -235px;
	}
	#top-list .right .subscribe{
		background-position:-300px -205px;
	}
	#top-list .right .subscribe:hover{
		background-position:-300px -235px;
	}
	#top-list li:nth-child(2n+1){
		background-color:#e8e8e8;
	}
	#top-list li:nth-child(2n){
		background-color:#f4f4f4;
	}
	#top-list .see-all a{
		float:right;
		height:30px;
		margin-right:30px;;
		color:#000;
		line-height:30px;
	}
	#top-list .song{
		position:relative;
		margin-left:49px;
		height:30px;
		line-height:30px;
		color:#000; 
	}
	#top-list .song .name{
		display:block;
		overflow:hidden;
		white-space:nowrap;
		color:#000;
		text-overflow:ellipsis;
	}
	#top-list .song:hover{
		text-decoration:none;
	}
	#top-list .song:hover .name{
		width:95px;
	}
	#top-list .song .name:hover{
		text-decoration:underline;
	}
	#top-list .song .index{
		position:absolute;
		font-size:14px;
		left:-22px;
		cursor:text;
	}
	#top-list .song .index.top3{
		color:#c10d0c;
	}
	#top-list .song .operate{
		position:absolute;	
		display:none;	
		right:4px;
		top:0;
		width:76px;
		height:100%;
	}
	#top-list .song:hover .operate{
		display:block;
	}
	#top-list .song .operate .play,#top-list .song .operate .add-play-list,
	#top-list .song .operate .subscribe{
		float:left;
		height:17px;
		margin:7px 10px 0 0;
		background:url(../../../assets/index.png) no-repeat 0 0;
	}
	#top-list .song .operate .play{
		width:17px;
		background-position:-267px -268px;
	}
	#top-list .song .operate .play:hover{
		background-position:-267px -288px;
	}
	#top-list .song .operate .add-play-list{
		width:13px;
		background-position:-267px -174px;
	}
	#top-list .song .operate .add-play-list:hover{
		background-position:-289px -174px;
	}
	#top-list .song .operate .subscribe{
		width:16px;
		background-position:-297px -268px;
	}
	#top-list .song .operate .subscribe:hover{
		background-position:-297px -288px;
	}
</style>