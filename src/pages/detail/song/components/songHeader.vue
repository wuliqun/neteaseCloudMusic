<template>
    <div class="song-head">
        <div class="title-wrapper clearfix">
            <div class="tag-wrapper">
                <detail-tag type="song"></detail-tag>
            </div>
            <h2 class="title">{{ song.name }}</h2>
        </div>
        <div class="info-line">
            <span>歌手:</span>
            <router-link class="link" :to="{name:'artist',query:{id:song.ar[0].id}}">
                {{ song.ar[0].name }}
            </router-link>
        </div>
        <div class="info-line">
            <span>所属专辑:</span>
            <router-link class="link" :to="{name:'album',query:{id:song.al.id}}">
                {{ song.al.name }}
            </router-link>
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
                    @click="showAddPanel">
                    收藏
                </collect-button>
            </div>
            <div class="btn-wrapper">
                <share-button>
                    分享
                </share-button>
            </div>
            <div class="btn-wrapper">
                <download-button>
                    下载
                </download-button>
            </div>
            <div class="btn-wrapper">
                <comment-button>
                    ({{ song.pop }})
                </comment-button>
            </div>
        </div>
        <div class="lyric">
            <txt-panel :txt="lyric"></txt-panel>
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
    import TxtPanel from '@components/playlistDetail/txtPanel'
    import {getSongLyric} from '@service/getData'
    import {mapMutations} from 'vuex'
    import lyric from './lyric'
    export default {
        data(){            
            return {
                lyric:lyric.data
            }
        },
        props:{
            song:Object
        },
        methods:{
            ...mapMutations('playlist',['insertIntoPlaylist','pushIntoPlaylist']),
            ...mapMutations('userDiyPlaylist',['setSongWaitToAdd','showAddDiyListPanel']),
            play(){
                this.insertIntoPlaylist(this.song);
                this.$message.playerMessage('已开始播放');
            },
            addToList(){
                this.pushIntoPlaylist(this.song);
                this.$message.playerMessage('已添加到播放列表');
            },
            showAddPanel(){
                this.setSongWaitToAdd(this.song);
                this.showAddDiyListPanel();
            }
        },
        components:{
            CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
            ShareButton,
            DetailTag,
            TxtPanel
        }
    }
</script>
<style lang="scss" scoped>
    .song-head{
        .title-wrapper{
            margin-bottom: 15px;
            .tag-wrapper{
                float: left;
            }
            .title{
                float: left;
                margin-left: 10px;
                font-size: 24px;
                line-height: 24px;
                color:#333;
            }
        }
        .info-line{
            margin-bottom: 8px;
            line-height: 20px;
            color:#999;
            .link{
                margin-left: 10px;
                color:#0c73c2;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        .operate{
            margin-bottom: 40px;
            .btn-wrapper{
                float: left;
                margin-right: 5px;
            }
        }
        .lyric{
            margin-bottom: 20px;
        }
    }
</style>
