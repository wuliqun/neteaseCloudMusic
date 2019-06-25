<template>
    <div class="song-detail detail-content">
        <div class="detail-wrapper clearfix">
            <div class="left" v-if="song">
                <div class="head clearfix">
                    <div class="img">
                        <img :src="song.al.picUrl" alt="">
                    </div>    
                </div>    
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>
<script>
    import {getSongDetailInfo} from '@service/getData'
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
        created(){
            this.id = this.$route.query.id;
            if(!this.id){
                this.$router.redirectTo({
                    name:'index'
                });
            }else{
                this.initData();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .song-detail{

    }
</style>

