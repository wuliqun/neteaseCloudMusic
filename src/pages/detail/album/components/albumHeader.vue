<template>
    <div class="album-header">
        <div class="title-wrapper clearfix">
            <div class="tag-wrapper">
                <detail-tag type="album"></detail-tag>
            </div>
            <h2 class="title f-thide">{{ album.name }}</h2>
        </div>
        <div class="artist-wrapper clearfix">
            <span class="label">歌手：</span>
            <template v-for="artist in album.artists">
                <router-link
                    :to="{name:'artist',query:{id:artist.id}}"
                    class="ar"
                    :title="artist.name"
                    :key="artist.key">
                    {{artist.name}}
                    </router-link>
                <span class="sep" :key="'sep'+artist.id">/</span>
            </template>
        </div>
        <div class="time">
            发行时间：{{ album.publishTime | formatTime }}
        </div>
        <div class="time">
            发行公司：{{ album.company}}
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
                    收藏
                </collect-button>
            </div>
            <div class="btn-wrapper">
                <share-button>
                    ({{ album.info.shareCount | count2str }})
                </share-button>
            </div>
            <div class="btn-wrapper">
                <download-button>
                    下载
                </download-button>
            </div>
            <div class="btn-wrapper">
                <comment-button>
                    ({{ album.info.commentCount | count2str }})
                </comment-button>
            </div>
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
                this.insertIntoPlaylist(this.songs);
                this.$message.playerMessage('已开始播放');
            },
            addToList(){
                this.pushIntoPlaylist(this.songs);
                this.$message.playerMessage('已添加到播放列表');
            },
            collect(){
                // if(this.isPlaylistCollected(this.album.id)){
                //     this.$message.warning('您已收藏过该歌单');
                // }else{
                //     this.addCollect(this.playlist);
                //     this.$message.success('收藏成功');
                // }
            }
        },
        computed:{
            ...mapGetters('collectionList',['isPlaylistCollected'])
        },
        props:{
            album:Object,
            songs:Array
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
                    var s =  (n/10000).toFixed(1) + '万';
                    if(s.length >=6){
                        s = s.split('.')[0] + '万'
                    }
                    return s;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .album-header{
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
        .artist-wrapper{
            margin-top: 10px;
            .label{
                float: left;
                color:#333;
            }
            .ar{
                float: left;
                margin:0 2px;
                color: #0c73c2;
                &:hover{
                    text-decoration: underline;
                }
            }
            .sep{
                float: left;
                &:last-child{
                    display: none;
                }
            }
        }
        .time{
            margin-top: 5px;
        }
        .operate{
            margin-top: 25px;
            .btn-wrapper{
                float: left;
                margin-right: 5px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
</style>
