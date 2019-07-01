<template>
    <div class="mv-list clearfix">
        <div 
            class="video-item"
            v-for="video in list"
            :key="video.id">
            <router-link
                :to="{name:video.type === 0 ? 'mv' : 'video',query:{id:video.vid}}"
                class="video-img">
                <img :src="video.coverUrl" alt="">
                <div class="count-mask">
                    <div class="play-count">
                        <i class="icon-video"></i>
                        <span>{{ video.playTime | count2str }}</span>
                    </div>
                </div>
                <div class="duration">{{ video.durationms | duration2str }}</div>
            </router-link>
            <div class="name f-thide">
                <span class="mv-img" v-if="video.type === 0"></span>
                <router-link
                    v-html="wrapKeywords(video.title)"
                    :title="video.title"
                    :to="{name:video.type === 0 ? 'mv' : 'video',query:{id:video.vid}}"
                    class="title">
                </router-link>
            </div>
            <div class="name f-thide">
                by <router-link
                    v-html="wrapKeywords(video.creator[0].userName)"
                    :title="video.creator[0].userName"
                    :to="{name:'userHome',query:{id:video.creator[0].userId}}"
                    class="title">
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import searchMixin from './searchMixin'
    export default {
        mixins:[searchMixin],
        filters:{
            count2str(num){
                if(n < 10000){
                    return '' + n;
                }else{
                    var s =  (n/10000).toFixed(1) + '万';
                    if(s.length >=6){
                        s = s.split('.')[0] + '万'
                    }
                    return s;
                }
            },
            duration2str(duration){
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mv-list{
        margin:0 -26px -38px 0;
        .video-item{
            float: left;
            margin:0 26px 38px 0;
        }
        .video-img{
            position: relative;
            display: block;
            width:159px;
            margin-bottom: 4px;
            img{
                width:100%;
                height:90px;
            }
            .count-mask{
                position: absolute;
                top:0;
                height:20px;
                right:0;
                width:90px;
                color:#fff;
                line-height: 20px;
                background:url(../../../assets/play-count-mask.png) no-repeat 0 0;
            }
            .play-count{
                float: right;
                margin-right: 6px;
            }
            .icon-video{
                float: left;
                width:16px;
                height:10px;
                margin:6px 4px 0 0;
                background:url(../../../assets/icon2.png) no-repeat -60px -310px;
            }
            .duration{
                position: absolute;
                left:4px;
                bottom:0;
                line-height: 20px;
                color:#fff;
                text-shadow:3px #000;
            }
        }
        .name{
            width:150px;
            line-height: 24px;
            height:24px;
            color:#999;
            .mv-img{
                display:inline-block;
                width:26px;
                height:16px;
                margin-top: -3px;
                vertical-align: middle;
                background:url(../../../assets/icon2.png) no-repeat -270px -480px;
            }
            a:hover{
                text-decoration: underline;
            }
        }
    }
</style>


