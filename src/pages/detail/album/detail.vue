<template>
    <div class="album-detail detail-content">
        <div class="detail-wrapper clearfix">
            <div class="detail-left" v-if="album">
                <div class="head clearfix">
                    <div class="img">
                        <img :src="album.picUrl" alt="">
                        <span class="msk"></span>
                    </div>
                    <div class="head-wrap">
                        <album-header
                            :album="album"
                            :songs="songs"></album-header>
                    </div>
                </div>
                <div class="desc">
                    <div class="label">专辑介绍：</div>
                    <p class="txt">
                        {{ album.description }}
                    </p>
                </div>
                <!-- <div class="content-wrapper">
                    <playlist-content :playlist="songs"></playlist-content>
                </div> -->
                <div class="comment-wrapper" v-if="album">
                    <comment
                        type="album"
                        :id="id"></comment>
                </div>    
            </div>
            <div class="detail-right">
                <div class="right-sec-wrapper">
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
        getAlbumDetail,
        getAlbumsByArtistId
    } from 'API/getData'
    import AppDownload from '@components/appDownload'
    // import PlaylistContent from '@components/playlistDetail/playlistContent'
    import AlbumHeader from './components/albumHeader'
    import Comment from '@components/comment'
    export default {
        data(){
            return {
                album:null,
                id:null,
                subscribers:null,
                otherAlbums:null,
                songs:null
            }
        },
        methods:{
            initData(){
                var id = this.id;
                getAlbumDetail(id).then(res=>{
                    this.album = res.data.album;
                    this.songs = res.data.songs;
                    // this.subscribers = res.data.playlist.subscribers;
                });
                getAlbumsByArtistId(id,5).then(res=>{
                    this.otherAlbums = res.data.albums;
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
            AppDownload,
            Comment,
            // PlaylistContent,
            AlbumHeader
        }
    }
</script>
<style lang="scss" scoped>
    .album-detail{
        .detail-left{
            padding:42px 30px 0 35px;
        }
        .head{
            .img{
                float: left;
                padding-right: 32px;
                position: relative;
                img{
                    width:177px;
                    height:177px;
                }
                .msk{
                    position: absolute;
                    top:0;
                    left:0;
                    right:0;
                    bottom: 0;
                    background: url(../../../img/coverall.png) no-repeat 0 -986px;
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
        .desc{
            margin-top:15px;
            .label{
                line-height: 25px;
                color:#333;
                font-weight: 700;
            }
            .txt{
                text-indent: 2em;
                line-height: 20px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
