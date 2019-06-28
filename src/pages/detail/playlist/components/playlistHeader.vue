<template>
    <div class="playlist-head">
        <div class="title-wrapper clearfix">
            <div class="tag-wrapper">
                <detail-tag type="playlist"></detail-tag>
            </div>
            <h2 class="title f-thide">{{ playlist.name }}</h2>
        </div>
        <div class="user clearfix">
            <router-link
                :to="{name:'userHome',query:{id:playlist.creator.userId}}"
                class="avatar">
                <img :src="playlist.creator.avatarUrl" alt="">
            </router-link>
            <router-link
                :to="{name:'userHome',query:{id:playlist.creator.userId}}"
                class="name f-thide"
                :title="playlist.creator.nickname">
                {{ playlist.creator.nickname }}
            </router-link>
            <div class="time">
                {{ playlist.createTime | formatTime }}创建
            </div>
        </div>
        <div class="operate clearfix">
            <div class="btn-wrapper">
                <play-add-button
                    @play="play"
                    @add="addToList">						
                </play-add-button>
            </div>
            <div class="btn-wrapper">
                <collect-button
                    @click="collect">
                    ({{ playlist.subscribedCount | count2str }})
                </collect-button>
            </div>
            <div class="btn-wrapper">
                <share-button>
                    ({{ playlist.shareCount | count2str }})
                </share-button>
            </div>
            <div class="btn-wrapper">
                <download-button>
                    下载
                </download-button>
            </div>
            <div class="btn-wrapper">
                <comment-button>
                    ({{ playlist.commentCount | count2str }})
                </comment-button>
            </div>
        </div>
        <div class="tags clearfix">
            <span class="label">标签：</span>
            <router-link 
                :to="{name:'discoverPlaylist',query:{cat:tag,order:'hot'}}"
                class="tag"
                v-for="tag in playlist.tags"
                :key="tag">{{ tag }}</router-link>
        </div>
        <div class="desc">
            介绍：{{ playlist.description }}
        </div>
    </div>
</template>
<script>
    import {
			CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
			ShareButton
        }from '@components/buttons'
    import DetailTag from '@components/detailTag'
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        methods:{
            ...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
            ...mapMutations('collectionList',['addCollect']),
            play(){
                this.insertIntoPlaylist(this.playlist.tracks);
                this.$message.playerMessage('已开始播放');
            },
            addToList(){
                this.pushIntoPlaylist(this.playlist.tracks);
                this.$message.playerMessage('已添加到播放列表');
            },
            collect(){
                if(this.isPlaylistCollected(this.playlist.id)){
                    this.$message.warning('您已收藏过该歌单');
                }else{
                    this.addCollect(this.playlist);
                    this.$message.success('收藏成功');
                }
            }
        },
        computed:{
            ...mapGetters('collectionList',['isPlaylistCollected'])
        },
        props:{
            playlist:Object
        },
        components:{
            CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
            ShareButton,
            DetailTag
        },
        filters:{
            formatTime(t){
                var d = new Date(t);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var date = d.getDate();
                var m = month > 9 ? '' + month : '0' + month;
                var d = date > 9 ? '' + date : '0' + date;
                return year + '-' + m + '-' + d;
            },
            count2str(n){
                if(n < 10000){
                    return '' + n;
                }else{
                    return (n/10000).toFixed(2) + '万';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .playlist-head{
        .title-wrapper{
            margin-bottom: 12px;
            .tag-wrapper{
                float: left;
            }
            .title{
                float: left;
                max-width:345px;
                margin-left: 10px;
                font-size: 18px;
                line-height: 24px;
                color:#333;
            }
        }
        .user{
            margin-bottom: 20px;
            line-height: 35px;
            .avatar{
                float: left;
                width:35px;
                height:35px;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .name{
                float: left;
                max-width:250px;
                margin:0 15px 0 10px;
                color:#0c73c2;
                &:hover{
                    text-decoration: underline;
                }
            }
            .time{
                float: left;
                color:#999;
            }
        }
        .operate{
            margin-bottom: 25px;
            .btn-wrapper{
                float: left;
                margin-right: 5px;
            }
        }
        .tags{
            line-height: 22px;
            color:#666;
            .label{
                float: left;
                margin-right: 5px;
            }
            .tag{
                float: left;
                margin-right: 10px;
                margin-bottom: 8px;
                padding:0 12px;
                border:1px solid #d1d1d1;
                border-radius: 11px;
                background-color: #f4f4f4;
                &:hover{
                    background-color: #fff;
                }
            }
        }
        .desc{
            width:410px;
            line-height: 18px;
            color:#666;
        }
    }
</style>
