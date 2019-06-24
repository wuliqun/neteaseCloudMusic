<template>
	<div id="radio" v-if="radios && radios.length">
		<div class="section-header clearfix">
			<h2 class="title">
				<router-link :to="{name:'discoverDjRadioCategory',query:{id:radios[0].categoryId}}">{{radios[0].category}}</router-link>
				<span>·电台</span>
			</h2>
			<router-link :to="{name:'discoverDjRadioCategory',query:{id:radios[0].categoryId}}" class="more">更多&gt;</router-link>
		</div>
		<ul class="list clearfix">
			<li class="list-item" v-for="n in 4" :key="n">
				<router-link :to="{name:'dj',query:{id:radios[n-1].id}}" class="img">
					<img :src="radios[n-1].picUrl" alt="">
				</router-link>
				<div class="info">
					<h3 class="name">
						<router-link :to="{name:'dj',query:{id:radios[n-1].id}}">
							{{radios[n-1].name}}
						</router-link>
					</h3>
					<p class="desc">
						<span>{{radios[n-1].rcmdtext}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {}
		},
		props:['radios']
	}
</script>

<style lang="scss" scoped>
	#radio{
		margin-top:30px;
		.list{
			margin-right:-30px;
		}
		.list-item{
			float:left;
			width:435px;
			margin:20px 30px 0 0;
			padding-bottom:20px;
			border-bottom:1px solid #e7e7e7;
		}
		.img{
			float:left;
			width:120px;
			height:120px;
			img{
				width:100%;
				height:100%;
			}
		}
		.info{
			margin-left:140px;
			padding-top:15px;
		}
		.name{
			margin-bottom:18px;
			font-size:18px;
			font-weight:700;
			a{
				color:#000;
				&:hover{
					text-decoration:underline;
				}
			}
		}
		.desc{
			color:#999;
		}
	}
</style>