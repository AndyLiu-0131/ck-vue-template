<template>
  <div class="sys-main-container">
    <div class="sys-menu">
      <SiderBar />
    </div>
    <div class="sys-right-container">
      <HeaderBar />
      <div class="tab-box">
        <div class="tab-container">
          <PageTab />
        </div>
        <div class="right-operation">
          <span style="padding-right: 5px">
            <i class="el-icon-s-home" style="font-size: 18px" @click="goHome" />
          </span>
          <span>
            <i
              class="el-icon-refresh"
              style="font-size: 16px"
              @click="refresh"
            />
          </span>
        </div>
      </div>
      <div class="content-view-container">
        <router-view v-if="!refreshComponent" style="min-width: 1000px" />
        <div v-else class="refresh-loading" />
      </div>
      <!-- <div class="sider-bar-control" @click="controlSiderBar">
        <i v-if="openSider" class="el-icon-arrow-left" />
        <i v-else class="el-icon-arrow-right" />
      </div> -->
      <FooterBar />
    </div>
  </div>
</template>
<script>
import HeaderBar from '@/layout/HeaderBar'
import FooterBar from '@/layout/FooterBar'
import SiderBar from '@/layout/SiderBar'
import PageTab from '@/layout/PageTab'
export default {
  name: 'Home',
  components: {
    HeaderBar,
    FooterBar,
    SiderBar,
    PageTab
  },
  data() {
    return {
      width: '180px',
      breads: [],
      openSider: true,
      refreshComponent: false
    }
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push('/index')
    },
    refresh() {
      this.refreshComponent = true
      setTimeout(() => {
        this.refreshComponent = false
      }, 0)
    },
    controlSiderBar() {
      this.openSider = !this.openSider
      this.$store.commit('setOpenSider', this.openSider)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/style/public.less");
.sys-right-container {
  background: #f0f2f5;
  height: 100%;
  width: calc(100% - @menuWidth);
  position: relative;
  .sider-bar-control {
    position: absolute;
    left: 0px;
    top: 50%;
    width: 20px;
    height: 80px;
    background: @themColor;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    i {
      line-height: 80px;
      color: #fff;
      font-size: 20px;
    }
  }
}
.sys-content-container {
  height: 33px;
}
.content-view-container {
  height: calc(100vh - 145px);
  overflow-y: auto;
  margin: 0px 10px 0px 10px;
}
.tab-box {
  background: #fff;
  height: 44px;
  margin-bottom: 10px;
  overflow: hidden;
  border-bottom: 1px solid #e7ecf8;
  .tab-container {
    float: left;
    overflow: hidden;
    width: calc(100% - 71px);
  }
  .right-operation {
    float: right;
    width: 70px;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
  }
}
.refresh-loading {
  height: 100%;
  background: #fff;
}
</style>
