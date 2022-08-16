<template>
	<div id="playlist-header" class="clearfix">
		<h2 class="title">{{cat || '全部'}}</h2>
		<div class="cate">
			<a class="btn" @click.stop="toggleShowCate">选择分类
				<i class="arrow"></i>
			</a>
			<div class="cate-pop" v-show="showCate">
				<i class="delta"></i>
				<div class="top clearfix">
					<router-link :to="{name:'discoverPlaylist'}" class="all">全部风格</router-link>
				</div>
				<ul class="cate-list" v-if="cateData.length">
					<li class="clearfix" v-for="(category,index) in cateData"
						:key="category.id">
						<div class="category">
							<i class="icon" :class="'icon-' + index"></i>
							<span>{{category.category}}</span>
						</div>
						<ul class="subs clearfix">
							<li class="subcate" v-for="item in category.subs" :key="item.id">
								<router-link :to="{name:'discoverPlaylist',query:{cat:item.name,order:order}}" @click.stop="hide">
									{{item.name}}
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="order">
			<router-link :to="{name:'discoverPlaylist',query:{cat:cat,order:'hot'}}" class="hot" :class="{active:order == 'hot'}">热门</router-link>
			<router-link :to="{name:'discoverPlaylist',query:{cat:cat,order:'new'}}" class="new" :class="{active:order == 'new'}">最新</router-link>
		</div>
	</div>
</template>

<script>
	import {getPlaylstCatlist} from 'API/getData'
	export default{
		data(){
			return {
				showCate:false,
				cateData:[]
			}
		},
		methods:{
			toggleShowCate(){
				this.showCate = !this.showCate;
			},
			hide(){
				this.showCate = false;
			},
			async initData(){
				await getPlaylstCatlist().then(response=>{
					let data = response.data;
					let categories = data.categories;
					categories.length = Object.keys(categories).length;
					let arr = Array.from(categories);
					for(let category of arr){
						this.cateData.push({
							category:category,
							subs:[]
						});
					}
					for(let item of data.sub){
						let index = item.category;
						this.cateData[index].subs.push(item);
					}
				});
			}
		},
		props:['order','cat'],
		created(){
			document.addEventListener('click',()=>{
				this.showCate = false;
			});
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#playlist-header{
		height:32px;
		padding-bottom:8px;
		line-height:30px;
		border-bottom:2px solid #c60c0c;
		.title{
			float:left;
			font-size:22px;
			color:#333;
		}
		.cate{
			position:relative;
			float:left;
			margin:2px 0 0 15px;
		}		
		.btn{
			position:relative;
			display:block;		
			height:31px;			
			padding:0 14px;
			color:#0c73c2;
			background:url(../../../img/button2.png) no-repeat 0 -141px;
			&:after{
				content:'';
				position:absolute;
				top:0;
				right:0;
				width:5px;
				height:100%;
				background:url(../../../img/button2.png) no-repeat -245px -182px;
			}
			&:hover{
				background-position:0 -223px;
				&:after{
					background-position:-245px -264px;
				}
			}
			.arrow{
				display:inline-block;
				width:8px;
				height:5px;
				vertical-align:middle;
				background:url(../../../img/icon.png) no-repeat -70px -543px;
			}
		}
		.cate-pop{
			position:absolute;
			z-index:5;
			left:-90px;
			top:45px;
			width:700px;
			background-color:#fff;
			box-shadow:0 0 4px #999;
			.delta{
				position:absolute;
				top:-11px;
				left:120px;
				width:24px;
				height:11px;
				background:url(../../../img/iconall.png) no-repeat -48px 0;
			}
			.top{
				padding:19px 25px 11px;
				line-height:24px;
			}
			.all{
				float:left;
				height:24px;
				padding:0 12px;
				color:#333;
				border:1px solid #bebebe;
				border-radius:3px;
				background-color:#fcfcfc;
				&:hover{
					text-decoration:underline;
				}
			}
			.cate-list{
				line-height:24px;
				border-top:1px solid #e6e6e6;
			}
			.category{
				float:left;
				width:96px;
				padding-top:15px;
				.icon{
					float:left;
					width:24px;
					height:24px;
					margin-left:25px;
					background:url(../../../img/icon.png) no-repeat 0 0;
				}
				.icon-0{
					background-position:-20px -735px;
				}
				.icon-1{
					background-position:0 -61px;
				}
				.icon-2{
					background-position:0 -88px;
				}
				.icon-3{
					background-position:0 -115px;
				}
				.icon-4{
					background-position:0 -140px;
				}
				span{
					float:left;
					margin-left:6px;
					font-weight:700;
					color:#333;
				}
			}
			.subs{
				margin-left:96px;
				padding:15px 0 0 2px;
				border-left:1px solid #e6e6e6;
			}
			.subcate{
				position:relative;
				float:left;
				padding:0 12px;
				&:after{
					position:absolute;
					content:'';
					width:1px;
					height:12px;
					right:0;
					top:6px;
					border-left:1p solid #f1e4da;
					background-color:#dae4f1;
				}
				a{
					color:#333;
					&:hover{
						text-decoration:underline;
					}
				}
			}
		}
		.order{
			float:right;
			a{
				float:left;
				width:46px;
				height:29px;
				line-height:29px;
				text-align:center;
				color:#333;
				box-sizing:border-box;
				border:1px solid #d5d5d5;
				background-color:#fcfcfc;
				&.active{
					color:#fff;
					border-color:#a80909;
					background-color:#d20c0c;
				}
				&:hover{
					text-decoration:underline;
				}
			}
			.hot{
				border-right:none;
			}
			.new{
				border-left:none;
			}
		}
	}
</style>