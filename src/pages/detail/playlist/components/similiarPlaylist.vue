<template>
	<div class="similiar">
		<small-section-title title="相似歌单"></small-section-title>
		<div class="playlist clearfix">
			<router-link
				v-for="playlist in playlists"
				:key="playlist.id"
				:to="{name:'playlist',query:{id:playlist.id}}"
				:title="playlist.name"
				class="playlist-item">
				<img :src="playlist.coverUrl" alt="">
			</router-link>
		</div>
	</div>
</template>
<script>
	import {SmallSectionTitle} from '@components/unit'
	export default{
		props:{
			playlists:{
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
			img{
				width:100%;
				height:100%;
			}
		}
	}
</style>