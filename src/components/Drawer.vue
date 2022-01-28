<template>
  <transition name="fade">
    <div v-show="visible" class="ck-drawer">
      <div class="left-container" @click="$emit('cancel')" />
      <div class="ck-drawer-line" @mousedown="getNowPosition" @mouseup="mouseDown = false" />
      <div
        ref="rightbox"
        :class="!mouseDown?'right-container animate':'right-container'"
        :style="
          'width:' + (width || '200px') + ';margin-right:' + marginRight + 'px'
        "
      >
        <div v-if="!hideHeader" class="drawer-header" :style="'border-bottom:1px solid' + (headerColor || '#dcdfe6')">
          <span>{{ title || "请设置标题" }}</span>
          <i
            class="el-icon-close"
            style="cursor: pointer"
            @click="$emit('cancel')"
          />
        </div>
        <div class="drawer-body">
          <slot />
        </div>
        <div v-if="!hideFooter" class="drawer-footer">
          <template v-for="(item, index) in footerBtns">
            <Button
              v-if="!item.hide"
              :key="index"
              :type="item.type"
              @click="$emit(item.trigger)"
            >{{ item.text }}</Button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CkDrawer',
  // eslint-disable-next-line vue/require-prop-types
  props: ['visible', 'width', 'title', 'hideHeader', 'hideFooter', 'footerBtns', 'headerColor'],
  data() {
    return {
      marginRight: this.setInitWidth(this.width),
      mouseDown: false,
      areaWidth: 0,
      posX: 0,
      distance: 0
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          const timeout = setTimeout(() => {
            this.marginRight = 0
            window.clearTimeout(timeout)
          }, 10)
        } else {
          const timeout = setTimeout(() => {
            this.marginRight = -this.$refs.rightbox.offsetWidth
            window.clearTimeout(timeout)
          }, 10)
        }
      }
    }
  },
  created() {
    document.addEventListener('mousemove', (event) => {
      this.moveDrawLine(event)
    })
    document.addEventListener('mouseup', (event) => {
      this.mouseDown = false
    })
  },
  methods: {
    setInitWidth(iniwidth) {
      console.log(this.width)
      if (isNaN(Number(iniwidth))) {
        return -1920
      } else {
        return Number(iniwidth)
      }
    },
    getNowPosition(event) {
      this.areaWidth = this.$refs.rightbox.offsetWidth
      this.posX = event.pageX
      this.mouseDown = true
    },
    // 移动drawerline  moveDrawLine
    moveDrawLine(event) {
      if (!this.mouseDown) {
        return
      }
      const distance = this.posX - event.pageX
      this.areaWidth = this.areaWidth + distance
      this.$refs.rightbox.style.width = this.areaWidth + 'px'
      this.posX = event.pageX
      // console.log(event)
    }
  }
}
</script>
<style lang="less" scoped>
.ck-drawer {
  position: fixed;
  margin: auto;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  .right-container {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .left-container {
    flex-grow: 1;
    height: 100%;
  }
  .drawer-header {
    // border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drawer-body {
    flex-grow: 1;
    overflow-y: auto;
  }
  .drawer-footer {
    border-top: 1px solid #dcdfe6;
    padding: 10px;
    overflow: hidden;
    Button {
      float: right;
      margin: 0px 10px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.ck-drawer-line{
  width:3px;
  background:#dcdfe6;
  height:100%;
  cursor:w-resize;
  left:0px;
  user-select: none;
}
</style>

