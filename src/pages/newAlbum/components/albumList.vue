<template>
	<div id="album-list">
		<div class="section-header clearfix">
			<slot></slot>
		</div>
		<ul class="list clearfix" v-if="albums">
			<li class="list-item" v-for="album in albums" :key="album.id">
				<div class="img-wrapper">
					<router-link :to="{name:'album',query:{id:album.id}}" class="img-link">
						<img :src="album.picUrl" alt="">									
					</router-link>
					<a class="play" @click="playAlbum(album.id)"></a>
				</div>
				<div class="infos">
					<p class="name f-thide">
						<router-link :to="{name:'album',query:{id:album.id}}">
							{{album.name}}
						</router-link>
					</p>
					<p class="artist f-thide" :title="album.artists | joinNames">
						<template v-for="artist in album.artists">
							<router-link :to="{name:'artist',query:{id:artist.id}}" :key="artist.id">
								{{artist.name}}
							</router-link>
							<span class="seperator" :key="'sep' + artist.id">/</span>
						</template>
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
			return{}
		},
		methods:{
			...mapActions('playlist',['insertListIntoPlaylistByAlbumId']),
			async playAlbum(id){
				await this.insertListIntoPlaylistByAlbumId(id);
				this.$message.playerMessage('已开始播放');
			}
		},
		props:['albums'],
		filters:{			
			joinNames(artists){
				artists.map(artist=>{
					return artist.name;
				}).join('/');
			}
		}
	}
</script>

<style lang="scss" scoped>
	#album-list{
		margin-top:40px;
		.section-header{
			margin-top:15px;
			padding-bottom:10px;
			border-bottom:2px solid #c20c0c;
			.title{
				float:left;
				line-height:31px;
				font-size:24px;
				color:#333;
				a{
					color:#333;				
				}
			}
			a:hover{
				text-decoration:underline;
			}
			.sublinks{
				float:left;
				line-height:16px;
				margin:14px 0 0 6px;
			}
			.sublink{
				position:relative;
				float:left;
				padding:0 12px 0 14px;
				&:after{
					content:'';
					position:absolute;
					width:1px;
					height:11px;
					top:3px;
					right:0;
					border-left:1px solid #ebd8cb;
					background-color:#cbd8eb;
				}
				&:last-child:after{
					display:none;
				}
				a{
					color:#666;
				}
			}
		}
		.list{
			margin-right:-33px;
		}
		.list-item{
			float:left;
			margin:20px 33px 0 0;
		}
		.img-wrapper{
			position:relative;
			.play{
				position:absolute;
				display:none;
				right:30px;
				bottom:5px;
				width:28px;
				height:28px;
				background:url(../../../assets/iconall.png) no-repeat 0 -140px;
				&:hover{
					background-position:0 -170px;
				}
			}
			&:hover .play{
				display:block;
			}
		}
		.img-link{
			display:block;
			height:130px;
			width:153px;
			text-align:left;
			background:url(../../../assets/coverall.png) no-repeat 0 -845px;
			img{
				width:128px;
				height:128px;
				margin:1px;
			}
		}		
		.infos{
			width:153px;
			a:hover{
				text-decoration:underline;
			}
		}
		.name{
			margin:8px 0 3px;
			a{
				color:#000;
			}
		}
		.artist{
			height:18px;
			color:#666;
			a{
				color:#666;
			}
		}
		.seperator:last-child{
			display:none;
		}
	}
</style>