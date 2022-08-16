<template>
	<div id="album">
		<div class="wrapper">
			<album-list :albums="newAlbums" v-if="newAlbums">
				<h2 class="title">
					<span>热门新碟</span>
				</h2>
			</album-list>
			<album-list :albums="albumData.albums" v-if="albumData">
				<h2 class="title">
					<span>全部新碟</span>
				</h2>
				<ul class="sublinks">
				</ul>
			</album-list>
			<pagination 
				@page="page" 
				:total="albumData.total" 
				:countPerPage="limit" 
				:indexCount="9" 
				:currentIndex="index" 
				v-if="albumData && albumData.total>limit">
			</pagination>
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	import {getAlbums} from 'API/getData'
	import AlbumList from './components/albumList'
	import Pagination from '@components/pagination'
	export default{
		data(){
			return {
				albumData:null,
				limit:30, //每页30个
				index:1  //当前页码
			}
		},
		components:{
			AlbumList,
			Pagination
		},
		computed:{
			...mapState('album',['newAlbums'])
		},
		methods:{
			...mapActions('album',['initNewAlbums']),
			initData(){
				getAlbums({
					offset:(this.index-1)*this.limit,
					limit:this.limit
				}).then(response=>{
					this.albumData = response.data;
				});
			},
			initNewAlbumsData(){
				if(!this.newAlbums){
					this.initNewAlbums();
				}
			},
			page(index){
				this.index = index;
				this.initData();
			}
		},
		created(){
			this.initNewAlbumsData();
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#album{
		background-color:#f5f5f5;
		.wrapper{
			width:982px;
			margin:0 auto;
			padding:2px 40px 40px;
			box-sizing:border-box;
			border:solid #e1e1e1;
			border-width:0 1px;
			background-color:#fff;
		}		
	}
</style>