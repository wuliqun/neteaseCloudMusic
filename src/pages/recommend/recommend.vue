<template>
	<div id="recommend">
		<banner></banner>
		<div class="wrapper clearfix">
			<div class="left-zone">
				<div class="left-zone-wrapper">
					<recommend-list></recommend-list>
					<album-list></album-list>
					<top-list></top-list>
				</div>
			</div>
			<div class="right-zone">
				<user-info></user-info>
				<singer-list></singer-list>
				<dj-list></dj-list>
			</div>
		</div>
		<to-top></to-top>
	</div>
</template>

<script>
	import Banner from '@components/banner'
    import ToTop from '@components/toTop'
    import RecommendList from './components/recommendList'
    import AlbumList from './components/albumList'
    import TopList from './components/topList'
	import UserInfo from './components/userInfo'
	import SingerList from './components/singerList'
	import DjList from './components/djList'
	export default{
		data(){
			return {}
		},
		components:{
            Banner,
            ToTop,
            RecommendList,
            AlbumList,
            TopList,
			UserInfo,
			SingerList,
			DjList
		}
	}
</script>

<style>
	#recommend{
		background-color:#f5f5f5;
	}
	#recommend .wrapper{
		width:980px;
		margin:0 auto;
		border:solid #d4d4d4;
		border-width:0 1px;
		background-color:#fff;
	}
	#recommend .left-zone{
		float:left;
		padding:20px 20px 35px;
		border-right:1px solid #d4d4d4;
	}
	#recommend .left-zone-wrapper{
		width:689px;
	}
	#recommend .right-zone{
		float:right;
    }
</style>