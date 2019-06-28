<template>
    <div class="playlist-head">
        <div class="title-wrapper clearfix">
            <div class="tag-wrapper">
                <detail-tag type="playlist"></detail-tag>
            </div>
            <h2 class="title">{{ playlist.name }}</h2>
        </div>
    </div>
</template>
<script>
    import {
			CollectButton,
			CommentButton,
			PlayAddButton,
			DownloadButton,
			ShareButton
        }from '@components/buttons'
    import DetailTag from '@components/detailTag'
    export default {
        props:{
            playlist:Object
        }
    }
</script>
<style lang="scss" scoped>
    .song-head{
        .title-wrapper{
            margin-bottom: 15px;
            .tag-wrapper{
                float: left;
            }
            .title{
                float: left;
                margin-left: 10px;
                font-size: 24px;
                line-height: 24px;
                color:#333;
            }
        }
    }
</style>
