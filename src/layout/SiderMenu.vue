<template>
  <el-menu-item :index="menus.id" @click="toPage(menus)">
    {{ menus.childNodes && menus.childNodes.length>0? '' : menus.name }}
    <template v-if="menus.childNodes && menus.childNodes.length>0">
      <el-submenu :index="menus.id+'-'+index">
        <template slot="title">
          <i class="el-icon-menu" />
          <span slot="title">{{ menus.name }}</span>
        </template>
        <template v-for="(item, index2) in menus.childNodes">
          <SiderMenu :key="item.id" :menus="item" :index="index2" />
        </template>
      </el-submenu>
    </template>
  </el-menu-item>
</template>
<script>
export default {
  name: 'SiderMenu',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    menus: {
      type: Object,
      value: []
    },
    // eslint-disable-next-line vue/require-default-prop
    index: {
      type: Number,
      value: 0
    },
    // eslint-disable-next-line vue/require-default-prop
    currentPath: {
      type: String,
      value: ''
    }
  },
  data() {
    return {
      deep: this.treeDeep || 20,
      menuHeight: 0,
      showText: false
    }
  },
  watch: {
    '$store.state.openSider': function(val, od) {
      this.showText = val
      if (!this.showText) {
        this.menuHeight = 0
        this.menus.open = false
        // this.menus.forEach((element) => {
        //   element.open = false
        // })
      }
      this.$forceUpdate()
    }
  },
  created() {
    this.deep = this.deep + 20
    this.showText = true
  },
  methods: {
    toggleMenu(item) {
      this.menus.forEach((element) => {
        if (element.id !== item.id) {
          element.open = false
        }
      })
      item.open = !item.open
      if (item.open) {
        this.openMyHeight(item)
      } else {
        this.closeMyHeight(item)
      }
      this.$forceUpdate()
    },
    openMyHeight(item) {
      if (item.childNodes && item.childNodes.length > 0) {
        this.menuHeight = item.childNodes.length * 40 + 'px'
        setTimeout(() => {
          this.menuHeight = ''
        }, 200)
      }
    },
    closeMyHeight(item) {
      if (item.childNodes && item.childNodes.length > 0) {
        this.menuHeight = 0 + 'px'
        setTimeout(() => {
          this.menuHeight = '0'
        }, 0)
      }
    },
    toPage(item) {
      if (item.path === this.currentPath) {
        return
      }
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
@textColor: #323433;
.child-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  > span {
    font-size: @font14;
    height: 40px;
    display: block;
    align-items: center;
    justify-content: flex-start;
  }
  span {
    color: @textColor;
    display: block;
    height: 40px;
    line-height: 40px;
  }
  span:hover{
    // background: @menuHoverColor;
    color:@textColor;
  }
  span:hover .right-icon{
    color:@textColor;
  }
  span:hover .left-icon{
    color:@textColor;
  }
}
.open-child {
  height: auto;
}
.right-icon {
  position: absolute;
  right: 20px;
  top: 13px;
  font-size: 12px;
  color: @textColor;
}
.left-icon {
  font-size: 14px;
  color: @textColor;
  margin-right: 6px;
}
.transform {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg);
}
.menu-active {
  // background: @menuHoverColor;
  background: -webkit-linear-gradient(to right,@menuHoverColorLeft,@menuHoverColorRight);
  background: -moz-linear-gradient(to right,@menuHoverColorLeft,@menuHoverColorRight);
  background: linear-gradient(to right,@menuHoverColorLeft,@menuHoverColorRight);
  border-radius: 6px;
  box-shadow: 0px 6px 24px 0px rgba(33,101,249,0.50);
  color: #fff !important;
  .left-icon{
    color: #fff !important;
  }
}
.children-menu {
  // background: @mentChildrenColor;
  transition: all 0.2s;
  -webkit-transition: all 0.2s; /* Safari */
}
</style>
