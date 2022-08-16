<template>
    <div class="dj-recommend">
        <div class="wrapper">
            <div class="title clearfix">
                <h1 class="main">推荐节目</h1>
                <span class="sub">(每日更新)</span>
            </div>
            <div class="program-wrapper" v-if="programs">
                <ul class="program-list">
                    <li 
                        class="program-item clearfix"
                        v-for="program in programs"
                        :key="program.id">
                        <div class="img">
                            <img :src="program.coverUrl" alt="">
                            <i class="icon-play" @click="play(program.id)"></i>
                        </div>
                        <div class="name f-thide">
                            <router-link class="link" :to="{name:'program',query:{id:program.id}}">
                                {{ program.name }}
                            </router-link>
                        </div>
                        <div class="dj f-thide">
                            <router-link class="link" :to="{name:'dj',query:{id:program.dj.userId}}">
                                {{ program.dj.brand }}
                            </router-link>
                        </div>
                        <div class="play-count">播放{{ program.listenerCount }}</div>
                        <div class="zan">赞{{ program.likedCount }}</div>
                        <div class="cat">
                            <router-link class="link" :to="{name:'discoverDjRadioCategory',query:{id:program.radio.categoryId}}">{{ program.radio.category }}</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDjRecommend} from 'API/getData'
    import {mapActions} from 'vuex'
    export default {
        data(){
            return {
                programs:null
            }
        },
        methods:{
            ...mapActions('playlist',['insertListIntoPlaylistById']),
            initData(){
                getDjRecommend().then(response=>{
                    this.programs = response.data.programs;
				});
            },
            async play(id){
                await this.insertListIntoPlaylistById(id);
                this.$message.playerMessage('已开始播放');
            }
        },
        created(){
            this.initData();
        }
    }
</script>
<style lang="scss" scoped>
    .dj-recommend{
        background-color: #f5f5f5;
        .wrapper{
            width: 982px;
            margin: 0 auto;
            padding:32px 40px;
            border: solid #e1e1e1;
            box-sizing: border-box;
            border-width: 0 1px;
            background-color: #fff;
        }
        .title{
            border-bottom: 2px solid #c20c0c;
            .main{
                float: left;
                margin-right: 20px;
                font-size: 24px;
                color:#333;
                line-height: 48px;
            }
            .sub{
                float: left;
                line-height: 36px;
                margin-top: 12px;
                color:#999;
            }
        }
        .program-wrapper{
            border:solid #e2e2e2;
            border-width: 0 1px;
        }
        .program-item{
            padding-left:20px;
            height:60px;
            line-height: 60px;
            font-size: 12px;
            color:#999;            
            &:nth-child(2n){
                background-color: #f7f7f7;
            }
            &:hover{
                background-color: #eee;
                .icon-play{
                    display:block;
                }
            }
            .img{
                float: left;
                position: relative;
                margin-top: 10px;
                width:40px;
                height:40px;
                img{
                    width:100%;
                    height:100%;
                }                
            }
            .link:hover{
                text-decoration: underline;
            }
            .icon-play{
                position: absolute;
                display: none;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width:22px;
                height:22px;
                cursor:pointer;
                background: url(../../../../img/iconall.png) no-repeat 0 -110px;
            }
            .name{
                float: left;
                width:300px;
                margin-left: 12px;
                .link{
                    color:#333;
                }
            }
            .dj{
                float: left;
                width:160px;
                margin:0 15px;
                .link{
                    color:#666;
                }
            }
            .play-count{
                float: left;
                width:85px;
                margin-right: 15px;                
            }
            .zan{
                float: left;
                width:135px;
            }
            .cat{
                float: left;
                .link{
                    padding:0 10px;
                    line-height: 16px;
                    border:1px solid;
                    color:#999;
                }
            }
        }
    }
</style>
