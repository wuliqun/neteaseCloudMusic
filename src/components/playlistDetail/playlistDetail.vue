<template>
	<div id="playlist-detail" v-if="playlist">
		<playlist-header :playlist="playlist"></playlist-header>
		<playlist-content 
			:playlist="playlist" 
			:isCreated="isCreated"
			@delTrack="delTrack">			
		</playlist-content>
		<comment type="playlist" :id="playlist.id"></comment>
	</div>
</template>
<script>
	import PlaylistHeader from './playlistHeader'
	import PlaylistContent from './playlistContent'
	import Comment from '@components/comment'
	import {getPlaylistDetail} from 'API/getData'
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				playlist:null,
				isCreate:false,
				name:null,
				id:null
			}
		},
		watch:{
			$route(to,from){
				if(to.name === 'myMusicPlaylist'){
					this.initData();
				}
			}
		},
		components:{
			PlaylistHeader,
			PlaylistContent,
			Comment
		},
		computed:{
			...mapState('userDiyPlaylist',['userDiyPlaylist','userDiyPlaylistNameArr'])
		},
		methods:{
			...mapMutations('userDiyPlaylist',['delUserDiyPlaylistTrack']),
			initData(){
				let id = this.id = this.$route.query.id;
				let name  = this.name= this.$route.query.name;
				if(id){
					this.isCreated = false;
					this.initRemoteData(id);
				}else if(name){
					this.isCreated = true;
					let index = this.userDiyPlaylistNameArr.indexOf(name);
					this.playlist = this.userDiyPlaylist[index];
				}
			},
			initRemoteData(id){
				getPlaylistDetail(id).then(response=>{
					this.playlist = response.data.playlist;
				});
			},
			delTrack(index){
				this.delUserDiyPlaylistTrack({
					name:this.name,
					index
				})
			}
		},
		created(){
			this.initData();			
		}
	}
</script>
<style scoped>
	#playlist-detail{
		padding:43px 30px 30px 35px;
	}
</style>