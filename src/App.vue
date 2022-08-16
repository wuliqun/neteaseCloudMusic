<template>
  <div class="app">{{ count }}</div>
  <site-footer></site-footer>
</template>
<script lang="ts" setup>
import SiteFooter from 'CMT/siteFooter';
const count = "INDEX"
</script>
<style lang="scss">
.app{
  color:red;
}
</style>