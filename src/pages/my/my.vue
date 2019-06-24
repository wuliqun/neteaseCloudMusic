<template>
	<div id="my-music">
		<div class="wrapper">
			<div class="left">
				<song-sheet-list></song-sheet-list>
			</div>
			<div class="right">
				<router-view></router-view>
			</div>			
		</div>
	</div>	
</template>
<script>
	import SongSheetList from './components/songSheetList'
	export default{
		data(){
			return {

			}
		},
		components:{
			SongSheetList
		}
	}
</script>

<style scoped>
	#my-music{
		position:fixed;
		width:100%;
		bottom:0;
		top:75px;
		background-color:#f5f5f5;
	}
	#my-music .wrapper{
		width:982px;
		height:100%;
		margin:0 auto;
	}
	#my-music .left{
		float:left;
		overflow-x:hidden;
		overflow-y:auto;
		width:240px;
		height:100%;
		border:solid #e3e3e3;
		border-width:0 1px;
		background-color:#f9f9f9;
	}
	#my-music .right{
		height:100%;
		margin-left:240px;
		border-right:1px solid #e3e3e3;
		overflow-x:hidden;
		overflow-y:auto;
		background-color:#ffffff;
	}
	#my-music .left::-webkit-scrollbar,#my-music .right::-webkit-scrollbar{
		width:6px;
		background-color:#f1f1f1;
	}
	#my-music .left::-webkit-scrollbar-thumb,#my-music .right::-webkit-scrollbar-thumb{
		border-radius:6px;
		background-color:#a8a8a8;
	}
</style>