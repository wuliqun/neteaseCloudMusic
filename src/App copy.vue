<template>
    <div id="app">
        <site-header></site-header>
        <router-view></router-view>        
        <site-footer></site-footer>
        <music-player></music-player>
        <diy-list-panel></diy-list-panel>
    </div>
</template>

<script>
import siteHeader from '@components/siteHeader'
import siteFooter from '@components/siteFooter'
import musicPlayer from '@components/musicPlayer'
import diyListPanel from '@components/diyListPanel'
import {mapActions,mapMutations} from 'vuex'
export default {
    name: 'NeteaseCloudMusic',
    components:{
        siteHeader,
        siteFooter,
        musicPlayer,
        diyListPanel
    },
    methods:{
        ...mapMutations('playlist',['savePlaylist']),
        ...mapMutations('collectionList',['saveCollectionList']),
        ...mapMutations('userDiyPlaylist',['saveUserDiyPlaylist']),
        ...mapActions('playlist',['initPlaylist']),
        ...mapActions('collectionList',['initCollectionList']),
        ...mapActions('userDiyPlaylist',['initUserDiyPlaylist'])
    },
    created(){ //初始化播放列表及收藏
        this.initPlaylist();
        this.initCollectionList();
        this.initUserDiyPlaylist();
        // 保存播放列表  歌单等至 localStorage
        window.addEventListener('beforeunload', e => {
            this.savePlaylist();
            this.saveCollectionList();
            this.saveUserDiyPlaylist();
        });
    },
    beforeDestroy(){
    },
    computed:{
    }
}
</script>