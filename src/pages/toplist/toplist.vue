<template>
	<div id="toplist" v-if="toplist">
		<div class="wrapper clearfix">
			<div class="cates">
				<toplist-list 
					:toplist="toplist"
					:current-index="currentIndex"
					@changeIndex="changeIndex"></toplist-list>
			</div>
			<div class="detail">
				<toplist-detail
					:id="currentId"></toplist-detail>
			</div>
		</div>
	</div>
</template>

<script>
	import ToplistList from './components/toplistList'
	import ToplistDetail from './components/ToplistDetail'
	import {getToplist} from 'API/getData'
	export default{
		data(){
			return {
				toplist:null,
				currentIndex:0
			}
		},
		components:{
			ToplistList,
			ToplistDetail
		},
		computed:{
			currentId(){
				if(this.toplist){
					return this.toplist[this.currentIndex].id;
				}
			}
		},
		methods:{			
			initData(){
				var id = Number(this.$route.query.id);
				if(!this.toplist){
					getToplist().then(res=>{
						this.toplist = res.data.list;
						if(id){
							console.log(this)
							for(var i=0;i<this.toplist.length;i++){
								if(id === this.toplist[i].id){
									this.currentIndex = i;
									break;
								}
							}
						}
					})
				}
			},
			changeIndex(index){
				this.currentIndex = index;
				this.$router.push({
					name:'discoverToplist',
					query:{
						id:this.toplist[index].id
					}
				})
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style lang="scss" scoped>
	#toplist{
		background-color:#f5f5f5;
		.wrapper{
			width:980px;
			margin:0 auto;
			border:solid #d3d3d3;
			border-width:0 1px;
			background-color:#fff;
		}
		.cates{
			float:left;
			width:240px;
			background-color:#f9f9f9;	
		}
		.detail{
			margin-left:240px;
			border-left:1px solid #d3d3d3;
		}
	}
</style>