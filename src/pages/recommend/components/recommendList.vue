<template>
	<div id="recommend-list" v-if="recommendList">
		<section-title
            name="热门推荐"
            router-name="discoverPlaylist"
            :sublinks="tags"
            sublink-router-name="playlist">
        </section-title>
		<ul class="song-list clearfix">
			<li class="recommend-song" v-for="item in recommendList" :key="item.id">
				<div class="img-link">
					<router-link :to="{name:'playlist',query:{id:item.id}}" :title="item.name" class="link">
						<img :src="item.picUrl" alt="">
					</router-link>
					<div class="bottom">
						<div class="play-count">
							<i class="icon"></i>
							<i class="count">{{item.playCount | count2str}}</i>
						</div>
						<div class="play">
							<a  @click="addToPlaylist(item.id)"></a>
						</div>
					</div>
				</div>
				<router-link class="description" :title="item.name" :to="{name:'playlist',query:{id:item.id}}">
					{{item.name}}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
    import {getHotRecommend,getHotPlaylistCategory} from '@service/getData'
	import SectionTitle from '@components/sectionTitle'
	import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				recommendList:null,
				tags:[]
			}
		},
		methods:{
			...mapActions('playlist',['insertListIntoPlaylistById']),
			initData(){
				getHotRecommend().then(response=>{
					this.recommendList = response.data.result.splice(0,8);
				});
				getHotPlaylistCategory().then(response=>{
					this.tags = this.formatTags(response.data.tags,5);
				});
			},
			async addToPlaylist(id){
				await this.insertListIntoPlaylistById(id);
				this.$message.playerMessage('已开始播放');
            },
            formatTags(tags,n){
                var res = []
                for(var i=0;i<n;i++){
                    var tag = tags[i]
                    res.push({
                        id:tag.id,
                        name:tag.name
                    })
                }
                return res
            }
		},
		filters:{
			count2str(n){
				if(n < 10000){
                    return '' + n;
                }else{
                    var s =  (n/10000).toFixed(1) + '万';
                    if(s.length >=6){
                        s = s.split('.')[0] + '万'
                    }
                    return s;
                }
			}
		},
		created(){
			this.initData();
        },
        components:{
            SectionTitle
        }
	}
</script>

<style scoped>
	#recommend-list{
		width:689px; 
	}
	#recommend-list .song-list{
		margin:20px -42px 0 0;
	}
	#recommend-list .recommend-song{
		float:left;
		width:140px;
		margin:0 42px 30px 0;
	}
	#recommend-list .img-link{
		position:relative;
	}
	#recommend-list .img-link .link{
		display:block;
		width:140px;
		height:140px;
	}
	#recommend-list .img-link .link img{
		width:100%;
		height:100%;
	}
	#recommend-list .bottom{
		position:absolute;
		width:100%;
		height:27px;
		bottom:0;
		background-color:rgba(0,0,0,.3);
	}
	#recommend-list .bottom .play-count{
		float:left;
	}
	#recommend-list .bottom .play-count .count{
		margin-left:5px;
		line-height:27px;
		color:#ccc;
	}
	#recommend-list .bottom .play-count .icon{
		float:left;
		width:14px;
		height:11px;
		margin:9px 0 0 10px;
		background:url(../../../assets/iconall.png) no-repeat 0 -24px;
	}
	#recommend-list .bottom .play{
		float:right;
		margin:5px 8px 0 0;
	}
	#recommend-list .bottom .play a{
		display:block;
		width:16px;
		height:17px;
		background:url('../../../assets/iconall.png') no-repeat 0 0;
	}
	#recommend-list .bottom .play a:hover{
		background-position:0 -60px;
	}
	#recommend-list .description{
		display:block;
		height:54px;
		overflow:hidden;
		margin-top:8px;
		color:#333;
		font-size:14px;
		line-height:18px;
	}
	#recommend-list .description i{
		float:left;
		height:17px;
		margin-right:5px;
		background:url(../../../assets/icon.png) no-repeat 0 0;
	}
	#recommend-list .description .radio{
		width:35px;
		background-position:-31px -657px;
	}
	#recommend-list .description .li{
		width:27px;
		background-position:0 -657px;
	}
</style>