<template>
	<div id="banner" :style="{'background-color':bgColors[activeIndex]}" @mouseover="cancelAutoplay" @mouseout="autoplay" v-if="bgColors">
		<div class="bn-wrapper clearfix">
			<div class="banner-container">
				<router-link :to="currentUrl.url" class="banner-url" v-if="currentUrl.inner">
					<transition>
						<img :src="banners[activeIndex].imageUrl" :key="banners[activeIndex].imageUrl" class="banner-img">
					</transition>
				</router-link>
				<a :href="currentUrl.url" class="banner-url" v-if="!currentUrl.inner" target="_blank">
					<img :src="banners[activeIndex].imageUrl" :key="banners[activeIndex].imageUrl" class="banner-img">
				</a>			
				<a class="l-ctrl" @click="move(-1)"></a>
				<a class="r-ctrl" @click="move(1)"></a>
				<div class="cursor">
					<ul class="cursor-list">
						<li 
                            v-for="index in banners.length"
                            :class="{active:index-1 === activeIndex}"
                            @click="active(index-1)"
                            :key="index">
							<i></i>
						</li>
					</ul>
				</div>
			</div>
			<div class="ad-area">
				<download-ad></download-ad>
			</div>
		</div>
	</div>
</template>

<script>
	import DownloadAd from '@components/downloadAd'
	import {getBannerData,getImageMainColor} from 'API/getData'
	export default{
		data(){
			return {
				banners:null,
				activeIndex:0,
				bgColors:null,
				bannerTimer:null
			}
		},
		computed:{
			currentUrl(){
				let url = this.banners[this.activeIndex].url;
				let inner = false;
				if(!url){
					inner = true;
					let id = this.banners[this.activeIndex].targetId;
					let targetType = this.banners[this.activeIndex].targetType;
					let type2str = {
						1:'song',
						10:'album',
						100:'artist',
						1000:'playlist',
						1002:'userHome',
						1004:'mv',
						1005:'dj',
					}
					// url = type2str[targetType] + '?id=' + id;
					url={
						name:type2str[targetType],
						query:{
							id
						}
					};
				}

				return {url,inner}
			}
		},
		components:{
			DownloadAd
		},
		methods:{
			async initData(){
				await getBannerData().then(response=>{
					this.banners = response.data.banners;
				});
				this.bgColors = new Array(this.banners.length);
				for(let i=0;i<this.banners.length;i++){
					await getImageMainColor(this.banners[i].imageUrl).then(result=>{
						this.bgColors[i] = result[0].color;
					});
				}
				this.autoplay();
			},
			active(index){
				this.activeIndex = index;
			},
			move(step){
				let index = this.activeIndex + step;
				if(index < 0){
					index = this.banners.length - 1;
				}else if(index >= this.banners.length){
					index = 0;
				}
				this.activeIndex = index;
			},
			cancelAutoplay(){
				clearInterval(this.bannerTimer);
			},
			autoplay(){
				clearInterval(this.bannerTimer);
				this.bannerTimer = setInterval(()=>{
					this.move(1);
				},5000);
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style scoped>
	#banner{
		transition:all 1s;
	}
	#banner .bn-wrapper{
		width:982px;
		margin:0 auto;
	}
	#banner .banner-container{
		position:relative;
		float:left;		
	}
	#banner .banner-url{
		position:relative;
		display:block;
		width:730px;
		height:336px;
	}
	#banner .banner-img{
		position:absolute;
		top:0;
		left:0;
		width:730px;
		height:336px;
	}
	#banner .banner-img.v-enter-active{
		animation:fadeIn 1s;
	}
	#banner .banner-img.v-leave-active{
		animation:fadeOut 1s;
	}
	@keyframes fadeIn{
		from{
			opacity:0
		}
		to{
			opacity:1
		}
	}
	@keyframes fadeOut{
		from{
			opacity:1
		}
		to{
			opacity:0
		}
	}
	#banner .l-ctrl,#banner .r-ctrl{
		position:absolute;
		width:39px;
		height:64px;
		top:137px;
		background:url(../../img/banner.png) no-repeat 0 0;
	}
	#banner .l-ctrl{
		left:-90px;
		background-position:0 -360px;
	}
	#banner .l-ctrl:hover{
		background-position:0 -430px;
	}
	#banner .r-ctrl{
		right:-320px;
		background-position:0 -508px;
	}
	#banner .r-ctrl:hover{
		background-position:0 -578px;
	}
	#banner .cursor{
		position:absolute;
		width:100%;
		height:10px;
		bottom:15px;
		text-align:center;
	}
	#banner .cursor-list{
		display:inline-block;
		margin-right:-14px;
	}
	#banner .cursor-list li{
		float:left;
		width:10px;
		height:10px;
		margin-right:14px;
		cursor:pointer;
	}
	#banner .cursor-list li i{
		display:block;
		width:6px;
		height:6px;
		margin:2px;
		border-radius:50%;
		background-color:#fff;
	}
	#banner .cursor-list li.active i,#banner .cursor-list li:hover i{
		background-color:#c40c0c;
	}
	#banner .ad-area{
		float:right;
		width:252px;
		height:336px;
		background-color:#ccc;
	}
</style>