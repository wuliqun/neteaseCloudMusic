<template>
	<div id="toplist-detail" v-if="toplistData">
		<list-header :playlist="toplistData"></list-header>
		<song-list :playlist="toplistData"></song-list>
		<comment type="playlist" :id="toplistData.id"></comment>
	</div>
</template>
<script>
	import ListHeader from './listHeader'
	import SongList from './songList'
	import Comment from '@components/comment'
	import {getPlaylistDetail} from 'API/getData'
	export default{
		data(){
			return {
				toplistData:null
			}
		},
		props:{
            id:Number
        },
        watch:{
            id(val){
                this.initData();
            }
        },
		components:{
			ListHeader,
			SongList,
			Comment
		},
		computed:{
		},
		methods:{
			async initData(){
				await getPlaylistDetail(this.id).then(response=>{
                    this.toplistData = response.data.playlist;
				});
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#toplist-detail{
		padding:40px 30px 0 39px;
	}
</style>