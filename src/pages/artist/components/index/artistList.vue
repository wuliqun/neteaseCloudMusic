<template>
	<div id="artist-list">
		<div class="section-header clearfix">
			<h2 class="title">
				{{categoryName}}
			</h2>
		</div>
		<ul class="initial-selector clearfix" v-if="catId">
			<li class="select-item">
				<router-link :to="{name:routerName,query:{id:catId,initial:-1}}" class="cn" :class="{active:initial == -1 || initial === undefined}">热门</router-link>
			</li>
			<li class="select-item" v-for="n in 26" :key="String.fromCharCode(n+64)">
				<router-link :to="{name:routerName,query:{id:catId,initial:n+64}}" :class="{active:initial == n+64}">{{String.fromCharCode(n+64)}}</router-link>
			</li>
			<li class="select-item">
				<router-link :to="{name:routerName,query:{id:catId,initial:0}}" class="cn" :class="{active:initial === '0'}">其他</router-link>
			</li>
		</ul>
		<ul class="list clearfix" v-if="artists">
			<li class="item" v-for="n in 5" :key="artists[n-1].id">
				<router-link class="img" :to="{name:'artist',query:{id:artists[n-1].id}}">
					<img :src="artists[n-1].picUrl" alt="">
				</router-link>
				<p class="about clearfix">
					<router-link :to="{name:'artist',query:{id:artists[n-1].id}}" class="ar f-thide" :title="artists[n-1].name + '的音乐'">{{artists[n-1].name}}</router-link>
					<router-link :to="{name:'userHome',query:{id:artists[n-1].accountId}}" class="user" :title="artists[n-1].name + '的个人主页'" v-if="artists[n-1].accountId"></router-link>
				</p>
			</li>
			<li class="item line" v-for="n in 5" :key="artists[n+5-1].id">
				<router-link class="img" :to="{name:'artist',query:{id:artists[n+5-1].id}}">
					<img :src="artists[n+5-1].picUrl" alt="">
				</router-link>
				<p class="about clearfix">
					<router-link :to="{name:'artist',query:{id:artists[n+5-1].id}}" class="ar f-thide" :title="artists[n+5-1].name + '的音乐'">{{artists[n+5-1].name}}</router-link>
					<router-link :to="{name:'userHome',query:{id:artists[n+5-1].accountId}}" class="user" :title="artists[n+5-1].name + '的个人主页'" v-if="artists[n+5-1].accountId"></router-link>
				</p>
			</li>
			<li class="sml" v-for="n in artists.length-10" :key="artists[n+10-1].id">
				<p class="about clearfix">
					<router-link :to="{name:'artist',query:{id:artists[n+10-1].id}}" class="ar f-thide" :title="artists[n+10-1].name + '的音乐'">{{artists[n+10-1].name}}</router-link>
					<router-link :to="{name:'userHome',query:{id:artists[n+10-1].accountId}}" class="user" :title="artists[n+10-1].name + '的个人主页'" v-if="artists[n+10-1].accountId"></router-link>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import {getTopArtists,getSingerList} from '@service/getData'
	export default{
		data(){
			return {
				catId:'',
				routerName:'',
				initial:'',
				artists:null
			}
		},
		watch:{
			$route(to){
				if(to.name === 'discoverSingerCategory'){
					this.initData();
				}
			}
		},
		methods:{
			initData(){
				this.catId = this.$route.query.id;
				this.routerName = this.$route.name;
				if(this.routerName === 'discoverSingerCategory'>= 0 && !this.catId){
					this.catId = 1001;
				}
				let initial = this.$route.query.initial;
				this.initial = initial;
				if(initial == 0 || initial == -1 || !initial){  //热门和其他均没有接口，当做没有
					initial = undefined;
				}else{
					initial = String.fromCharCode(initial);
				}
				if(!this.catId){
					getTopArtists().then(response=>{
						this.artists = response.data.artists;
					});
				}else{
					getSingerList({
						cat:this.catId,
						initial:initial
					}).then(response=>{
						this.artists = response.data.artists;
					});
				}
			}
		},
		created(){			
			this.initData();
		},
		computed:{
			categoryName(){
				if(this.catId){
					let groupIndex = parseInt(this.catId/1000);
					let index = this.catId % 1000;
					return [,'华语','欧美',,'其他',,'日本','韩国'][groupIndex] + ['男歌手','女歌手','组合/乐队'][index-1];
				}else{
					return '热门歌手'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#artist-list{
		a:hover{
			text-decoration:underline;
		}
		.initial-selector{
			margin:20px -4px 20px 0;
		}
		.select-item{
			float:left;
			margin-right:4px;
			line-height:24px;			
			a{
				display:block;
				padding:0 5px;
				color:#333;
				&.cn{
					padding:0 10px;
				}
				&.active{
					color:#fff;
					border-radius:3px;
					background-color:#c20c0c;
				}
			}
		}
		.list{
			margin:20px 0 0 -17px;
			li{
				float:left;
				padding-left:17px;
			}
		}
		.item{
			padding-bottom:30px;
		}
		.line{
			border-bottom:1px dotted #999;
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
			max-width:110px;
			color:#000;
		}
		.user{
			float:right;
			width:16px;
			height:17px;
			margin-top:1px;
			background:url(../../../../assets/icon.png) no-repeat 0 -740px;
		}
		.sml .user{
			float:left;
			margin-left:2px;
		}
	}
</style>