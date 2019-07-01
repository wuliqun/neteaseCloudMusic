<template>
	<div id="playlist-container" v-if="playlist">
		<ul class="list clearfix">
			<li v-for="item in playlist" class="list-item"
				:key="item.id">
				<div class="img">
					<router-link :to="{name:'playlist',query:{id:item.id}}" :title="item.name" class="img-wrapper">
						<img :src="item.coverImgUrl" alt="">
					</router-link>
					<div class="bottom">
						<div class="play-count">
							<i class="icon"></i>
							<i class="count">{{item.playCount | count2str}}</i>
						</div>
						<a class="play" @click="playPlaylist(item.id)"></a>
					</div>
				</div>
				<div class="info">
					<p class="name f-thide">
						<router-link :to="{name:'playlist',query:{id:item.id}}">
							{{item.name}}
						</router-link>
					</p>
					<p class="creator f-thide">
						<span>by</span>
						<router-link :to="{name:'userHome',query:{id:item.creator.userId}}">{{item.creator.nickname}}</router-link>
					</p>		
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default{
		data(){
			return {}
		},
		props:['playlist'],
		filters:{
			count2str(count){
				if(n < 10000){
                    return '' + n;
                }else{
                    var s =  (n/10000).toFixed(1) + '万';
                    if(s.length >=6){
                        s = s.split('.')[0] + '万'
                    }
                    return s;
                }
			}
		},
		methods:{
			...mapActions('playlist',['insertListIntoPlaylistById']),
			async playPlaylist(id){
				await this.insertListIntoPlaylistById(id);
				this.$message.playerMessage('已开始播放');
			}
		}
	}	
</script>

<style lang="scss" scoped>
	#playlist-container{
		.list{
			margin-right:-50px;
		}
		.list-item{
			float:left;
			margin:30px 50px 0 0;
		}
		.img{
			position:relative;
		}
		.img-wrapper{
			display:block;
			width:140px;
			height:140px;
			img{
				width:100%;
				height:100%;
			}
		}
		.bottom{
			position:absolute;
			left:0;
			bottom:0;
			height:25px;
			width:100%;
			background-color:rgba(0,0,0,.3);
		}
		.play-count{
			float:left;
			line-height:25px;
			color:#ccc;
			.icon{
				float:left;
				width:14px;
				height:11px;
				margin:7px 0 0 10px;
				background:url(../../../assets/iconall.png) no-repeat 0 -24px;
			}
			.count{
				margin-left:3px;
			}
		}
		.play{
			float:right;
			width:16px;
			height:17px;
			margin:5px 10px 0 0;
			background:url(../../../assets/iconall.png) no-repeat 0 0;
			&:hover{
				background-position:0 -60px;
			}
		}
		.info{
			width:140px;
			margin-top:6px;
			line-height:22px;
		}
		.name{
			height:22px;			
			a{
				color:#000;
				&:hover{
					text-decoration:underline;
				}
			}
		}
		.creator{
			height:22px;
			color:#999;
			a{
				color:#666;
				&:hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>