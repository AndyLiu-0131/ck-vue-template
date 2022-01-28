<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :bread-list="breadList" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :bread-list="breadList">></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      breadList: []
    }
  }
}
</script>
<style lang="less">
@import url("@/assets/style/public.less");
</style>
