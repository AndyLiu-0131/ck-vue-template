<template>
  <div class="dev-tool">
    <div class="too-tip">
      <span @click="showTool=true">开发信息</span>
      <span v-if="showTool" style="font-size:14px" @click="showTool=false">X</span>
    </div>
    <table v-show="showTool" class="info-list" style="color:#ddd;font-size:12px">
      <tr>
        <td>应用名称:</td>
        <td>{{ $baseInfo.BASE_TITLE }}</td>
      </tr>
      <tr>
        <td>接口地址:</td>
        <td>{{ $baseInfo.BASE_URL }}</td>
      </tr>
      <tr>
        <td>SCOKET地址:</td>
        <td>{{ $baseInfo.SCOKET_HOST }}</td>
      </tr>
      <tr>
        <td>UI地址:</td>
        <td><a href="http://" target="_blank">http://</a></td>
      </tr>
      <tr>
        <td>原型地址:</td>
        <td><a href="http://" target="_blank">http://</a></td>
      </tr>
      <tr>
        <td>组件使用说明:</td>
        <td><a href="http://" target="_blank">http://</a></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'DevTool',
  data() {
    return {
      showTool: false,
      netWorkStatus: '已连接'
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
.dev-tool {
  position: fixed;
  bottom: 0;
  left: 10px;
  color: #fff;
  line-height: 100%;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 2px;
  z-index: 9999;
  text-align: left;
  padding:8px;
  box-shadow: 0px 0px 12px black;
}
.too-tip {
  user-select: none;
  cursor: pointer;
  font-size:15px;
  padding-bottom:10px;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #999
}
.info-list{
  border-collapse:collapse
}
.info-list tr td{
  border-bottom:1px dashed #999;
  padding:8px 0px;
}
.info-list tr td:nth-child(1){
  width: 160px;
}
</style>
