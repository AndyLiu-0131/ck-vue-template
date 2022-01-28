<template>
  <div ref="listCon" class="tab-list-content">
    <div class="left-run run-icon" @click="runToLeft">
      <i class="el-icon-arrow-left" />
    </div>
    <div ref="tabCon" class="tab-content animate">
      <div
        v-for="(item, index) in tabList"
        :key="item.url"
        class="tab-item"
        :class="currentIndex === index ? 'tab-active' : ''"
        @contextmenu="rightClickevent($event,index)"
        @click.stop="activeCurrentItem(index)"
      >
        <span :title="item.name">{{ item.name }}</span>
        <i
          v-if="item.url !== '/index'"
          class="el-icon-close"
          @click.stop="removeCurrentItem(index)"
        />
      </div>
    </div>
    <div class="right-run run-icon" @click="runToRight">
      <i class="el-icon-arrow-right" />
    </div>
    <div
      v-show="contexMenuShow"
      class="operation-menu-list"
      :style="'left:' + position.pageX + 'px;top:' + position.pageY + 'px'"
    >
      <ul class="operation-menu-list-ul">
        <li :class="tabList.length<=1?'disabled-select':''" @click="closeTags(0)">关闭所有标签</li>
        <li :class="rightClickCurrentIndex===tabList.length-1?'disabled-select':''" @click="closeTags(1)">关闭之后标签</li>
        <li :class="rightClickCurrentIndex<=1?'disabled-select':''" @click="closeTags(2)">关闭之前标签</li>
        <li style="border:none" :class="tabList.length<=2?'disabled-select':''" @click="closeTags(3)">关闭其他标签</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageTab',
  data() {
    return {
      currentIndex: 0,
      contexMenuShow: false,
      containerWidth: '',
      rightClickCurrentIndex: -1,
      blackPathList: ['/login'],
      position: {
        pageX: 0,
        pageY: 0
      },
      tabList: [
        {
          name: '首页',
          url: '/index',
          path: '/index'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (this.blackPathList.indexOf(val.path) > -1) {
          return
        }

        // 当前栈中查找
        const activeIndex = this.tabList.filter((item, index) => {
          if (val.path === item.url) {
            this.currentIndex = index
            return item
          }
        })

        if (activeIndex.length === 0) {
          this.tabList.push({
            name: val.name,
            path: val.fullPath,
            url: val.path
          })
          this.activeCurrentItem(this.tabList.length - 1)
        } else {
          this.activeCurrentItem(this.currentIndex)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initContainerWidth()
    if (
      localStorage.pageTabList &&
      localStorage.activeIndex !== undefined
    ) {
      this.tabList = JSON.parse(localStorage.pageTabList)
      this.currentIndex = Number(localStorage.activeIndex)
      this.activeCurrentItem(this.currentIndex)
    }
    window.addEventListener('resize', this.initContainerWidth)
    document.addEventListener('click', (event) => {
      this.contexMenuShow = event.target.className === 'operation-menu-list'
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initContainerWidth)
  },
  methods: {
    rightClickevent(event, index) {
      event.preventDefault()
      this.position = {
        pageX: event.clientX,
        pageY: event.clientY
      }
      this.contexMenuShow = true
      this.rightClickCurrentIndex = index
    },
    initContainerWidth() {
      this.containerWidth = this.$refs.listCon.offsetWidth
    },
    activeCurrentItem(index) {
      if (
        this.$router.history.current.path !== this.tabList[index].url &&
        this.blackPathList.indexOf(this.$router.history.current.path) === -1
      ) {
        this.$router.push(this.tabList[index].path)
      }
      this.currentIndex = index
      localStorage.activeIndex = this.currentIndex
      localStorage.pageTabList = JSON.stringify(this.tabList)
      if (!this.$refs.tabCon) {
        return
      }
      const itemWidth = (this.currentIndex + 1.5) * 120
      if (itemWidth > this.containerWidth) {
        this.$refs.tabCon.style.marginLeft =
          this.containerWidth - itemWidth + 'px'
      } else {
        this.$refs.tabCon.style.marginLeft = '0px'
      }
    },
    removeCurrentItem(index) {
      this.tabList.splice(index, 1)
      localStorage.pageTabList = JSON.stringify(this.tabList)
      if (index < this.currentIndex) {
        this.activeCurrentItem(this.currentIndex - 1)
        return
      }
      if (index === this.currentIndex && index === this.tabList.length) {
        this.activeCurrentItem(index - 1)
        return
      }
      if (index === this.currentIndex && index !== this.tabList.length) {
        this.activeCurrentItem(index)
      }
    },
    runToLeft() {
      const leftDistance = Number(
        this.$refs.tabCon.style.marginLeft.replace('px', '')
      )
      if (leftDistance === 0) {
        return
      }
      if (leftDistance < 0) {
        if (Math.abs(leftDistance) <= this.containerWidth) {
          this.$refs.tabCon.style.marginLeft = '0px'
        } else {
          this.$refs.tabCon.style.marginLeft =
            leftDistance + this.containerWidth + 'px'
        }
      }
    },
    runToRight() {
      const leftDistance = Number(
        this.$refs.tabCon.style.marginLeft.replace('px', '')
      )
      const totalWidth = this.tabList.length * 124 // 容器宽度
      const containerWidth = this.containerWidth // 视觉宽度
      // 当容器宽度小于视觉宽度
      if (totalWidth <= containerWidth) {
        return
      }
      if (
        totalWidth - containerWidth - Math.abs(leftDistance) <=
        containerWidth
      ) {
        this.$refs.tabCon.style.marginLeft =
          leftDistance -
          (totalWidth - containerWidth - Math.abs(leftDistance)) +
          'px'
      } else {
        this.$refs.tabCon.style.marginLeft =
          leftDistance - containerWidth + 'px'
      }
    },
    // 批量关闭标签
    closeTags(tags) {
      switch (tags) {
        case 0:
          this.tabList = [this.tabList[0]]
          this.activeCurrentItem(0)
          break
        case 1:
          // 关闭之后
          this.tabList = this.tabList.slice(0, this.rightClickCurrentIndex + 1)
          if (this.rightClickCurrentIndex < this.currentIndex) {
            this.activeCurrentItem(this.rightClickCurrentIndex)
          } else {
            this.activeCurrentItem(this.currentIndex)
          }
          break
        case 2:
          // 关闭之前
          this.tabList = [this.tabList[0], ...this.tabList.slice(this.rightClickCurrentIndex, this.tabList.length)]
          if (this.currentIndex < this.rightClickCurrentIndex) {
            this.activeCurrentItem(1)
          } else {
            this.activeCurrentItem(this.currentIndex - this.rightClickCurrentIndex + 1)
          }
          break
        case 3:
          // 关闭其他标签
          this.tabList = [this.tabList[0], this.tabList[this.rightClickCurrentIndex]]
          this.activeCurrentItem(1)
          break
        default:
          break
      }
    }
  }
}
</script>
<style scoped lang="less">
// @import url("@/assets/style/public.less");
.tab-list-content {
  overflow: hidden;
  background: #fff;
  position: relative;
  padding: 0px 10px;
}
.run-icon {
  position: absolute;
  height: 100%;
  width: 9px;
  background: #fff;
  color: #2265f9;
  z-index: 9;
  top: 2px;
  font-size: 12px;
  cursor: pointer;
  i {
    position: absolute;
    top: 11px;
  }
}
.left-run {
  left: 0px;
  // box-shadow: 0px 0px 4px #2265f9;
}
.right-run {
  right: 0px;
  // box-shadow: 0px 0px 4px #dedede;
}
.tab-content {
  height: 35px;
  white-space: nowrap;
}
.tab-active {
  background: #2265f9 !important;
  color: #fff !important;
  z-index: 9;
}
.tab-item {
  text-align: left;
  width: 120px;
  display: inline-block;
  margin-top: 5px;
  height: 32px;
  line-height: 32px;
  position: relative;
  border-top-right-radius: 6px;
  background: #f0f2f5;
  cursor: pointer;
  margin-right: 2px;
  color: #666;
  span {
    display: block;
    width: 70%;
    padding-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-icon-close {
    position: absolute;
    right: 4px;
    top: 4px;
    font-size: 12px;
  }
}
.tab-item:nth-child(1) {
  border-top-left-radius: 0px !important;
  margin-left: 5px;
}
.operation-menu-list {
  position: fixed;
  background: #fff;
  width: 100px;
  border: 1px solid #eeeeee;
  z-index: 9999;
  border-radius: 3px;
  box-shadow: 0px 1px 1px #efefef;
  padding: 8px;
}
.operation-menu-list-ul{
  list-style: none;
  margin:0px;
  padding:0px;
  li{
    height: 28px;
    line-height: 28px;
    border-bottom:1px solid #efefef;
    color:#606266;
    font-size: 12px;
    cursor: pointer;
    :hover{
      background: #dedede !important;
    }
  }
}
.disabled-select{
  color:#dedede !important;
  pointer-events: none;
}
</style>
