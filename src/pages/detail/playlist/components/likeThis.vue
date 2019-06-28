<template>
	<div class="like">
		<small-section-title title="喜欢这个歌单的人"></small-section-title>
		<div class="user-list clearfix">
			<router-link
				v-for="user in users"
				:key="user.userId"
				:to="{name:'userHome',query:{id:user.userId}}"
				:title="user.nickname"
				class="user-item">
				<img :src="user.avatarUrl" alt="">
			</router-link>
		</div>
	</div>
</template>
<script>
	import {SmallSectionTitle} from '@components/unit'
	export default{
		props:{
			users:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			SmallSectionTitle
		}
	}
</script>
<style lang="scss" scoped>
	.like{
		.user-list{
			margin:20px -13px -13px 0;
		}
		.user-item{
			float: left;
			width:40px;
			height:40px;
			margin:0 13px 13px 0;
			img{
				width:100%;
				height:100%;
			}
		}
	}
</style>