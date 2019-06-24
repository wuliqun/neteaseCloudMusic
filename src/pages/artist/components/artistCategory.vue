<template>
	<div id="cate">
		<dl class="list">
			<dt class="item-title">推荐</dt>
			<dd class="item"  :class="{active:currentCate == 'index'}">
				<span class="dot"></span>
				<router-link :to="{name:'discoverSingerIndex'}">推荐歌手</router-link>
			</dd>
			<dd class="item"  :class="{active:currentCate == 'signed'}">
				<span class="dot"></span>
				<router-link :to="{name:'discoverSingerSigned'}">入驻歌手</router-link>
			</dd>			
		</dl>
		<dl class="list" v-for="cateGroup in artistCates" :key="cateGroup.id">
			<dt class="item-title">{{cateGroup.groupName}}</dt>
			<dd 
				class="item" 
				v-for="cate in cateGroup.subCates"  
				:class="{active:currentCate == cate.categoryId}" 
				:key="cate.id">
				<span class="dot"></span>
				<router-link :to="{name:'discoverSingerCategory',query:{id:cate.categoryId}}">{{cate.categoryName}}</router-link>
			</dd>
		</dl>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				rawCate:[,'华语','欧美',,'其他',,'日本','韩国'],
				cateOrder:[1,2,6,7,4],
				concatStr:['男歌手','女歌手','组合/乐队'],
				artistCates:null
			}
		},
		methods:{
			initData(){
				let cates = [];
				for(let index of this.cateOrder){
					let cate = {
						groupName:'',
						subCates:[]
					};
					cate.groupName = this.rawCate[index];
					for(let i = 0;i<this.concatStr.length;i++){
						cate.subCates.push({
							categoryName:this.rawCate[index] + this.concatStr[i],
							categoryId:index*1000 + i + 1
						});
					}
					cates.push(cate);
				}
				this.artistCates = cates;
			}
		},
		computed:{
			currentCate(){
				if(this.$route.name === 'discoverSingerCategory'){
					return this.$route.query.id || 1001;
				}else{
					if(this.$route.name === 'discoverSingerSigned'){
						return 'signed';
					}else{
						return 'index';
					}
				}
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#cate{
		padding:10px 10px 48px; 
		.list{
			margin-top:14px;
			padding-bottom:9px;
			border-bottom:1px solid #d3d3d3;
		}
		.item-title{
			margin-left:14px;
			line-height:28px;
			font-size:16px;
			font-weight:700;
			color:#333;
		}
		.item{
			height:29px;
			line-height:29px;
			box-sizing:border-box;
			text-indent:13px;
			a{
				color:#333;
			}
			a:hover{
				text-decoration:underline;
			}
			.dot{
				float:left;
				width:4px;
				height:4px;
				margin:12px 0 0 13px;
				background-color:#666;
			}
			&.active{
				border:1px solid #d3d3d3;
				border-radius:4px;
				a{
					color:#c20c0c;
				}
				.dot{
					margin-left:12px;
					background-color:#c20c0c;
				}
			}
		}
	}
</style>