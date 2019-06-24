<template>
	<div id="toplist-cate">
		<div class="cate">
			<div class="title">
				<h3>云音乐特色榜</h3>
			</div>
			<ul class="list">
				<li v-for="n in 4" @click="setCurrent(n-1)" :key="n">
					<a 
                        class="list-item clearfix" 
                        :class="{active:currentIndex == n-1}">
						<div class="img">
							<img :src="toplist[n-1].coverImgUrl" alt="">
						</div>
						<div class="info">
							<p class="name f-thide">{{toplist[n-1].name}}</p>
							<p class="uf">{{toplist[n-1].updateFrequency}}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		<div class="cate">
			<div class="title">
				<h3>全球媒体榜</h3>
			</div>
			<ul class="list">
				<li v-for="n in (toplist.length - 4)" @click="setCurrent(n+3)" :key="n">
					<a 
                        class="list-item clearfix"  
                        :class="{active:currentIndex == n+3}">
						<div class="img">
							<img :src="toplist[n+3].coverImgUrl" alt="">
						</div>
						<div class="info">
							<p class="name f-thide">{{toplist[n+3].name}}</p>
							<p class="uf">{{toplist[n+3].updateFrequency}}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
			}
        },
        watch:{
            currentIndex(val){
                console.log(val)
            }
        },
		props:['toplist','currentIndex'],
		methods:{
			setCurrent(index){
				this.$emit('changeIndex',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#toplist-cate{
		padding-top:20px;
		.cate{
			margin-top:6px;
		}
		.title{
			margin-left:15px;
			line-height:44px;
			h3{
				font-size:14px;
				font-weight:700;
				color:#333;
			}
		}
		.list-item{
			display:block;
			padding:10px 20px;
			&:hover,&.active{
				background-color:#e1e1e1;
			}
		}
		.img{
			float:left;
			width:40px;
			height:40px;
			img{
				width:100%;
				height:100%;
			}
		}
		.info{
			margin-left:50px;
			line-height:17px;
		}
		.name{
			color:#000;
			margin-bottom:6px;
		}
		.uf{
			color:#999;
		}
	}
</style>