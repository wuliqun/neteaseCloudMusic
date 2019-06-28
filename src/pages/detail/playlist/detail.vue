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
                <div class="comment-wrapper" v-if="song">
                    <comment
                        type="playlist"
                        :id="playlist.id"></comment>
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
import { getPlaylistDetail } from '@service/getData'
import PlaylistHeader from './components/playlistHeader'
export default {
    data(){
        return {
            playlist:null,
            id:null
        }
    },
    methods:{
        initData(){
            var id = this.id;
            getPlaylistDetail(id).then(res=>{
                this.playlist = res.data.playlist;
            });
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
        PlaylistHeader
    }
}
</script>
