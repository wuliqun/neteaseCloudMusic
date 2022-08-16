<template>
    <div class="artist-list clearfix">
        <div 
            class="artist-item"
            v-for="artist in list"
            :key="artist.id">
            <router-link class="img" :to="{name:'artist',query:{id:artist.id}}">
                <img :src="artist.picUrl" alt="">
            </router-link>
            <p class="about clearfix">
                <router-link 
                    :to="{name:'artist',query:{id:artist.id}}" 
                    class="ar f-thide" :title="artist.name + '的音乐'" v-html="wrapKeywords(artist.name)">
                </router-link>
                <router-link 
                    :to="{name:'userHome',query:{id:artist.accountId}}" 
                    class="user" 
                    :title="artist.name + '的个人主页'" v-if="artist.accountId">
                </router-link>
            </p>
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
    .artist-list{
        margin:0 -24px -20px 0;
    }
    .artist-item{
        float: left;
        margin:0 24px 20px 0;
        .img{
            display: block;
            width:130px;
            height:130px;
            outline:1px solid #cdcecf;
            img{
                width:100%;
                height:100%;
            }
        }
        .about{
            line-height: 32px;
            .ar{
                float: left;
                color:#333;
                width:110px;
                &:hover{
                    text-decoration: underline;
                }
            }
            .user{
                float: right;
                width:16px;
                height:17px;
                margin-top:8px;
                background:url(../../../img/icon.png) no-repeat 0 -740px;
            }
        }
    }
</style>
