<template>
	<div class="panel">
		<div class="header clearfix">
			<p class="tit">添加到歌单</p>
			<i class="close" @click="hide"></i>
		</div>
		<a class="new clearfix" @click="showCreate">
			<div class="icon-cross"></div>
			<p class="txt">新歌单</p>
		</a>
		<div class="list">
			<ul>
				<li 
                    v-for="list in userDiyPlaylist"
                    class="list-item clearfix" 
                    @click="addSong(list.name)"
                    :key="list.name">
					<div class="img">
						<img :src="list.coverImgUrl">
					</div>
					<div class="info">
						<p class="name">{{list.name}}</p>
						<p class="counts">{{list.tracks.length}}首</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return {}
		},
		methods:{
			...mapMutations('userDiyPlaylist',
				['showCreateDiyListPanel','hideAddDiyListPanel','addSongToDiyPlaylistByName','removeWaitToAdd']),
			hide(){
				this.removeWaitToAdd();
				this.hideAddDiyListPanel();
			},
			addSong(name){
				this.addSongToDiyPlaylistByName(name);	
				this.hideAddDiyListPanel();
				this.removeWaitToAdd();
				this.$message.success('添加歌曲成功');
			},
			showCreate(){
				this.showCreateDiyListPanel();
			}
		},
		computed:{
			...mapState('userDiyPlaylist',['userDiyPlaylist'])
		}
	}
</script>

<style lang="scss" scoped>
	@mixin wh($w,$h){
		width:$w;
		height:$h;
	}
	.panel{
        background-color: #fff;
		.new{
			display:block;
			height:56px;
			line-height:56px;
			background-color:#e6e6e6;
			.txt{
				float:left;
				margin-left:10px;
				font-size:14px;
				color:#333;
			}
		}
		.icon-cross{
			float:left;
			@include wh(35px,35px);
			margin:10px 0 0 35px;
			background:url(../../img/icon-1.png) no-repeat 0 -495px;
		}
		.list{
			overflow:auto;
			margin-bottom:20px;
			height:275px;
			background-color:#fff;
		}
		.list-item{
			height:55px;
			box-sizing:border-box;
			padding:8px 35px;
			cursor:pointer;
			border-top:1px solid #e0e0e0;
			&:hover{
				background-color:#ccc;
			}
		}
		.img{
			float:left;
			@include wh(40px,40px);
			margin-right:10px;
			img{
				@include wh(100%,100%);
			}
		}
		.info{
			float:left;
			line-height:18px;
			.name{
				color:#000;
				margin-bottom:4px;
			}
			.counts{
				color:#666;
			}
		}
	}
</style>