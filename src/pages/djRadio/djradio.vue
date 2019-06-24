<template>
	<div id="djradio">
		<div class="wrapper">
			<dj-radio-category></dj-radio-category>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import DjRadioCategory from './components/djRadioCategory'
	export default{
		data(){
			return {}
		},
		components:{
			DjRadioCategory
		}
	}
</script>

<style lang="scss" scoped>
	#djradio{
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