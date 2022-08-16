<template>
	<div id="header-search">
		<form action="">
			<div class="input-wrap">
				<i class="topbar-icon search-icon"></i>
				<input 
					type="text" 
					name="keyword" 
					v-model="keyword" 
					placeholder="音乐/视频/电台/用户" 
					autocomplete="off"
					ref="keyinput"
					@focus="focus" 
					@blur="blur" 
					@input="getSearchTip" 
					@keydown.enter="search">
			</div>
			<div class="tip" v-if="searchTip">
				<div class="search-user">
					<a>搜索"{{keyword}}"相关用户</a>>
				</div>
				<div class="search-result">
					<div class="item" v-for="key in searchResult.order" :key="key">
						<div class="left">
							<i class="icon" :class="'icon-'+key"></i>
							<span class="txt">{{key | key2name}}</span>
						</div>
						<ul class="right">
							<li v-for="item in searchResult[key]" :key="item.id">
								<router-link 
									v-html="nameFilter(item.name,keyword)"
									:to="{name:key.slice(0,key.length-1),query:{id:item.id}}"
									class="item-link f-thide"
									:title="item.name">
								</router-link>
							</li>
						</ul>
					</div>						
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import {search} from 'API/getData'
	export default{
		data(){
			return{
				keyword:'',
				showTip:false,
				searchResult:null,
				timer:null  //搜索函数防抖定时器
			}
		},
		methods:{
			getSearchTip(){
				if(this.timer){
					clearTimeout(this.timer);
				}
				// 函数防抖
				this.timer = setTimeout(()=>{
					let keyword = this.keyword.trim();
					if(keyword){
						search(keyword).then(response=>{
							this.searchResult = response.data.result;
						});
					}
				},300);
			},
			focus(){
				this.showTip = true;
			},
			blur(){
				setTimeout(()=>{
					this.showTip = false;
				},300);
			},
			nameFilter(name,keyword){
				return name.replace(keyword,keyword=>{
					return '<em>' + keyword + '</em>';
				});
			},
			search(e){
				e.preventDefault();
				this.$refs.keyinput.blur();
				// 搜索框回车
				let keyword = this.keyword.trim();
				if(keyword){
					this.$router.push({
						name:'search',
						query:{
							s:keyword
						}
					});
				}		
			}
		},
		computed:{
			searchTip(){
				return this.keyword && this.searchResult && this.showTip;
			}
		},
		filters:{
			key2name(key){
				var o = {
					songs:'单曲',
      				albums:'专辑',
      				artists:'歌手',
      				mvs:'视频',
      				playlists:'歌单'
				};
				return o[key];
			}			
		}
	}
</script>

<style lang="scss" scoped>	
	#header-search{
		position:relative;
		line-height:14px;
		.input-wrap{
			width:158px;
			height:32px;
			border-radius:16px;
			background-color:#fff;
		}
		.search-icon{
			float:left;
			height:14px;
			width:13px;
			margin:10px 9px;
			background-position:-10px -108px;
		}
		input{
			float:left;
			height:32px;
			width:125px;
			background-color:transparent;
		}
		.tip{
			position:absolute;
			z-index:5;
			left:0;
			top:40px;
			width:238px;
			border:1px solid #bebebe;
			border-radius:3px;
			box-shadow:0 0 5px #999;
			background-color:#fff;
		}
		.search-user{
			padding:13px 0 12px 10px;
			border-bottom:1px solid #e2e2e2;
			a{
				color:#666;
				&:hover{
					background-color:#e3e5e7;
				}
			}
		}
		.left{
			float:left;
			width:62px;
			padding-top:12px;
			.txt{
				color:#333;
			}		
		}
		.icon{
			float:left;
			width:14px;
			height:14px;
			margin:0 4px 0 10px;
			background:url(../../img/icon.png) no-repeat 0 0;
		}
		.icon-songs{
			background-position:-35px -300px;
		}
		.icon-artists{
			background-position:-50px -300px;
		}
		.icon-playlists{
			background-position:-50px -320px;
		}
		.icon-albums{
			background-position:-35px -320px;
		}
		.icon-mvs{
			background-position:-60px -860px;
		}
		.item:nth-child(2n) .right{
			background-color:#f9f8f8;
		}
		.right{
			overflow:hidden;
			margin-left:62px;
			border-left:1px solid #e2e2e2;
			border-top:1px solid #e2e2e2;
			li{
				margin:5px 0;
			}
		}
		.item-link{
			display:block;
			line-height:24px;
			text-indent:12px;
			color:#000;
			&:hover{
				background-color:#e3e5e7;
			}
		}
		.item-link em{
			color:#0c73c2;
		}
	}
</style>