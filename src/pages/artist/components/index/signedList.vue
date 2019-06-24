<template>
	<div id="signed-list" v-if="signedArtists">
		<div class="section-header clearfix">
			<h2 class="title">
				<span>入驻歌手</span>
			</h2>
			<router-link class="more" :to="{name:'discoverSingerSigned'}">更多&gt;</router-link>
		</div>
		<ul class="list clearfix">
			<li class="list-item" v-for="artist in artists" :key="artist.id">
				<router-link class="img" :to="{name:'artist',query:{id:artist.id}}">
					<img :src="artist.picUrl" alt="">
				</router-link>
				<p class="about clearfix">
					<router-link :to="{name:'artist',query:{id:artist.id}}" class="ar" :title="artist.name + '的音乐'">{{artist.name}}</router-link>
					<router-link :to="{name:'userHome',query:{id:artist.accountId}}" class="user" :title="artist.name + '的个人主页'" v-if="artist.accountId"></router-link>
				</p>
			</li>
		</ul>
		<loading
			:show="isFullList"
			:has-more="hasMore"
			loadedText="无更多数据"
			@loadingShowed="getMoreData"></loading>
	</div>
</template>

<script>
	import {getSignedArtist} from '@service/getData'
	import Loading from '@components/loading'
	export default {
		data(){
			return {
				signedArtists:null,
				pageIndex:0,
				pageCount:30,
				hasMore:true,
				justLoaded:false,
				waited:false
			}
		},
		methods:{
			initData(){
				getSignedArtist({
					offset:this.pageIndex*this.pageCount
				}).then(res=>{
					if(!this.signedArtists){
						this.signedArtists = res.data.artists;
					}else{
						this.hasMore = res.data.more;
						this.signedArtists = this.signedArtists.concat(res.data.artists);
					}
				});
			},
			getMoreData(){
				if(!this.justLoaded){
					this.justLoaded = true;
					this.waited = false;
					this.pageIndex ++;
					this.initData();
					//  节流
					setTimeout(()=>{						
						this.justLoaded = false;
						if(this.waited){
							this.getMoreData();
						}
					},5000)
				}else{
					this.waited = true;
				}
			}
		},
		computed:{
			artists(){
				if(this.isFullList){
					return this.signedArtists;
				}else{
					return this.signedArtists.slice(0,10);
				}
			},
			isFullList(){
				return this.$route.name === 'discoverSingerSigned';
			}
		},
		created(){
			if(!this.signedArtists){
				this.initData();
			}
		},
		components:{
			Loading
		}
	}
</script>

<style lang="scss" scoped>
	#signed-list{
		.list{
			margin-right:-17px;
		}
		.list-item{
			float:left;
			margin:20px 17px 0 0;
		}
		.img{
			display:block;
			width:130px;
			height:130px;
			img{
				width:100%;
				height:100%;
			}
		}
		.about{
			width:130px;
			margin-top:7px;
		}
		.ar{
			float:left;
			color:#000;
		}
		.user{
			float:right;
			width:16px;
			height:17px;
			background:url(../../../../assets/icon.png) no-repeat 0 -740px;
		}
	}
</style>