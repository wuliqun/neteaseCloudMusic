<template>
	<div id="comment-editer">
		<div class="header clearfix">
			<h2>评论</h2>
			<p class="comment-count">共{{commentsLength}}条评论</p>
		</div>
		<div class="input-area clearfix">
			<div class="img">
				<img :src="localUser.avatarUrl" alt="">
			</div>
			<div class="input-wrap">
				<textarea cols="20" rows="10" v-model="comment" placeholder="评论"></textarea>
				<i class="tri"></i>
			</div>
		</div>
		<div class="btn">
			<span :class="{overflow:spare < 0}">{{spare}}</span>
			<a class="submit">评论</a>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				comment:''
			}
		},
		computed:{
			...mapState(['localUser']),
			spare(){
				return 140 - this.comment.length;
			}
		},
		props:['commentsLength']
	}
</script>

<style scoped>
	#comment-editer{
		margin:40px 0 20px;
	}
	#comment-editer .header{
		height:36px;
		line-height:36px;
		border-bottom:2px solid #c20c0c;
	}
	#comment-editer .header h2{
		float:left;
		margin-right:20px;
		color:#333;
		font-size:20px;
	}
	#comment-editer .header .comment-count{
		float:left;
		color:#666;
	}
	#comment-editer .input-area{
		margin-top:30px;
	}
	#comment-editer .input-area .img{
		float:left;
		height:50px;
		width:50px;
	}
	#comment-editer .input-area .img img{
		width:100%;
		height:100%;
	}
	#comment-editer .input-area .input-wrap{
		position:relative;
		margin-left:62px;
	}
	#comment-editer .input-area .input-wrap textarea{
		width:100%;
		height:63px;
		padding:5px;
		box-sizing:border-box;
		border:1px solid #cdcdcd;
	}
	#comment-editer .input-area .input-wrap .tri{
		position:absolute;
		left:-6px;
		top:8px;
		width:7px;
		height:13px;
		background:url(../../img/icon.png) no-repeat -45px -540px;
	}
	#comment-editer .btn{
		margin-top:10px;
		line-height:25px;
		text-align:right;
	}
	#comment-editer .btn span{
		margin-right:10px;
		color:#666;
	}
	#comment-editer .btn .overflow{
		color:#c70c0c;
	}
	#comment-editer .btn .submit{
		display:inline-block;
		width:46px;
		text-align:center;
		color:#fff;
		border-radius:3px;
		background-color:#2374c2;
	}
	#comment-editer .btn .submit:hover{
		background-color:#3c8edc;
	}
</style>