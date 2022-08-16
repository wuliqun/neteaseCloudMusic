<template>
  <div class="app-dld">
    <small-section-title title="网易云音乐多端下载"></small-section-title>
    <div class="dld-list">
      <div class="ios icon"></div>
      <div class="win icon"></div>
      <div class="android icon"></div>
    </div>
    <div class="desc">同步歌单，随时畅听320k好音乐</div>
  </div>
</template>
<script>
import { SmallSectionTitle } from '@components/unit'
export default {
  components: {
    SmallSectionTitle
  }
}
</script>
<style lang="scss" scoped>
.app-dld {
  .dld-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 6px;

    .icon {
      width: 31px;
      height: 48px;
      cursor: pointer;
      background: url(../../img/app-icon.png) no-repeat 0 0;
    }

    .ios {
      &:hover {
        background-position: 0 -66px;
      }
    }

    .win {
      width: 61px;
      background-position: 0 -150px;

      &:hover {
        background-position: 0 -210px;
      }
    }

    .android {
      background-position: 0 -277px;

      &:hover {
        background-position: 0 -358px;
      }
    }
  }

  .desc {
    line-height: 30px;
    font-size: 12px;
    color: #999;
  }
}
</style>


