<template>
	<div id="blank">
		<div class="description">
			<div class="img">
				<img src="../../assets/blank.png" alt="">
			</div>
			<div class="txt">
				<p>还没有创建或收藏歌单哦~~，去<router-link :to="{name:'index'}">发现音乐</router-link></p>
			</div>
		</div>
	</div>	
</template>
<script>
	export default{
		data(){
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	#blank{
		padding:70px 100px 0;
		text-align:center;
		.img{
			height:200px;
			img{
				height:100%;
			}
		}
		.txt{
			margin-top:20px;
			font-size:20px;
			color:#666;
			a{
				color:#c00;
				&:hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>