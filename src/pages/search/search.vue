<template>
    <div class="search-page">
        <div class="wrapper">
            <div class="head">
                <div class="head-wrap clearfix">
                    <input 
                        type="text" 
                        name="keyword" 
                        v-model="keyword" 
                        autocomplete="off"
                        class="input">
                    <button 
                        class="submit"
                        @click="search"
                        title="搜索">                        
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="info-desc">
                    <div v-if="listData">搜索“{{ lastKeyword }}”,共找到<span class="red">{{ count }}</span>{{ type | type2str }}</div>
                </div>
                <search-tab
                    @changetype="changeType"
                    :type="type">
                </search-tab>
                <div class="result-wrapper" v-if="listData">
                    <component :is="currentComponent" :list="listData" :keyword="lastKeyword"></component>
                </div>
                <div class="loading-wrapper" v-else>
                    <loading show></loading>
                </div>
            </div>
            <div class="pagination-wrapper">
                <pagination
                    v-if="count > 30"
                    :total="count"
                    :current-index="pageIndex + 1"
                    :index-count="8"
                    :count-per-page="30"
                    @page="getDataByPageIndex">
                </pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        SearchTab,
        SongList,
        ArtistList,
        AlbumList,
        MvList,
        LyricList,
        PlaylistList,
        DjRadiosList,
        UserList
    } from './components'
    import Loading from '@components/loading'
    import {searchByType} from '@service/getData'
    import Pagination from '@components/pagination'
    export default {
        data(){
            return {
                lastKeyword:'',
                keyword:'',
                type:1,
                pageIndex:0,
                listData:null,
                count:0
            }
        },
        created(){
            this.initQuery();
            this.getData();
        },
        watch:{
            '$route.query.s'(val){
                if(this.lastKeyword !== val){
                    this.listData = null;
                    this.count = 0;
                    this.initQuery();
                    this.getData();
                }
            }
        },
        methods:{
            initQuery(){
                this.keyword = this.lastKeyword = this.$route.query.s;
                this.type = Number(this.$route.query.type) || 1;
            },
            changeType(type){
                if(this.type == type) return;
                this.type = type;
                this.$router.push({
                    name:'search',
                    query:{
                        type,
                        s:this.lastKeyword
                    }
                });
                this.pageIndex = 0;
                this.count = 0;
                this.listData = null;
                this.getData();
            },
            search(){
                if(this.keyword !== this.lastKeyword){
                    this.$router.push({
                        name:'search',
                        query:{
                            s:this.keyword,
                            type:this.type
                        }
                    })
                }
            },
            getData(){
                var type = this.type;
                searchByType({
                    keywords:this.lastKeyword,
                    type,
                    offset:this.pageIndex * 30
                }).then(res=>{
                    switch(type){
                        case 1:
                        case 1006:
                            this.listData = res.data.result.songs;
                            this.count = res.data.result.songCount;
                            break;
                        case 100:
                            this.listData = res.data.result.artists;
                            this.count = res.data.result.artistCount;
                            break;
                        case 10:
                            this.listData = res.data.result.albums;
                            this.count = res.data.result.albumCount;
                            break;
                        case 1014:
                            this.listData = res.data.result.videos;
                            this.count = res.data.result.videoCount;
                            break;
                        case 1000:
                            this.listData = res.data.result.playlists;
                            this.count = res.data.result.playlistCount;
                            break;
                        case 1009:
                            this.listData = res.data.result.djRadios;
                            this.count = res.data.result.djRadiosCount;
                            break;
                        case 1002:
                            this.listData = res.data.result.userprofiles;
                            this.count = res.data.result.userprofileCount;
                            break;
                        default:
                            break;
                    }
                });
            },
            getDataByPageIndex(index){
                this.listData = null;
                this.pageIndex = index - 1;
                this.getData();
            }
        },
        computed:{
            currentComponent(){
                switch(this.type){
                    case 1:
                        return 'SongList';
                    case 100:
                        return 'ArtistList';
                    case 10:
                        return 'AlbumList'
                    case 1014:
                        return 'MvList'
                    case 1006:
                        return 'LyricList'
                    case 1000:
                        return 'PlaylistList'
                    case 1009:
                        return 'DjRadiosList'
                    case 1002:
                        return 'UserList'
                }
            }
        },
        filters:{
            type2str(type){
                type = Number(type)
                switch(type){
                    case 1:
                        return "首单曲"
                    case 100:
                        return "个歌手"
                    case 10:
                        return "张专辑"
                    case 1014:
                        return "个视频"
                    case 1000:
                        return "个歌单"
                    case 1006:
                        return "个歌词"
                    case 1009:
                        return "个节目"
                    case 1002:
                        return "个用户"
                }
            }
        },
        components:{
            SearchTab,
            Loading,
            SongList,
            ArtistList,
            Pagination,
            AlbumList,
            MvList,
            LyricList,
            PlaylistList,
            DjRadiosList,
            UserList
        }
    }
</script>
<style lang="scss" scoped>
    .search-page{
        background-color: #f5f5f5;
        .head{
            padding:40px 0 30px;
            .head-wrap{
                width:420px;
                margin:0 auto;
            }
            .input{
                float: left;
                width:370px;
                box-sizing: border-box;
                padding:0 20px;
                line-height: 38px;
                border:1px solid #c9c9c9;
                border-radius: 5px 0 0 5px/5px 0 0 5px;
                box-shadow:2px -2px 3px insert #ccc;
            }
            .submit{
                float: left;
                height:40px;
                width:50px;
                box-sizing: border-box;
                border:1px solid #c9c9c9;
                border-left: none;
                border-radius: 0 5px 5px 0/0 5px 5px 0;
                cursor:pointer;
                background:url(../../assets/topbar.png) no-repeat 8px -95px #f8f8f8;
            }
        }
        .info-desc{
            margin-bottom: 15px;
            line-height: 18px;
            height:18px;
        }
        .content{
            padding:0 40px;
            .red{
                margin:0 4px;
                color:#c20c0c;
            }
        }
        .loading-wrapper{
            height:300px;
            padding-top:20px;
        }
    }
    .wrapper{
        width:982px;
        margin:0 auto;
        padding-bottom: 1px;
        border:solid #d3d3d3;
        border-width:0 1px;
        background-color: #fff;
    }
</style>

