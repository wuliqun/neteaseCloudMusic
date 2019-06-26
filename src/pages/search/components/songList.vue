<template>
    <div class="song-list">
        <div 
            class="song-item clearfix"
            v-for="(track,index) in list"
            :key="track.id">
            <div class="col col-0 clearfix">
                <a class="icon play" title="播放" @click="play(index)" :class="{playing:track.id == playingId}"></a>
            </div>
            <div class="col col-1">
                <router-link 
                    :to="{name:'song',query:{id:track.id}}" 
                    class="name f-thide" 
                    v-html="wrapKeywords(track.name)">                    
                </router-link>
                <router-link :to="{name:'mv',query:{id:track.mv}}" class="mv-icon" v-if="track.mv" title="播放MV">
                </router-link>
            </div>
            <div class="col col-2">                
                <div class="operate clearfix">
                    <a class="icon add" title="添加到播放列表" @click="addToList(index)"></a>
                    <a class="icon collect" title="收藏" @click="addSong(index)"></a>
                    <a class="icon share" title="分享"></a>
                    <a class="icon download" title="下载"></a>
                </div>
            </div>
            <div class="col col-3 f-thide" :title="track.artists | joinName">
                <template v-for="artist in track.artists">
                    <router-link :to="{name:'artist',query:{id:artist.id}}" :key="artist.id">
                        {{artist.name}}
                    </router-link>
                    <span class="sep" :key="artist.id +'s'">/</span>
                </template>
            </div>
            <div class="col col-4 f-thide">
                《<router-link 
                    :to="{name:'album',query:{id:track.album.id}}" 
                    v-html="wrapKeywords(track.album.name)">                    
                </router-link>》
            </div>
            <div class="col col5">
                <span>{{track.duration | time2str}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    import searchMixin from './searchMixin'
    export default {
        mixins:[searchMixin],
        computed:{
			...mapState('playlist',['playingId'])
		},
		methods:{
            ...mapMutations('userDiyPlaylist',['setSongWaitToAdd','showAddDiyListPanel']),
            ...mapMutations('playlist',['pushIntoPlaylist','insertIntoPlaylist']),
			addSong(index){
				this.setSongWaitToAdd(this.list[index]);
				this.showAddDiyListPanel();
			},
			play(index){
				this.insertIntoPlaylist(this.list[index]);
				this.$message.playerMessage('已开始播放');
			},
			addToList(index){
				this.pushIntoPlaylist(this.list[index]);
				this.$message.playerMessage('已添加至播放列表');
            }
        },
        filters:{
			time2str(duration){
				duration = Math.round(duration/1000);
				let secs = duration % 60;
				duration = parseInt(duration/60);
				let minutes = duration % 60;
				let hours = parseInt(duration/60);
				var s = '';
				if(hours > 0){
					s += hours > 9? hours: '0' + hours;
					s += ':';
				}
				s += minutes > 9? minutes: '0' + minutes;
				s += ':';
				s += secs > 9? secs: '0' + secs;
				return s;
			},
			joinName(artists){
				return artists.map(artist=>{
					return artist.name;
				}).join('/');
			}
		},
    }
</script>
<style lang="scss" scoped>
    .song-item{
        padding-left:18px;
        height:43px;
        line-height: 43px;
        &:nth-child(2n){
            background-color: #f7f7f7;
        }
        &:hover{
            background-color: #f2f2f2;
            outline:1px solid #e1e1e1;
            .col-2{
                display:block;                
            }
            .col-1{
                width:364px;
            }
        }
        a{
            color:#333;
            &:hover{
                text-decoration: underline;
            }
        }
        .col{
            float: left;
            margin-right: 6px;
        }
        .icon{
            float: left;
            background:url(../../../assets/table.png) no-repeat 0 0;
        }
        .mv-icon{
            display:inline-block;
            width:23px;
            height:17px;
            margin-left:2px;
            vertical-align:middle;
            background:url(../../../assets/table.png) no-repeat 0 -151px;
            &:hover{
                background:url(../../../assets/table.png) no-repeat -30px -151px;
            }
        }
        .play{
            width:17px;
            height:17px;
            margin-top:13px;
            background-position:0 -103px;
            &:hover{
                background-position:0 -128px;
            }
            &.playing{
                background-position:-20px -128px;
            }
        }
        .col-1{
            width:470px;
        }
        .col-2{
            display:none;
            width:100px;
            .operate .icon{
                height:14px;
                margin-top:14px;
            }
        }
        .col-3{
            width:140px;
            .sep:last-child{
                display:none;
            }
        }
        .col-4{
            width:165px;
        }
        .add{
            width:13px;
            margin-left:8px;
            background:url(../../../assets/icon.png) no-repeat 0 -700px;
            &:hover{
                background-position:-22px -700px;
            }
        }
        .collect{
            width:16px;
            margin-left:5px;
            background-position:-1px -174px;
            &:hover{
                background-position:-21px -174px;
            }
        }
        .share{
            width:14px;
            margin-left:7px;
            background-position:-2px -195px;
            &:hover{
                background-position:-22px -195px;
            }
        }
        .download{
            width:14px;
            margin-left:7px;
            background-position:-83px -174px;
            &:hover{
                background-position:-106px -174px;
            }
        }
    }
</style>


