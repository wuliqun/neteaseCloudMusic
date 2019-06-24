<template>
	<div id="pagination">
		<ul class="pages-container clearfix">
			<li class="page-index prev" :class="{disabled:currentIndex == 1}" @click="go(-1)">
				<a>上一页</a>
			</li>
			<li 
                class="page-index" 
                v-for="n in showIndexes"
                :class="{active:n == currentIndex,sep:n == '...'}" 
                @click="page(n)"
                :key="n">
				<a>{{n}}</a>
			</li>
			<li class="page-index next" :class="{disabled:currentIndex == pagesCount}" @click="go(1)">
				<a>下一页</a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {
			}
		},
		methods:{
			go(step){
				let index = this.currentIndex + step;
				if(index == 0 || index > this.pagesCount){
					return;
				}
				this.page(index);
			},
			page(index){
				index = parseInt(index);
				if(!index || index == this.currentIndex){
					return;
				}
				//向上传递事件
				this.$emit('page',index);
			}
		},
		computed:{
			pagesCount(){
				return Math.ceil(this.total/this.countPerPage);
			},
			showIndexes(){ //页面上展示的页码，页码太多中间显示... ,逻辑不清，以后修改
				let result;
				if(this.pagesCount <= this.indexCount){ //总页数不足9页，全部显示
					result = Array.from('123456789').splice(0,this.pagesCount);
				}else{
					if(this.currentIndex <= 5){
						result = [1,2,3,4,5,6,7,8,'...',this.pagesCount];
					}else if(this.currentIndex > this.pagesCount - 5){
						result = [1,'...',this.pagesCount-7,this.pagesCount-6,this.pagesCount-5,this.pagesCount-4,this.pagesCount-3,this.pagesCount-2,this.pagesCount-1,this.pagesCount];
					}else{
						result = [1,'...'];
						for(let i = 0;i<7;i++){
							result.push(this.currentIndex - 3 + i);
						}
						result.push('...');
						result.push(this.pagesCount);
					}
				}
				return result;
			}
		},
		props:['total','countPerPage','indexCount','currentIndex'], //外部对象
	}
</script>

<style lang="scss" scoped>
	#pagination{
		margin:20px 0;
		text-align:center;
		.pages-container{
			display:inline-block;
			margin-right:-3px;
		}
		.page-index{
			float:left;
			margin-right:3px;
			a{
				display:block;
				line-height:22px;
				padding:0 8px;
				border:1px solid #ccc;
				color:#666;
				&:hover{
					border-color:#666;
				}
			}
			&.active a{
				color:#fff;
				background-color:#f11e24;
				&:hover{
					border-color:#ccc;
					cursor:default;					
				}
			}
			&.sep{
				a{
					padding:0;
					border:none;
					cursor:default;
				}
			}
		}
		%prev-next{
			width:69px;
			height:24px;
			text-align:center;
			background:url(../../assets/button.png) no-repeat 0 0;
			a{
				line-height:24px;
				padding:0;
				border:none;
				color:#333;
			}
			&.disabled{
				a{
					cursor:default;
					color:#d1cad1;
				}
			}
		}
		.prev{
			@extend %prev-next;
			text-indent:5px;
			background-position:0 -560px;
			&:hover{
				background-position:0 -590px;
			}
			&.disabled{
				background-position:0 -620px;
			}
		}
		.next{
			@extend %prev-next;
			text-indent:-5px;
			background-position:-75px -560px;
			&:hover{
				background-position:-75px -590px;
			}
			&.disabled{
				background-position:-75px -620px;
			}
		}
	}
</style>
