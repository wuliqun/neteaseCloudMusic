<template>
    <header id="header">
        <div class="header-nav clearfix">
            <div class="wrapper">
                <div class="logo-wrap">
                    <h1 class="logo topbar-icon">
                        <router-link :to="{name:'index'}">网易云音乐</router-link>
                    </h1>
                </div>
                <ul class="navs">
                    <li class="nav-item" v-for="(item,index) in siteStructure" :key="item.id">
                        <router-link 
                            :to="{name:item.routerName}" 
                            v-if="!item.isOuterLink"
                            :exact="index === 0"
                            :class="{active:isDiscover && index===0,hot:item.isHot}">
                            {{item.name}}
                            <i v-if="item.isHot"></i>
                        </router-link>
                        <a 
                            :href="item.href" 
                            v-else
                            :class="{hot:item.isHot}">
                            {{item.name}}
                            <i v-if="item.isHot"></i>
                        </a>
                    </li>
                </ul>
                <header-search></header-search>
                <div class="creater-center">
                    <a @click="failToLog">创作者中心</a>
                </div>
                <div class="login-info" @click="failToLog">
                    <div class="login-btn">
                        <a>登录</a>
                        <i class="triangle-down topbar-icon"></i>
                    </div>
                    <ul class="login-pop">
                        <li class="icon-login triangle-up"></li>
                        <li class="login-way">
                            <i class="icon-login mobile"></i>
                            <a>手机号登录</a>
                        </li>
                        <li class="login-way">
                            <i class="icon-login wechat"></i>
                            <a>微信登录</a>
                        </li>
                        <li class="login-way">
                            <i class="icon-login qq"></i>
                            <a>QQ登录</a>
                        </li>
                        <li class="login-way">
                            <i class="icon-login sinaweibo"></i>
                            <a>新浪微博登录</a>
                        </li>
                        <li class="login-way">
                            <i class="icon-login mail163"></i>
                            <a>网易邮箱账号登录</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="discover-bar">
            <div class="wrapper">
                <ul class="discover-nav clearfix" v-show="isDiscover">
                    <li class="discover-item" v-for="(item,index) in siteStructure[0].children" :key="item.id">
                        <router-link 
                            :to="{name:item.routerName}" 
                            :class="{active:isRecomend}" 
                            exact 
                            v-if="!index">
                            {{item.name}}
                        </router-link>
                        <router-link :to="{name:item.routerName}" v-else>{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>    
    </header>
</template>
<script>
    import siteStructure from '@/config/siteStructure'    
    import HeaderSearch from '@components/headerSearch'
    const detailRouterName = ['mv','song','dj','album','playlist','userHome','artist','search','program']
    export default {
        data(){
            return {
                siteStructure:siteStructure
            }
        },
        components:{
            HeaderSearch
        },
        computed:{
            isDiscover(){
                var name = this.$route.name;                
                return /discover/.test(name) || detailRouterName.indexOf(name) !== -1;
            },
            isRecomend(){
                var name = this.$route.name;
                return name === 'discoverRecommend' || name === 'index';
            }
        },
        methods:{
            failToLog(){
                this.$messageUtil.toast({
                    msg:'SORRY,无法进行与登录相关操作',
                    type:"warn"
                });
            }
        }
    }
</script>
<style>
    #header .header-nav{
        background-color:#242424;
    }
    #header .wrapper{
        width:1100px;
        margin:0 auto;
    }
    #header .topbar-icon{
        background:url(../../assets/topbar.png) no-repeat 0 0;
    }
    #header .logo-wrap{
        float:left;
    }
    #header .logo{
        height:69px;
        width:157px;
        margin-right:20px;
        text-indent:-9999px;
    }
    #header .logo a{
        display:block;
        width:100%;
        height:100%;
    }
    #header .navs{
        float:left;
    }
    #header .nav-item{
        float:left;
        height:70px;
    }
    #header .nav-item a{
        position:relative;
        display:block;
        padding:0 19px;
        line-height:70px;
        font-size:14px;
        color:#ccc;
    }
    #header .nav-item a.router-link-active,#header .nav-item a:hover,#header .nav-item a.active{
        background:#000;
        color:#fff;
    }
    #header .nav-item a.router-link-active:after,#header .nav-item a.active:after{
        content:'';
        position:absolute;
        bottom:0;
        left:50%;
        width:14px;
        height:7px;
        background:url(../../assets/topbar.png) no-repeat -215px -140px;
        transform:translateX(-50%);
    }
    #header .nav-item a.hot i{
        content:'';
        position:absolute;
        top:20px;
        right:-20px;
        width:26px;
        height:13px;
        background:url(../../assets/topbar.png) no-repeat -192px 0;
    }
    #header #header-search{
        float:left;
        margin:19px 12px 0 86px;
    }
    #header .creater-center{
        float:left;
        height:30px;
        margin-top:19px;
        padding:0 15px;
        border:1px solid #4f4f4f;
        border-radius:16px;
        line-height:30px;
        text-align:center;        
    }
    #header .creater-center a{
        color:#ccc;
    }
    #header .creater-center:hover{
        border-color:#ccc;        
    }
    #header .creater-center:hover a{
        color:#f4f4f4;
    }
    #header .login-info{
        position:relative;
        float:right;
    }
    #header .login-btn{
        position:relative;
        height:51px;
        margin-top:19px;
        padding-right:22px;
        line-height:32px;
    }
    #header .login-btn .triangle-down{
        position:absolute;
        right:2px;
        top:14px;
        width:12px;
        height:7px;
        background-position:-228px -60px;
    }
    #header .login-btn a:hover{
        color:#5f5f5f;
        text-decoration:underline;
    }
    #header .login-pop{
        display:none;
        position:absolute;
        left:-66px;
        top:60px;
        width:158px;
        border:1px solid #000;
        border-radius:4px;
        background-color:#2b2b2b;
    }    
    #header .login-way{
        position:relative;
        height:38px;
        padding-left:44px;
        line-height:38px;
        border-bottom:1px solid #000;
    }
    #header .login-way:last-child{
        border-bottom:none;
    }
    #header .login-way:hover{
        background-color:#353535;
    }
    #header .login-way:hover a{
        color:#f4f4f4;
    }
    #header .login-info:hover .login-pop{
        display:block;
    }
    #header .icon-login{
        position:absolute;
        top:9px;
        left:17px;
        height:20px;
        width:18px;
        background:url(../../assets/toplist.png) no-repeat 0 0;
    }
    #header .triangle-up{
        top:-8px;
        left:73px;
        width:14px;
        height:8px;
        background-position:-20px 0;
    }
    #header .mobile{
        background-position:0 0;
    }
    #header .wechat{
        background-position:-20px -20px;
    }
    #header .qq{
        background-position:-20px -40px;
    }
    #header .sinaweibo{
        background-position:0 -20px;
    }
    #header .mail163{
        background-position:0 -40px;
    }
    #header .discover-bar{
        padding:2px 0;
        background-color:#c20c0c;
        border-bottom:1px solid #a40011;
    }
    #header .discover-nav{
        height:30px;
        margin-left:177px;
    }
    #header .discover-item{
        float:left;        
        margin:5px 20px;
        line-height:18px;        
    }
    #header .discover-item a{
        display:block;
        height:20px;
        padding:0 12px;
        color:#fff;
    }
    #header .discover-item a.router-link-active,#header .discover-item a:hover,
    #header .discover-item a.active{
        border-radius:10px;
        background-color:#9b0909;
    }
</style>