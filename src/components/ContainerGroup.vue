<template>
  <div class="container-group">
    <template v-for="(item, index) in invalid">
      <p v-if="invalid.length>0" :key="index" class="invalid-item" :style="'top:'+(10+index*38)+'px'">不好意思，{{ item }} 元素不是ContainerGroup组件的有效直接子元素，请使用Container元素代替</p>
    </template>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ContainerGroup',
  data() {
    return {
      invalid: []
    }
  },
  created() {
    this.$slots.default.forEach((item) => {
      if (!item.componentOptions || item.componentOptions.tag !== 'Container') {
        if (item.tag) {
          this.invalid.push(item.tag)
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
.container-group {
  height: 100%;
  display: flex;
  flex-direction: column;
  .invalid-item{
    position: fixed;
    color:red;
    z-index: 999;
    background: lemonchiffon;
    padding:8px 10px;
    box-shadow: 0px 0px 10px #dedede;
  }
}
</style>
