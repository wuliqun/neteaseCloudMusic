<template>
	<div id="comment" v-if="id">
		<div v-if="commentData">
			<comment-editor :commentsLength="commentData.total"></comment-editor>
			<comment-list :commentData="commentData"></comment-list>
			<pagination @page="page" v-if="commentData.total > 20" v-bind="pageInfo"></pagination>
		</div>
	</div>
</template>

<script>
	import {getComment} from 'API/getData'
	import CommentEditor from './commentEditor'
	import CommentList from './commentList'
	import Pagination from '@components/pagination'
	export default{
		data(){
			return {
				index:1,
				commentData:null
			}
		},
		components:{
			CommentEditor,
			CommentList,
			Pagination
		},
		computed:{
			pageInfo(){
				let total = this.commentData.total;
				return {
					total:total,
					countPerPage:20,
					indexCount:9,
					currentIndex:this.index
				}
			}
		},
		watch:{
			id(value){
				this.index = 1;
			}
		},
		methods:{
			page(index){
				this.index = index;
				this.commentData = null;
				this.getCommentData();
			},
			initData(){
				if(this.id){
					this.getCommentData();
				}				
			},
			getCommentData(){
				getComment({
					type:this.type,
					id:this.id,
					offset:(this.index-1)*20
				}).then(response=>{
					this.commentData = response.data;
				});
			}
		},
		props:['type','id'],
		created(){
			this.initData();
		}
	}
</script>