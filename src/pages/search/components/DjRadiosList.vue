<template>
    <div class="dj-radio-list-wrapper">
        <div class="title">主播电台</div>
        <div class="dj-radio-list clearfix">
            <div 
                class="dj-radio-item"
                v-for="dj in list"
                :key="dj.key">
                <router-link 
                    :to="{name:'dj',query:{id:dj.id}}"
                    class="img">
                    <img :src="dj.picUrl" alt="">
                </router-link>
                <div class="name f-thide">
                    <router-link
                        :to="{name:'dj',query:{id:dj.id}}"
                        v-html="wrapKeywords(dj.name)"
                        :title="dj.name"
                        class="name-link">
                    </router-link>
                </div>
                <div class="user clearfix">
                    <span class="by">by</span>
                    <router-link
                        class="txt f-thide"
                        :title="dj.dj.nickname"
                        :to="{name:'userHome',query:{id:dj.dj.userId}}"
                        v-html="wrapKeywords(dj.dj.nickname)">
                    </router-link>
                    <i class="music-icon" v-if="dj.dj.userType === 4"></i>
                    <i class="gender-icon" :class="{female:dj.dj.gender === 0}"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import searchMixin from './searchMixin'
    export default {
        mixins:[searchMixin]
    }
</script>
<style lang="scss" scoped>
    .dj-radio-list-wrapper{
        .title{
            line-height: 35px;
            font-weight: 700;
            color:#333;
            border-bottom:1px solid #dadada;
        }
        .dj-radio-list{
            margin:16px -37px 0 0;
        }
        .dj-radio-item{
            float: left;
            margin:0 37px 37px 0;
            .img{
                display: block;
                width:150px;
                height:150px;
                img{
                    width:100%;
                    height:100%;
                }                
            }
            .name{
                width:150px;
                margin-top: 10px;
                line-height: 22px;
                a{
                    color:#333;                    
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .user{
                width:150px;
                line-height: 22px;
                color:#999;
                .by{
                    float: left;
                }
                .txt{
                    max-width:95px;
                    float: left;
                    color:#333;
                    margin:0 3px;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                .music-icon{
                    float: left;
                    height:12px;
                    width:12px;
                    margin: 5px 5px 0 0;
                    background: url(../../../assets/icon2.png) no-repeat -110px -190px;
                }
                .gender-icon{
                    float: left;
                    width:14px;
                    height:14px;
                    margin-top: 4px;
                    background: url(../../../assets/icon.png) no-repeat -70px -20px;
                    &.female{
                        background-position-y:0;
                    }
                }
            }
        }
    }
</style>


