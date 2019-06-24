<template>
	<div>
		<signed-list></signed-list>
		<artist-list></artist-list>
	</div>
</template>

<script>
	import SignedList from './signedList'
	import ArtistList from './artistList'
	export default{
		data(){
			return {
			}
		},
		components:{
			SignedList,
			ArtistList
		}
	}
</script>