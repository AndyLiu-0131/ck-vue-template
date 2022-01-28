<template>
  <div class="sider-bar animate" :class="{ 'close-sider': siderChange }">
    <div class="logo-area">
      <!-- <img v-if="siderChange" src="../assets/image/login-logo.png"> -->
      <img src="../assets/image/v2_quettt.png">
    </div>
    <div class="sider-bar-control" />
    <div class="menu-list scrollbar">
      <el-menu unique-opened :default-active="$route.path">
        <template v-for="item in menuList">
          <template v-if="item.childNodes&&item.childNodes.length>0">
            <el-submenu :key="item.id" :index="item.path">
              <template slot="title">
                <span>
                  <div class="nav-icon">
                    <img :src="getIconSrc(item.iconPath)" alt="">
                  </div>
                  <span slot="title">{{ item.name }}</span>
                </span>
              </template>
              <template v-for="sItem in item.childNodes">
                <template v-if="sItem.childNodes&&sItem.childNodes.length>0">
                  <el-submenu :key="sItem.id" :index="sItem.path">
                    <template slot="title">
                      <span slot="title">{{ sItem.name }}</span>
                    </template>
                    <template v-for="tItem in sItem.childNodes">
                      <el-menu-item :key="tItem.id" :index="tItem.path" @click="toPage(tItem)">{{ tItem.name }}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :key="sItem.id" :index="sItem.path" @click="toPage(sItem)">{{ sItem.name }}</el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="item.id" :index="item.path" @click="toPage(item)" style="font-size:15px">
              <div class="nav-icon">
                <img :src="getIconSrc(item.iconPath)" alt="">
              </div>{{ item.name }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <!--  -->
    </div>
  </div>
</template>
<script>
import menuItems from '../utils/menuList'
export default {
  name: 'Sidebar',
  components: {
  },
  data() {
    return {
      siderChange: true,
      menuList: menuItems,
      menuListBackups: menuItems,
      currentPath: ''
    }
  },
  watch: {
    '$store.state.openSider': function(val, od) {
      this.siderChange = val
      this.$emit('changeSider', val)
    },
    $route: function(val, od) {
      this.currentPath = val.path
    }
  },
  created() {
    // this.getMenuList()
    this.currentPath = this.$route.path
  },
  methods: {
    // getMenuList() {
    //   this.menuList = JSON.parse(localStorage.menuList)
    // },
    toPage(item) {
      // if (item.path === this.currentPath) {
      //   return
      // }
      // this.$router.push(item.path)
    },
    getIconSrc(path) {
      // const newPath = require('../assets/image/' + path)
      // return newPath
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
.sider-bar {
  height: 100%;
  width: 64px;
  background: @themColor;
  position: relative;
  z-index: 1;
  // box-shadow: 2px 0px 6px #999;
  .logo-area {
    height: @logoHeight;
    box-shadow: 0px 0px 3px #dedede;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 80%;
    }
  }
  .menu-list {
    height: calc(100% - 50px);
    overflow-y: auto;
    overflow-x: hidden;
    background: @menuBgColor;
    // margin-top:10px;
    padding: 30px 4px;
    position: relative;
  }
}
.close-sider {
  width: @menuWidth;
  .menu-list {
    padding: 30px 16px;
  }
}
.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #dddddd;
}
.scrollbar::-webkit-scrollbar-track {
  background: #f0f2f5;
}
/deep/ .el-menu{
  background-color: #e8ecf8;
  border: none !important;
}
/deep/ .el-submenu__title{
  height: 40px;
  line-height: 36px;
  font-size: 15px;
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}
/deep/ .el-submenu__title:hover{
  background-color: #2178FB;
  color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #2178fb;
  img{
    filter: brightness(0) invert(1);
  }
}
.el-menu-item{
  height: 40px !important;
  line-height: 40px !important;
  margin-top: 8px !important;
  margin-bottom: 8px !important;
  padding-right: 8px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // padding: 0 20px !important;
}
.el-menu-item:hover{
  background-color: #2178FB;
  color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #2178fb;
  img{
    filter: brightness(0) invert(1);
  }
}
/deep/ .el-menu-item.is-active{
  background-color: #2178FB;
  color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #2178fb;
  img{
    filter: brightness(0) invert(1);
  }
}
.nav-icon{
  display: inline-flex;
  height: 19px;
  width: 19px;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
}
</style>
