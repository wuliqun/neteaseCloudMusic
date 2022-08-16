<template>
    <div class="playlist-list">
        <div class="playlist-item clearfix"
            v-for="(playlist,index) in list"
            :key="playlist.id">
            <div class="col col0">
                <a 
                    class="icon play" 
                    @click="play(index)" 
                    title="播放">播放</a>
            </div>
            <div class="col col1">
                <router-link
                    :to="{name:'playlist',query:{id:playlist.id}}"
                    class="img">
                    <img :src="playlist.coverImgUrl" alt="">
                </router-link>
            </div>
            <div class="col col2 f-thide">
                <router-link
                    :to="{name:'playlist',query:{id:playlist.id}}"
                    v-html="wrapKeywords(playlist.name)">                    
                </router-link>
            </div>
            <div class="col col3">
                <a 
                    class="icon add" 
                    title="添加到播放列表"
                    @click="addToList(index)">添加到播放列表</a>
                <a 
                    class="icon collect" 
                    title="收藏"
                    @click="collect(index)">收藏</a>
                <a 
                    class="icon share" 
                    title="分享">分享</a>
            </div>
            <div class="col col4">
                {{ playlist.trackCount }}首
            </div>
            <div class="col col5">
                by 
                <router-link 
                    :to="{name:'userHome',query:{id:playlist.creator.userId}}"
                    v-html="wrapKeywords(playlist.creator.nickname)">
                </router-link>
            </div>
            <div class="col col6">
                收藏:{{ playlist.bookCount }}
            </div>
            <div class="col col7">
                收听:{{ playlist.playCount }}
            </div>
        </div>
    </div>
</template>
<script>
    import searchMixin from './searchMixin'
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        mixins:[searchMixin],
        methods:{
            ...mapActions('playlist',['insertListIntoPlaylistById','pushListIntoPlaylistById']),
            ...mapActions('collectionList',['addCollectById',]),
            async play(index){
                await this.insertListIntoPlaylistById(this.list[index].id);
                this.$message.playerMessage('已开始播放');
            },
            async addToList(index){
                await this.pushListIntoPlaylistById(this.list[index].id);
                this.$message.playerMessage('已添加到播放列表');
            },
            collect(index){
                if(this.isPlaylistCollected(this.list[index].id)){
                    this.$message.warning('您已收藏过该歌单');
                }else{
                    this.addCollectById(this.list[index].id);
                    this.$message.success('收藏成功');
                }
            }
        },
        computed:{
            ...mapGetters('collectionList',['isPlaylistCollected'])
        }
    }
</script>
<style lang="scss" scoped>
    .playlist-item{
        padding-left: 18px;
        height:60px;
        line-height: 60px;
        &:nth-child(2n){
            background-color: #f7f7f7;
        }
        &:hover{
            .col2{
                width:268px;
            }
            .col3{
                display: block;
            }
        }
        .col{
            float: left;
            a{
                color:#333;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        .col1{
            margin:0 20px;
        }
        .col2{
            width:350px;
            margin-right: 12px;
        }
        .col3{
            display: none;
            width:82px;
            padding-top: 23px;
        }
        .col4{
            width:45px;
        }
        .col5{
            width:180px;
        }
        .col6{
            width:98px;
        }
        .icon{
            float: left;
            text-indent: -9999px;
            background:url(../../../img/table.png) no-repeat 0 0;
        }
        .play{
            width:17px;
            height:17px;
            margin-top:22px;
            background-position:0 -103px;
            &:hover{
                background-position:0 -128px;
            }
            &.playing{
                background-position:-20px -128px;
            }
        }
        .add{
            width:13px;
            height:14px;
            background:url(../../../img/icon.png) no-repeat 0 -700px;
            &:hover{
                background-position:-22px -700px;
            }
        }
        .collect{
            width:16px;
            height:14px;
            margin-left:8px;
            background-position:-1px -174px;
            &:hover{
                background-position:-21px -174px;
            }
        }
        .share{
            width:14px;
            height:14px;
            margin-left:8px;
            background-position:-2px -195px;
            &:hover{
                background-position:-22px -195px;
            }
        }     
        .img{
            display: block;
            width:50px;
            height:50px;
            margin-top: 5px;
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>