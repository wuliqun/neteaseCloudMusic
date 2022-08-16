<template>
    <div class="song-detail detail-content">
        <div class="detail-wrapper clearfix">
            <div class="detail-left" v-if="song">
                <div class="head clearfix">
                    <div class="img">
                        <img :src="song.al.picUrl" alt="">
                    </div>
                    <div class="song-header-wrapper">
                        <song-header :song="song"></song-header>
                    </div>
                </div>
                <div class="comment-wrapper" v-if="song">
                    <comment
                        type="music"
                        :id="song.id"></comment>
                </div>    
            </div>
            <div class="detail-right">
                <div class="app-wrapper">
                    <app-download></app-download>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getSongDetailInfo} from 'API/getData'
    import SongHeader from './components/songHeader'
    import Comment from '@components/comment'
    import AppDownload from '@components/appDownload'
    export default {
        data(){
            return {
                id:null,
                song:null
            }
        },
        methods:{
            initData(){
                getSongDetailInfo({id:this.id}).then(res=>{
                    this.song = res.data.songs[0];
                })
            }
        },
        watch:{
            $route(to){
                if(to.name === 'song'){
                    if(to.query.id !== this.id){
                        this.id = to.query.id;
                        this.initData();
                    }
                }
            }
        },
        created(){
            this.id = this.$route.query.id;
            if(!this.id){
                this.$router.redirectTo({
                    name:'index'
                });
            }else{
                this.initData();
            }
        },
        components:{
            SongHeader,
            Comment,
            AppDownload
        }
    }
</script>

<style lang="scss" scoped>
    .song-detail{
        .head{
            padding:32px 36px 0;
            .img{
                float: left;
                width:206px;
                height:206px;
                margin-right: 24px;
                padding:38px;
                box-sizing: border-box;
                background:url(../../../img/coverall.png) no-repeat -140px -580px;
                img{
                    width:100%;
                    height:100%;
                    border-radius: 50%;
                }
            }
            .song-header-wrapper{
                float: left;
                margin-top:8px;
            }
        }
        .comment-wrapper{
            margin:0 50px 0 40px;
        }
        .app-wrapper{
            margin:35px 40px 0 30px;
        }
    }
</style>

