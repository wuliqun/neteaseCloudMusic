<template>
    <div class="user-list">
        <div 
            class="user-item clearfix"
            v-for="user in list"
            :key="user.userId">
            <div class="col col0">
                <router-link
                    :to="{name:'userHome',query:{id:user.userId}}"
                    class="img">
                    <img :src="user.avatarUrl" alt="">
                </router-link>
            </div>
            <div class="col col1">
                <div class="user clearfix f-thide">
                    <router-link
                        class="txt f-thide"
                        :title="user.nickname"
                        :to="{name:'userHome',query:{id:user.userId}}"
                        v-html="wrapKeywords(user.nickname)">
                    </router-link>
                    <i class="music-icon" v-if="user.userType === 4"></i>
                    <i class="gender-icon" :class="{female:user.gender === 2}"></i>
                </div>
                <div class="desc f-thide">{{ user.signature }}</div>
            </div>
            <div class="col col2">
                <a class="follow">
                    关注
                </a>
            </div>
            <div class="col col3">
                歌单：{{ (user.userId + '').slice(0,2) }}
            </div>
            <div class="col col4">
                粉丝：{{ user.province/10000 }}
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
    .user-list{
        .user-item{
            height:62px;
            padding-left: 10px;
            &:nth-child(2n){
                background-color: #f7f7f7;
            }
            &:hover{
                background-color: #f2f2f2;
                outline:1px solid #e1e1e1;
            }
        }
        .col{
            float: left;
        }
        .col1{
            margin:0 20px;
            width:460px;
        }
        .col2{
            width:115px;
        }
        .col3{
            width:115px;
            color:#999;
            line-height: 62px;
        }
        .col4{
            width:100px;
            color:#999;
            line-height: 62px;
        }
        .img{
            display: block;
            width:50px;
            height:50px;
            margin-top: 6px;
            outline:1px solid #e2e2e2;
            img{
                width:100%;
                height:100%;
            }
        }
        .follow{
            display: block;
            width:64px;
            line-height: 28px;
            text-indent: 26px;
            margin-top: 17px;
            color:#333;
            background:url(../../../assets/button.png) no-repeat 0 -990px;
        }
        .user{
            width:150px;
            margin-top: 11px;
            line-height: 22px;
            color:#999;
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
</style>


