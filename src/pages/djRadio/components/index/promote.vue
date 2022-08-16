<template>
	<div id="dj-promote" class="clearfix">
		<div class="left">
			<div class="section-header clearfix">
				<h2 class="title">
					<router-link :to="{name:'discoverDjRadioRecommend'}">推荐节目</router-link>
				</h2>
				<router-link :to="{name:'discoverDjRadioRecommend'}" class="more">更多&gt;</router-link>
			</div>
			<ul class="list" v-if="recommendList">
				<li class="list-item clearfix" v-for="item in recommendList" :key="item.id">
					<div class="img">
						<img :src="item.coverUrl" alt="">
						<a class="play" title="播放"></a>
					</div>
					<div class="info">
						<p class="f-thide">
							<router-link :to="{name:'program',query:{id:item.id}}" class="name f-thide">{{item.name}}</router-link>
						</p>
						<p class="f-thide">
							<router-link :to="{name:'dj',query:{id:item.dj.userId}}" class="dj f-thide">{{item.dj.nickname}}</router-link>
						</p>
					</div>
					<div class="cate">
						<router-link :to="{name:'discoverDjRadioCategory',query:{id:item.radio.categoryId}}">{{item.radio.category}}</router-link>
					</div>
				</li>
			</ul>
		</div>
		<div class="right">
			<div class="section-header clearfix">
				<h2 class="title">
					<router-link :to="{name:'discoverDjRadioRank'}">节目排行榜</router-link>
				</h2>
				<router-link :to="{name:'discoverDjRadioRank'}" class="more">更多&gt;</router-link>
			</div>
			<ul class="list" v-if="rankList">
				<li class="list-item clearfix" v-for="(item,index) in rankList" :key="item.id">
					<div class="index" :class="{top3:index<3}">
						<span>{{index|index2str}}</span>
					</div>
					<div class="img">
						<img :src="item.picUrl" alt="">
						<a class="play"></a>
					</div>
					<div class="info info-1">
						<p class="f-thide">
							<a class="name f-thide">{{item.name}}</a>
						</p>
						<p class="f-thide">
							<a class="dj f-thide">{{item.dj.nickname}}</a>
						</p>
					</div>
					<div class="hot">
						<div class="percent" :style="{width:item.subCount/maxSubCount*100 + '%'}"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {getDjRecommend,getDjRank} from 'API/getData'
	export default{
		data(){
			return {
				recommendList:null,
				rankList:null,
				maxSubCount:0
			}
		},
		methods:{
			initData(){
				getDjRecommend().then(response=>{
					this.recommendList = response.data.programs;
				});
				getDjRank().then(response=>{
					this.rankList = response.data.djRadios;
					this.rankList.forEach(item=>{
						if(item.subCount > this.maxSubCount){
							this.maxSubCount = item.subCount;
						}
					})
				});
			}			
		},
		filters:{
			index2str(index){
				index ++;
				return index > 9 ? '' + index : '0' + index;
			}
		},
		mounted(){
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#dj-promote{
		.left{
			float:left;
			width:426px;
		}
		.right{
			float:right;
			width:426px;
		}
		.list{
			border:1px solid #e2e2e2;
			border-top:none;
		}
		.list-item{
			height:60px;
			&:nth-child(2n){
				background-color:#f7f7f7;
			}
			&:hover .play{
				display:block;
			}
		}
		.img{
			position:relative;
			float:left;
			width:40px;
			height:40px;
			margin:10px 10px 0 20px;
			cursor:pointer;
			img{
				width:100%;
				height:100%;
			}
			.play{
				position:absolute;
				display:none;
				height:20px;
				width:20px;
				top:10px;
				left:10px;
				background:url(../../../../img/iconall.png) no-repeat 0 -111px;
			}
		}
		.info{
			float:left;
			width:250px;
			margin:10px 0;
			line-height:20px;
			a:hover{
				text-decoration:underline;
			}
		}
		.name{
			color:#333;
		}
		.dj{
			color:#999;
		}
		.cate{
			float:left;
			margin:21px 0 0 14px;
			line-height:16px;
			a{				
				padding:0 5px;
				border:1px solid #999;
			}
		}
		.index{
			float:left;
			width:20px;
			height:60px;
			margin-left:15px;
			line-height:60px;
			color:#999;
			&.top3{
				color:#da4545;
			}
		}
		.info-1{
			width:200px;
		}
		.hot{
			float:left;
			width:100px;
			height:8px;
			margin-top:26px;
			border-radius:4px;
			background-color:#dedede;
		}
		.percent{
			height:8px;
			border-radius:4px;
			background-color:#c5c5c5;
		}
	}
</style>