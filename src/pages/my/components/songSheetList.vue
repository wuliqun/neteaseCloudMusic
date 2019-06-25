<template>
	<div id="song-sheet-list">
		<div class="created-list" :class="{fold:!openCreatedList}" v-if="userDiyPlaylist">
			<div class="head clearfix">
				<a class="title" @click="toggleOpenCreatedList">
					<i class="tri"></i>
					<span>创建的歌单({{userDiyPlaylist.length}})</span>
				</a>
				<a class="new" @click="showPanel">
					<span>新建</span>
				</a>
			</div>
			<div class="list-container" v-show="openCreatedList">
				<ul class="list">
					<li 
						class="list-item clearfix"
						v-for="(value,index) in userDiyPlaylist"
						:class="{active:createActive && index == activeIndex}"
						@click="active('create',index)"
						:key="value.name">
						<div class="img">
							<img :src="value.coverImgUrl">
						</div>
						<div class="info">
							<p class="name">{{value.name}}</p>
							<p class="counts">{{value.tracks.length}}首</p>
						</div>
						<div class="operate">
							<a class="edit" @click.stop="edit(index)"></a>
							<a class="del" @click.stop="del('create',index)"></a>
						</div>
					</li>
				</ul>			
			</div>
			<div v-if="userDiyPlaylist.length == 0" class="empty">
				<p>当前还没有歌单，可以点击上方新建按钮创建哦~~</p>
			</div>
		</div>
		<div class="collect-list" v-if="collectionList && collectionList.length">
			<div class="head clearfix">
				<a class="title" @click="toggleOpenCollection">
					<i class="tri"></i>
					<span>收藏的歌单({{collectionList.length}})</span>
				</a>
			</div>
			<div class="list-container" v-show="openCollection">
				<ul class="list">
					<li 
						class="list-item clearfix"
						v-for="(value,index) in collectionList"
						:class="{active:!createActive && index == activeIndex}"
						@click="active('collect',index)"
						:key="value.id">
						<div class="img">
							<img :src="value.coverImgUrl">
						</div>
						<div class="info">
							<p class="name">{{value.name}}</p>
							<p class="counts">{{value.counts}}首</p>
						</div>
						<div class="operate">
							<a class="del" @click.stop="del('collect',index)"></a>
						</div>
					</li>
				</ul>			
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return {
				songSheets:[],
				openCreatedList:true,
				openCollection:true,
				activeIndex:0, //当前显示的键名
				createActive:true //当前激活的是收藏列表，还是创建列表
			}
		},
		watch:{
			userDiyPlaylist(value){
				if(value.length > 0 && this.activeIndex === undefined){
					this.activeIndex = 0;
					this.createActive  = true;
					this.doRouter();
				}
			},
			$route(to){
				if(to.name === 'my'){
					this.doRouter();
				}
			}
		},
		methods:{
			...mapMutations('userDiyPlaylist',['showCreateDiyListPanel','removeDiyPlaylist']),
			...mapMutations('collectionList',['removeCollectByIndex']),
			toggleOpenCreatedList(){
				this.openCreatedList = !this.openCreatedList;
			},
			toggleOpenCollection(){
				this.openCollection = !this.openCollection;
			},
			showPanel(){
				this.showCreateDiyListPanel();
			},
			active(type,index){
				if(type == 'create'){
					this.createActive = true;					
				}else{
					this.createActive = false;
				}
				this.activeIndex = index;
				this.doRouter();
			},
			doRouter(){
				if(this.activeIndex == undefined){
					this.$router.push({
						name:'myMusicBlank'
					});
				}else{
					let name = 'myMusicPlaylist',query;
					if(this.createActive){
						query = {name:this.userDiyPlaylist[this.activeIndex].name};
					}else{
						if(this.activeIndex < 0 || this.collectionList.length === 0) return;
						query = {id:this.collectionList[this.activeIndex].id};
					}
					this.$router.push({name,query});
				}					
			},
			edit(index){
				this.$router.push({
					name:'myMusicEditor',
					query:{
						name:this.userDiyPlaylist[index].name
					}
				});
			},
			del(type,index){
				let isCurrent = false;
				if(type == 'create'){
					this.removeDiyPlaylist(index);
				}else{
					this.removeCollectByIndex(index);
				}
				//若改变页面结构，需要重新渲染
				if(type == 'create' && this.createActive){//当前激活为自建歌单，且删除了自建歌单
					if(index <= this.activeIndex){
						//删除序号比激活序号小时才需要触发更新
						if(index == this.activeIndex){
							if(this.userDiyPlaylist.length <= this.activeIndex){
								this.activeIndex --;	
							}
							if(this.activeIndex < 0){//已经删完了
								this.switch();
							}else{
								this.doRouter()
							}
						}else{
							//激活序号-1即可，无需刷新
							this.activeIndex --;
						}
					}
				}else if(type == 'collect' && !this.createActive){//当前激活为收藏歌单，且删除了收藏歌单
					if(index <= this.activeIndex){
						//删除序号比激活序号小时才需要触发更新
						if(index == this.activeIndex){
							if(this.collectionList.length <= this.activeIndex){
								this.activeIndex --;	
							}
							if(this.activeIndex < 0){//已经删完了
								this.switch();
							}else{
								this.doRouter()
							}
						}else{
							//激活序号-1即可，无需刷新
							this.activeIndex --;
						}
					}
				}				
			},
			switch(){
				//一个歌单已经被删完了，要切换另一个歌单
				if(!this.collectionList.length && !this.userDiyPlaylist.length){
					this.activeIndex = undefined;  //两个歌单都空了
				}else{//切换
					this.activeIndex = 0;
					this.createActive = !this.createActive;
				}
				this.doRouter();
			}
		},
		computed:{
			...mapState('userDiyPlaylist',['userDiyPlaylist','userDiyPlaylistNameArr']),
			...mapState('collectionList',['collectionList','collectionListIdArr'])
		},
		created(){
			let query = this.$route.query;
			if(!query.name && !query.id){  //进来没有带参数
				//初始化，默认显示创建的第一个，没有则显示收藏的第一个
				if(!this.userDiyPlaylist.length && !this.collectionList.length){
					this.activeIndex = undefined;
				}else if(!this.userDiyPlaylist.length && this.collectionList.length){
					this.createActive = false;
				}
			}else if(query.name){ //带了参数进来，设置当前激活项
				let name = query.name;
				this.createActive = true;
				this.activeIndex = this.userDiyPlaylistNameArr.indexOf(name);
			}else{
				let id = query.id;
				this.createActive = false;
				this.activeIndex = this.collectionListIdArr.indexOf(Number(id));
			}

			this.doRouter();
		},
		beforeUpdate(){
			this.doRouter();
		}
	}
</script>

<style scoped>
	#song-sheet-list .head{
		margin-bottom:15px;
		padding-top:40px;
	}
	#song-sheet-list .head .title{
		position:relative;
		float:left;
		margin-left:20px;
		text-indent:16px;
		font-size:15px;
		color:#000;
	}
	#song-sheet-list .head .tri{
		position:absolute;
		left:0;
		top:8px;
		width:0;
		height:0;
		border-width:8px 7px;
		border-color:#ccc transparent transparent;
		border-style:solid dashed dashed;
	}
	#song-sheet-list .fold .head .tri{
		top:4px;
		left:5px;
		border-color:transparent transparent transparent #ccc;
		border-style:dashed dashed dashed solid;
	}
	#song-sheet-list .head .new{
		float:right;
		margin-right:10px;
		width:52px;
		line-height:22px;
		text-align:center;
		text-indent:12px;
		background:url(../../../assets/button.png) no-repeat 0 -96px;
	}
	#song-sheet-list .head .new:hover{
		background-position:-94px -39px;
	}
	#song-sheet-list .list .list-item{
		position:relative;
		padding:8px 0 6px 20px;
		cursor:pointer;
	}
	#song-sheet-list .list .list-item:hover{
		background-color:#f4f2f2;
	}
	#song-sheet-list .list .list-item.active{
		background-color:#e6e6e6;
	}
	#song-sheet-list .list .list-item .img{
		float:left;
		width:40px;
		height:40px;
	}
	#song-sheet-list .list .list-item .img img{
		width:100%;
		height:100%;
	}
	#song-sheet-list .list .info{
		margin-left:50px;
	}
	#song-sheet-list .list .info .name{
		color:#000;
	}
	#song-sheet-list .list .info .counts{
		margin-top:5px;
		color:#999;
	}
	#song-sheet-list .list-item .operate{
		display:none;
		position:absolute;
		right:10px;
		bottom:7px;
		width:36px;
		height:14px;
	}
	#song-sheet-list .list-item:hover .operate{
		display:block;
	}
	#song-sheet-list .list-item .operate a{
		float:left;
		width:13px;
		height:14px;
		background:url(../../../assets/icon-1.png) no-repeat 0 0;
	}
	#song-sheet-list .list-item .operate .edit{
		margin-right:10px;
		background-position:0 -270px;
	}
	#song-sheet-list .list-item .operate .edit:hover{
		background-position:-20px -270px;
	}
	#song-sheet-list .list-item .operate .del{
		background-position:0 -284px;
	}
	#song-sheet-list .list-item .operate .del:hover{
		background-position:-20px -284px;
	}
	#song-sheet-list .empty{
		padding:20px;
		font-size:14px;
		color:#cc0000;
	}
</style>