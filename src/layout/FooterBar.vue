<template>
  <div class="footer-bar">
    {{ $baseInfo.COPY_RIGHT }}
    <template v-if="$baseInfo.APP_ENV==='development'">
      <!-- <DevTool /> -->
    </template>
  </div>
</template>
<script>
import DevTool from './DevTool'
export default {
  name: 'FooterBar',
  components: { DevTool }
}
</script>
<style lang="less" scoped>
.footer-bar{
  text-align: center;
  height: 40px;
  color:#999;
  line-height:40px;
  font-size: 14px;
}
</style>
