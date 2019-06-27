<template>
	<div id="comment-list" v-if="commentData">
		<div class="hot-comments" v-if="commentData.hotComments && commentData.hotComments.length > 0">
			<div class="header">
				<h3>精彩评论</h3>
			</div>
			<ul class="comments">
				<li v-for="comment in commentData.hotComments" class="comment-item clearfix" :key="comment.id">
					<div class="img">
						<router-link :to="{name:'userHome',query:{id:comment.user.userId}}">
							<img :src="comment.user.avatarUrl" alt="">
						</router-link>
					</div>
					<div class="comment-wraper">
						<div class="comment-content">
							<p class="comment-txt">
								<router-link :to="{name:'userHome',query:{id:comment.user.userId}}" class="name">
									{{comment.user.nickname}}
								</router-link>:
								<span>{{comment.content}}</span>
							</p>
							<div class="reply-comment" v-if="comment.beReplied.length > 0">
								<p class="comment-txt" v-for="reply in comment.beReplied" :key="reply.id">
									<router-link :to="{name:'userHome',query:{id:reply.user.userId}}" class="name">
										{{reply.user.nickname}}
									</router-link>:
									<span>{{reply.content}}</span>
								</p>
							</div>
						</div>
						<div class="operate clearfix">
							<span class="time">{{comment.time | time2str}}</span>
							<div class="zan-rp">
								<a class="zan">
									<i class="icon-zan"></i>
									<span v-if="comment.likeCount > 0">({{comment.likeCount}})</span>
								</a>
								<span class="sep">|</span>
								<a class="reply">回复</a>
							</div>				
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="new-comments">
			<div class="header" v-if="commentData.comments && commentData.comments.length > 0">
				<h3>最新评论({{commentData.total}})</h3>
			</div>
			<ul class="comments">
				<li v-for="comment in commentData.comments" class="comment-item clearfix" :key="comment.id">
					<div class="img">
						<router-link :to="{name:'userHome',query:{id:comment.user.userId}}">
							<img :src="comment.user.avatarUrl" alt="">
						</router-link>
					</div>
					<div class="comment-wraper">
						<div class="comment-content">
							<p class="comment-txt">
								<router-link :to="{name:'userHome',query:{id:comment.user.userId}}" class="name">
									{{comment.user.nickname}}
								</router-link>:
								<span>{{comment.content}}</span>
							</p>
							<div class="reply-comment" v-if="comment.beReplied.length > 0">
								<p class="comment-txt" v-for="reply in comment.beReplied" :key="reply.id">
									<router-link :to="{name:'userHome',query:{id:reply.user.userId}}" class="name">
										{{reply.user.nickname}}
									</router-link>:
									<span>{{reply.content}}</span>
								</p>
								<i class="tri"></i>
							</div>
						</div>
						<div class="operate clearfix">
							<span class="time">{{comment.time | time2str}}</span>
							<div class="zan-rp">
								<a class="zan">
									<i class="icon-zan"></i>
									<span v-if="comment.likeCount > 0">({{comment.likeCount}})</span>
								</a>
								<span class="sep">|</span>
								<a class="reply">回复</a>
							</div>				
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
			}
		},
		methods:{
		},
		filters:{
			time2str(time){
				let now = new Date();
				let timelong = now.getTime() - time;
				if(timelong < 1000*60*60){ //评论时间距现在少于1小时
					return Math.round(timelong/(1000*60)) + '分钟前';
				}
				let date = new Date(time);
				let year = date.getFullYear();
				let mon = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				let min = date.getMinutes();
				hour = hour>9?''+hour:'0' +hour;//转成字符串 
				min = min>9?''+min:'0' +min;
				let nowYear = now.getFullYear();
				let nowMon = now.getMonth() + 1;
				let nowDay = now.getDate();
				if(year == nowYear){
					if(mon == nowMon){
						if(day == nowDay){ //同一天，仅显示小时分钟
							return hour + ':' + min;
						}else if(nowDay - day == 1){//昨天逻辑
							return '昨天' + hour + ':' + min;
						}
					}else if(nowMon - mon == 1 && nowDay == 1 && now.setDate(0).getDate() == day){//今天是1号，昨天逻辑
						return '昨天' + hour + ':' + min;
					}else{
						return mon + '月' + day + '日 ' + hour + ':' + min;
					}
				}else{
					return year + '年' +mon + '月' + day + '日 ' + hour + ':' + min;
				}

			}
		},
		props:['commentData']
	}
</script>

<style scoped>
	#comment-list{

	}
	#comment-list .header{
		height:20px;
		padding-bottom:2px;
		line-height:20px;		
		border-bottom:1px solid #999;
	}
	#comment-list .header h3{
		font-weight:700;
		color:#000;
	}
	#comment-list .comments{
		margin-bottom:15px;
	}
	#comment-list .comment-item{
		padding:15px 0;
		border-bottom:1px dashed #ccc;
	}
	#comment-list .comment-item:last-child{
		border:none;
	}
	#comment-list .comment-item .img{
		float:left;
		width:50px;
		height:50px;
	}
	#comment-list .comment-item .img a{
		display:block;
		height:100%;
	}
	#comment-list .comment-item .img img{
		width:100%;
		height:100%;
	}
	#comment-list .comment-wraper{
		margin-left:60px;
	}
	#comment-list .comment-txt{
		line-height:20px;
	}
	#comment-list .comment-txt .name{
		color:#0c73c2;
	}
	#comment-list .comment-txt .name:hover{
		text-decoration:underline;
	}
	#comment-list .operate{
		height:16px;
		margin-top:15px;
		line-height:16px;
	}
	#comment-list .operate .time{
		float:left;
		color:#999;
	}
	#comment-list .operate .zan-rp{
		float:right;
	}
	#comment-list .operate .zan-rp .sep{
		float:left;
		margin:0 5px;
		color:#999;
	}
	#comment-list .operate .zan-rp a{
		float:left;
		color:#666;
	}
	#comment-list .operate .zan-rp a:hover{
		text-decoration:underline;
	}
	#comment-list .operate .icon-zan{
		display:inline-block;
		width:12px;
		height:12px;
		margin-top:2px;
		background:url(../../assets/icon.png) no-repeat -37px -680px;
	}
	#comment-list .reply-comment{
		position:relative;
		margin-top:10px;
		padding:8px 26px 8px 15px;
		line-height:20px;
		border:1px solid #dedede;
		background-color:#f4f4f4;
	}
	#comment-list .reply-comment .tri{
		position:absolute;
		top:-4px;
		left:18px;
		width:8px;
		height:4px;
		background:url(../../assets/icon.png) no-repeat 0 -556px;
	}
</style>