<template>
	<div id="radio-rank">
		<div class="section-header clearfix">
			<h2 class="title">				
				<span>电台排行榜</span>
			</h2>
		</div>
		<ul class="list clearfix">
			<li class="list-item" v-for="radio in radioRanks" :key="radio.id">
				<router-link :to="{name:'dj',query:{id:radio.id}}" class="img">
					<img :src="radio.picUrl" alt="">
				</router-link>
				<div class="info">
					<h3 class="name">
						<router-link :to="{name:'dj',query:{id:radio.id}}">
							{{radio.name}}
						</router-link>
					</h3>
					<p class="dj">
						<i class="user-ico"></i>
						<router-link :to="{name:'userHome',query:{id:radio.dj.userId}}">{{radio.dj.nickname}}</router-link>
					</p>
					<p class="desc">
						<span class="program-count">共{{radio.programCount}}期</span>
						<span class="subscribe-count">订阅{{radio.subCount}}次</span>
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
		props:['radioRanks']
	}
</script>

<style lang="scss" scoped>
	#radio-rank{
		margin-top:25px;
		.list{
			margin-right:-30px;
		}
		.list-item{
			float:left;
			width:435px;
			margin:20px 30px 0 0;
			padding-bottom:20px;
			border-bottom:1px solid #e7e7e7;
			a:hover{
				text-decoration:underline;
			}
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
			font-size:18px;
			font-weight:700;
			a{
				color:#000;				
			}
		}
		.dj{
			margin:15px 0 10px;
			a{
				margin-left:5px;
				color:#333;
			}
			.user-ico{
				float:left;
				width:14px;
				height:14px;
				margin-top:2px;
				background:url(../../../../img/icon.png) no-repeat -50px -300px;
			}
		}
		.desc{
			color:#999;
		}
		.subscribe-count{
			margin-left:6px;
		}
	}
</style>