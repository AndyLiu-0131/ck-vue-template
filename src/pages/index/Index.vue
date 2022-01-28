<template>
  <ContainerGroup>
    <Container class="index">
      这里是首页，从这里开始配置你的新项目 ~
    </Container>
  </ContainerGroup>
</template>
<script>
export default {
  name: 'Index',
  components: {
  },
  data() {
    return {
      searchInput: ''
    }
  },
  mounted() {},
  methods: {
  }
}
</script>
<style lang="less" scoped>
  .index{
    height: 100%;
  }
</style>
