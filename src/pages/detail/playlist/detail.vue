<template>
    <div class="playlist-detail detail-content">
        <div class="detail-wrapper clearfix">
            <div class="detail-left" v-if="playlist">
                <div class="head clearfix">
                    <div class="img">
                        <img :src="playlist.coverImgUrl" alt="">
                    </div>
                    <div class="head-wrap">
                        <playlist-header
                            :playlist="playlist"></playlist-header>
                    </div>
                </div>
                <div class="content-wrapper">
                    <playlist-content :playlist="playlist"></playlist-content>
                </div>
                <div class="comment-wrapper" v-if="playlist">
                    <comment
                        type="playlist"
                        :id="playlist.id"></comment>
                </div>    
            </div>
            <div class="detail-right">
                <div class="right-sec-wrapper" v-if="subscribers && subscribers.length">
                    <like-this :users="subscribers"></like-this>
                </div>
                <div class="right-sec-wrapper" v-if="similiarPlaylists && similiarPlaylists.length">
                    <similiar-playlist :playlists="similiarPlaylists"></similiar-playlist>
                </div>
                <div class="right-sec-wrapper">
                    <app-download></app-download>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        getPlaylistDetail,
        getSimiliarPlaylist
    } from 'API/getData'
    import PlaylistHeader from './components/playlistHeader'
    import PlaylistContent from '@components/playlistDetail/playlistContent'
    import AppDownload from '@components/appDownload'
    import Comment from '@components/comment'
    import LikeThis from './components/likeThis'
    import SimiliarPlaylist from './components/similiarPlaylist'
    export default {
        data(){
            return {
                playlist:null,
                id:null,
                subscribers:null,
                similiarPlaylists:null
            }
        },
        methods:{
            initData(){
                var id = this.id;
                getPlaylistDetail(id).then(res=>{
                    this.playlist = res.data.playlist;
                    this.subscribers = res.data.playlist.subscribers;
                });
                getSimiliarPlaylist(id).then(res=>{
                    this.similiarPlaylist = res.data.playlists;
                })
            }
        },
        watch:{
            '$route.query.id'(id){
                if(id !== this.id){
                    this.id = id;
                    this.initData();
                }
            }
        },
        created(){
            var id = this.$route.query.id;
            if(!id){
                this.$router.redirectTo({
                    name:'index'
                })
            }else{
                this.id = id;
                this.initData();
            }
        },
        components:{
            PlaylistHeader,
            PlaylistContent,
            AppDownload,
            Comment,
            LikeThis,
            SimiliarPlaylist
        }
    }
</script>
<style lang="scss" scoped>
    .playlist-detail{
        .detail-left{
            padding:42px 30px 0 35px;
        }
        .head{
            .img{
                float: left;
                border:1px solid #d5d5d5;
                padding:3px;
                img{
                    width:200px;
                    height:200px;
                }
            }
        }
        .head-wrap{
            float: left;
            margin-left: 26px;
            padding-top: 4px;
        }
        .right-sec-wrapper{
            margin:35px 40px 0 30px;
        }
        .content-wrapper{
            margin-top:40px;
        }
    }
</style>
