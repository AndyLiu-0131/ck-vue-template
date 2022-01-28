<template>
  <div>
    <div class="screen-setting" @click="changeFullStatus">
      <img v-if="!isFullScrren" src="@/assets/image/full-screen.png">
      <img v-else src="@/assets/image/no-full-screen.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'FullScreen',
  data() {
    return { isFullScrren: false }
  },
  created() {
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    window.addEventListener('resize', (event) => {
      console.log(event)
      if (screenWidth === window.outerWidth && screenHeight === window.outerHeight) {
        console.log('全屏')
      } else {
        console.log('非全屏')
      }
    })
  },
  methods: {
    changeFullStatus() {
      if (!this.isFullScrren) {
        // 设置全屏
        this.enterFullscreen()
      } else {
        this.exitFullscreen()
      }
    },
    enterFullscreen() {
      var docElm = document.documentElement
      if (docElm.requestFullscreen) {
        // W3C
        docElm.requestFullscreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (docElm.mozRequestFullScreen) {
        // FireFox
        docElm.mozRequestFullScreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (docElm.webkitRequestFullScreen) {
        // Chrome等
        docElm.webkitRequestFullScreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (docElm.msRequestFullscreen) {
        // IE11
        docElm.msRequestFullscreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        // W3C
        document.exitFullscreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (document.mozCancelFullScreen) {
        // FireFox
        document.mozCancelFullScreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (document.webkitCancelFullScreen) {
        // Chrome等
        document.webkitCancelFullScreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
      if (document.msExitFullscreen) {
        // IE11
        document.msExitFullscreen()
        this.isFullScrren = !this.isFullScrren
        return
      }
    }
  }
}
</script>
<style scoped lang="less" >
.screen-setting {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
  }
}
</style>
