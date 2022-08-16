<template>
	<div id="new-list" v-if="newAlbums">
		<section-title
            name="新碟上架"
            router-name="discoverNewAlbum">
        </section-title>
		<div class="new-list-wrapper">
			<div class="new-list-container">
				<transition>
					<ul class="new-list clearfix" :style="{'margin-left':-index*width+'px'}" :class="{move:move}">
						<li class="new-list-item" v-for="n in showCount" :key="'prev' + n">
							<div class="img-wrapper">
								<router-link :to="{name:'album',query:{id:newAlbums[newAlbums.length-showCount+n-1].id}}" class="img-link">
									<img :src="newAlbums[newAlbums.length-showCount+n-1].picUrl" alt="">									
								</router-link>
								<a class="play" @click="playAlbum(newAlbums[newAlbums.length-showCount+n-1].id)"></a>
							</div>
							<div class="infos">
								<p class="name">
									<router-link :to="{name:'album',query:{id:newAlbums[newAlbums.length-showCount+n-1].id}}">
										{{newAlbums[newAlbums.length-showCount+n-1].name}}
									</router-link>
								</p>
								<p class="artist" :title="newAlbums[newAlbums.length-showCount+n-1].artists | joinNames">
									<template v-for="(artist,index) in newAlbums[newAlbums.length-showCount+n-1].artists">
										<router-link :to="{name:'artist',query:{id:artist.id}}"  :key="'prev' + artist.id">
											{{artist.name}}
										</router-link>
										<span class="seperator" :key="'prev' + index">/</span>
									</template>
								</p>
							</div>
						</li>
						<li class="new-list-item" v-for="album in newAlbums" :key="album.id">
							<div class="img-wrapper">
								<router-link :to="{name:'album',query:{id:album.id}}" class="img-link">
									<img :src="album.picUrl" alt="">									
								</router-link>
								<a class="play" @click="playAlbum(album.id)"></a>
							</div>
							<div class="infos">
								<p class="name">
									<router-link :to="{name:'album',query:{id:album.id}}">
										{{album.name}}
									</router-link>
								</p>
								<p class="artist" :title="album.artists | joinNames">
									<template v-for="(artist,index) in album.artists">
										<router-link :to="{name:'artist',query:{id:artist.id}}" :key="artist.id">
											{{artist.name}}
										</router-link>
										<span class="seperator" :key="index">/</span>
									</template>
								</p>
							</div>
						</li>
						<li class="new-list-item" v-for="n in showCount" :key="'next' + n">
							<div class="img-wrapper">
								<router-link :to="{name:'album',query:{id:newAlbums[n-1].id}}" class="img-link">
									<img :src="newAlbums[n-1].picUrl" alt="">									
								</router-link>
								<a class="play" @click="playAlbum(newAlbums[n-1].id)"></a>
							</div>
							<div class="infos">
								<p class="name">
									<router-link :to="{name:'album',query:{id:newAlbums[n-1].id}}">
										{{newAlbums[n-1].name}}
									</router-link>
								</p>
								<p class="artist" :title="newAlbums[n-1].artists | joinNames">
									<template v-for="(artist,index) in newAlbums[n-1].artists">
										<router-link :to="{name:'artist',query:{id:artist.id}}" :key="'next' + artist.id">
											{{artist.name}}
										</router-link>
										<span class="seperator" :key="'next' + index">/</span>
									</template>
								</p>
							</div>
						</li>						
					</ul>
				</transition>
			</div>
			<a class="ctrl lctrl" @click="back"></a>
			<a class="ctrl rctrl" @click="forward"></a>			
		</div>
	</div>
</template>

<script>
    import SectionTitle from '@components/sectionTitle'
	import {mapState,mapActions} from 'vuex'
	export default{
		data(){
			return {
				showCount:5,//一次展示多少个，默认为5,
				width:undefined, //容器的宽度，用于设置style，通过created中获取 
				index:1,//标记当前展示的为第几组数据,默认为1，排列顺序为2 (1) 2 1  (初始显示)
				move:false //用于给ul元素加上类名，以触发动画
			}
		},
		computed:{
			rows(){//展示元素一共有多少行，能显示几次
				return this.newAlbums.length/this.showCount;
			},
			...mapState('album',['newAlbums'])
		},
		methods:{
			...mapActions('album',['initNewAlbums']),
			...mapActions('playlist',['insertListIntoPlaylistByAlbumId']),
			forward(){
				this.move = true;
				this.index ++;
				if(this.index == this.rows + 1){
					setTimeout(()=>{
						this.move = false;
						this.index = 1;
					},1100);
				}
			},
			back(){
				this.move = true;
				this.index --;
				if(this.index == 0){
					setTimeout(()=>{
						this.move = false;
						this.index = this.rows;
					},1100);
				}
			},
			initData(){
                this.initNewAlbums();
			},
			async playAlbum(id){
				await this.insertListIntoPlaylistByAlbumId(id);
				this.$message.playerMessage('已开始播放');
			}
		},
		filters:{			
			joinNames(artists){
				artists.map(artist=>{
					return artist.name;
				}).join('/');
			}
		},
		updated(){
			var container = document.querySelector('.new-list-container');
			this.width = container.offsetWidth;
		},
		created(){
			this.initData();
        },
        components:{
            SectionTitle
        }
	}
</script>

<style lang="scss" scoped>
	#new-list{
		.new-list-wrapper{
			position:relative;
			margin:20px 0 32px;
			border:1px solid #d3d3d3;
			background-color:#f5f5f5;
		}
		.ctrl{
			position:absolute;
			top:74px;
			width:8px;
			height:14px;
			background:url(../../../img/index.png) no-repeat 0 0;
			&.lctrl{
				left:10px;
				background-position:-265px -77px;
				&:hover{
					background-position:-285px -77px;
				}
			}
			&.rctrl{
				right:13px;
				background-position:-305px -77px;
				&:hover{
					background-position:-325px -77px;
				}
			}

		}
		.new-list-container{
			overflow:hidden;
			width:645px;
			margin:28px 17px 14px 28px;
		}
		.new-list{
			width:9999px;
		}
		.move{
			transition:all 1s;
		}
		.new-list-item{
			float:left;
			margin-right:11px;
		}
		.img-wrapper{
			position:relative;
			.play{
				position:absolute;
				display:none;
				left:72px;
				bottom:6px;
				width:22px;
				height:22px;
				background:url(../../../img/iconall.png) no-repeat 0 -85px;
				&:hover{
					background-position:0 -110px;
				}
			}
			&:hover .play{
				display:block;
			}
		}
		.img-link{
			display:block;
			height:100px;
			width:118px;
			text-align:left;
			background:url(../../../img/coverall.png) no-repeat 0 -570px;
			img{
				width:100px;
				height:98px;
				margin:1px;
			}
		}
		.infos{
			p{
				overflow:hidden;
				width:100px;
				line-height:18px;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			.name{
				margin-top:5px;
				a{
					color:#666;
				}
			}
		}
		.seperator:last-child{
			display:none;
		}
	}
</style>