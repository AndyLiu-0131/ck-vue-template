<template>
  <ContainerGroup>
    <Container height="fill">
      <div class="not-found" />
      <button @click="goHome">回到首页</button>
    </Container>
  </ContainerGroup>
</template>
<script>
import ContainerGroup from '../../components/ContainerGroup.vue'
export default {
  name: 'Notfound',
  components: { ContainerGroup },
  methods: {
    goHome() {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .not-found{
    height: 500px;
    width: 500px;
    background-image: url('../../assets/image/404.png');
    background-position: center center;
    background-size: 100% 100%;
  }
  button{
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    color: #6783d8;
    border: 1px solid #6783d8;
    padding: 8px 20px;
    border-radius: 20px;
  }
</style>
