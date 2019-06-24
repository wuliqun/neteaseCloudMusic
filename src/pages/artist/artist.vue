<template>
	<div id="artist">
		<div class="wrapper clearfix">
			<div class="left">
				<artist-category></artist-category>
			</div>
			<div class="right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import ArtistCategory from './components/artistCategory'
	export default{
		data(){
			return {
				
			}
		},		
		components:{
			ArtistCategory
		}
	}
</script>

<style lang="scss">
	#artist{
		background-color:#f5f5f5;
		.wrapper{
			width:982px;
			margin:0 auto;
			box-sizing:border-box;
			border:solid #e1e1e1;
			border-width:0 1px;
			background-color:#f9f9f9;
		}
		.left{
			float:left;
			width:180px;			
		}
		.right{
			overflow:hidden;
			margin-left:180px;
			padding:20px 40px 40px;
			border-left:1px solid #d3d3d3;
			background-color:#fff;
		}
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
			.more{
				float:right;
				line-height:16px;
				margin-top:14px;
			}
			a:hover{
				text-decoration:underline;
			}
		}
	}
</style>