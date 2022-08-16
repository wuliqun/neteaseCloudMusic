<template>
	<div id="playlist">
		<div class="wrapper">
			<playlist-header :order="order" :cat="cat"></playlist-header>
			<playlist-container :playlist="playlist.playlists" v-if="playlist"></playlist-container>
			<pagination v-if="playlist" :total="playlist.total" :countPerPage="limit" :currentIndex="index" indexCount="9" @page="page"></pagination>
		</div>
	</div>
</template>

<script>
	import Pagination from '@components/pagination'
	import PlaylistHeader from './components/playlistHeader'
	import PlaylistContainer from './components/playlistContainer'
	import {getPlaylst} from 'API/getData'
	export default{
		data(){
			return {
				order:null,
				cat:null,
				limit:35,
				index:1,
				playlist:null
			}
		},
		watch:{
			$route(to,from){
				if(to.name === 'discoverPlaylist'){
					if(from.query.cat !== to.query.cat || from.query.order !== to.query.order){
						this.index = 1;
					}
					this.initData();
				}
			}
		},
		components:{
			Pagination,
			PlaylistHeader,
			PlaylistContainer
		},
		computed:{
		},
		methods:{
			initData(){
				let order = this.$route.query.order;
				let cat = this.$route.query.cat;
				this.order = order || 'hot';
				this.cat = cat || '';
				getPlaylst({
					cat:this.cat,
					order:this.order,
					limit:this.limit,
					offset:(this.index - 1)*this.limit
				}).then(response=>{
					this.playlist = response.data;
				});
			},
			page(index){
				this.index = index;
				this.initData();
			}
		},
		created(){			
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#playlist{
		background-color:#f5f5f5;
		.wrapper{
			width:982px;
			margin:0 auto;
			padding:40px;
			box-sizing:border-box;
			border:solid #e1e1e1;
			border-width:0 1px;
			background-color:#fff;
		}
	}
</style>