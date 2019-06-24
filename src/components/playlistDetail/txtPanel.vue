<template>
	<div  class="txt-panel">
		<pre v-if="txt.length < 101"><span>{{txt.trim()}}</span></pre>
		<pre v-if="txt.length >= 101 && !spread"><span>{{txt.substr(0,101).trim()}}</span><span class="elli">...</span><a class="spread" @click="toggleSpread">展开<i class="spread-icon"></i></a></pre>
		<pre v-if="txt.length >= 101 && spread"><span>{{txt.trim()}}</span><a class="spread" @click="toggleSpread">收起<i class="fold-icon"></i></a></pre>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				spread:false
			}
		},
		props:['txt'],
		methods:{
			toggleSpread(){
				this.spread = !this.spread;
			}
		}
	}
</script>

<style scoped>
	.txt-panel{
		position:relative;
		padding-bottom:40px;
		line-height:18px;
		color:#666;
	}
	.txt-panel .spread{
		position:absolute;
		height:18px;
		bottom:0;
		right:20px;
		color:#0c73c2;
	}
	.txt-panel .spread:hover{
		text-decoration:underline;
	}
	.txt-panel .spread i{
		display:inline-block;
		width:11px;
		height:8px;
		background:url(../../assets/icon.png) no-repeat 0 0;
	}
	.txt-panel .spread i.spread-icon{
		background-position:-65px -520px;
	}
	.txt-panel .spread i.fold-icon{
		background-position:-45px -520px;
	}
	.txt-panel .elli{
		color:#333;
	}
</style>