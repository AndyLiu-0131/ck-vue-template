<template>
  <div class="notice">
    <el-badge :is-dot="isShow">
      <el-popover
        class="pad0"
        placement="bottom-end"
        width="334"
        trigger="click"
      >
        <div class="notice-box">
          <div class="top">
            <div
              class="tags"
              :class="{ active: topTag }"
              @click="topTagActive(1)"
            >
              <span>通知（0）</span>
            </div>
            <div
              class="tags"
              :class="{ active: !topTag }"
              @click="topTagActive(0)"
            >
              <span>消息（0）</span>
            </div>
          </div>
          <div class="conter">
            <ul class="list">
              <li class="unread list-item">
                {{ '' }}
              </li>
              <li class="read list-item">
                {{ '' }}
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="bom-btn bom-btn-left">清空通知</div>
            <div class="bom-btn">查看更多</div>
          </div>
        </div>
        <i slot="reference" class="el-icon-message-solid" />
      </el-popover>
    </el-badge>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  components: {},
  data() {
    return {
      topTag: 1,
      isShow: false
    }
  },
  created() {},
  methods: {
    topTagActive(num) {
      this.topTag = num
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
.notice {
  .el-icon-message-solid {
    font-size: 16px;
  }
}
.notice-box {
  .top {
    display: flex;
    .tags {
      width: 50%;
      text-align: center;
      line-height: 22px;
      span {
        cursor: pointer;
        font-size: 16px;
      }
    }
    .active {
      color: @themColor;
      span {
        padding: 0 10px 10px;
        display: inline-block;
        border-bottom: 2px solid @themColor;
      }
    }
  }
  .conter {
    border-top: 1px solid #eee;
    .list {
      list-style: none;
    }
    .list-item {
      list-style: none;
      padding: 12px 12px 10px;
      // border-bottom: 1px solid #eee;
      padding-left: 60px;
      background-size: 30px 30px;
      background-position: 15px 20px;
      background-repeat: no-repeat;
      .type {
        color: #555;
        line-height: 26px;
        font-size: 16px;
      }
      .time {
        font-size: 14px;
        line-height: 24px;
        color: #999;
      }
    }
    .unread {
      // background-image: url("~@/assets/image/icon-user.png");
    }
    .read {
      // background-image: url("~@/assets/image/icon-user.png");
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    .bom-btn {
      cursor: pointer;
      font-size: 16px;
      width: 50%;
      padding-top: 8px;
      line-height: 24px;
      text-align: center;
    }
    .bom-btn-left {
      border-right: 1px solid #eee;
    }
  }
}
</style>
