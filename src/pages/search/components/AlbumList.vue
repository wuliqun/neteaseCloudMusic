<template>
    <div class="album-list clearfix">
        <div 
            class="album-item"
            v-for="album in list"
            :key="album.id">
            <div class="img-wrapper">
                <router-link :to="{name:'album',query:{id:album.id}}" class="img-link">
                    <img :src="album.picUrl" alt="">									
                </router-link>
                <a class="play" @click="playAlbum(album.id)"></a>
            </div>
            <div class="infos">
                <p class="name">
                    <router-link :to="{name:'album',query:{id:album.id}}">
                        {{album.name}}
                    </router-link>
                </p>
                <p class="artist" :title="album.artists | joinNames">
                    <template v-for="(artist,index) in album.artists">
                        <router-link :to="{name:'artist',query:{id:artist.id}}" :key="'next' + artist.id">
                            {{artist.name}}
                        </router-link>
                        <span class="seperator" :key="'next' + index">/</span>
                    </template>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import searchMixin from './searchMixin'
    import {mapActions} from 'vuex'
    export default {
        mixins:[searchMixin],
		methods:{
			...mapActions('playlist',['insertListIntoPlaylistByAlbumId']),			
			async playAlbum(id){
				await this.insertListIntoPlaylistByAlbumId(id);
				this.$message.playerMessage('已开始播放');
			}
        },
        filters:{			
			joinNames(artists){
				artists.map(artist=>{
					return artist.name;
				}).join('/');
			}
		}
    }
</script>
<style lang="scss" scoped>
    .album-list{
        margin:0 -32px -24px 0;
    }
    .album-item{
        margin:0 32px 24px 0;
        float: left;
        .img-wrapper{
			position:relative;
			.play{
				position:absolute;
				display:none;
				left:95px;
				bottom:6px;
				width:28px;
				height:28px;
				background:url(../../../assets/iconall.png) no-repeat 0 -140px;
				&:hover{
					background-position:0 -170px;
				}
			}
			&:hover .play{
				display:block;
            }
		}
		.img-link{
			display:block;
			height:130px;
			width:154px;
			text-align:left;
			background:url(../../../assets/coverall.png) no-repeat 0 -845px;
			img{
                width:128px;
                height:128px;
                margin:1px;
			}
		}
		.infos{
			p{
				overflow:hidden;
				width:100px;
				line-height:18px;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			.name{
				margin-top:5px;
				a{
					color:#666;
				}
			}
		}
		.seperator:last-child{
			display:none;
		}
    }
</style>

