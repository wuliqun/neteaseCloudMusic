<template>
	<div id="new-radio">			
		<div class="section-header clearfix">
			<h2 class="title">				
				<span>优秀新电台</span>
			</h2>
		</div>
		<ul class="list clearfix" v-if="newRadios && newRadios.length">
			<li class="list-item" v-for="radio in newRadios" :key="radio.id">
				<router-link class="img" :to="{name:'dj',query:{id:radio.id}}">
					<img :src="radio.picUrl" />
				</router-link>
				<div class="info">
					<p class="name f-thide">
						<router-link :to="{name:'dj',query:{id:radio.id}}" :title="radio.name">
							{{radio.name}}
						</router-link>
					</p>
					<p class="desc">
						<span>{{radio.rcmdtext}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{}
		},
		props:['newRadios']
	}
</script>

<style lang="scss" scoped>
	#new-radio{
		.list{
			margin:16px -37px 0 0;
		}
		.list-item{
			float:left;
			margin-right:37px;
		}
		.img{
			display:block;
			width:150px;
			height:150px;
			img{
				width:100%;
				height:100%;
			}
		}
		.info{
			width:150px;
		}
		.name{
			margin:10px 0 6px 0;
			font-size:14px;
			a{
				color:#333;
				&:hover{
					text-decoration:underline;
				}
			}
		}
		.desc{
			height:32px;
			color:#999;
		}
	}
</style>