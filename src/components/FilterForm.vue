<template>
  <div class="ck-filter-form" :style="{ height: containerHeight }">
    <div ref="input-container" class="form-item-container">
      <template v-for="(item, index) in elements">
        <div :key="index" class="form-item">
          <div v-if="item.label" class="form-item-label">{{ item.label }}：</div>
          <component
            :is="'el-'+item.type"
            v-model="item.value"
            :style="'width:' + (item.width || 130) + 'px'"
            size="mini"
            :placeholder="item.label"
            :type="item.mode"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :format="item.format||'yyyy-MM-dd'"
            :value-format="item.format||'yyyy-MM-dd'"
            range-separator="至"
            :filterable="elements[index].filterable"
            :remote="elements[index].remote"
            :remote-method="elements[index].remoteMethod"
            :clearable="elements[index].clearable"
          >
            <el-option
              v-for="(opt, oIndex) in item.options"
              :key="opt[elements[index].itemValue] || opt.value || oIndex"
              :label="opt[elements[index].itemLabel] || opt.label"
              :value="opt[elements[index].itemValue] || opt.value"
            />
          </component>
        </div>
      </template>
    </div>
    <div class="right-btn-container">
      <Button icon="search" @click="submitFormFilter">查询</Button>
      <Button icon="reset" type="info" @click="reset">重置</Button>
      <slot />
      <div>
        <div
          v-show="showCloseAndOpen"
          class="more-text"
          @click="openAndCloseFilterForm"
        >{{ openOrCloseText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CkForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    elements: Array,
    noreset: Boolean,
    noimmediate: Boolean
  },
  data() {
    return {
      containerHeight: '35px',
      showCloseAndOpen: false,
      openOrCloseText: '展开',
      showSubmitBtn: false,
      showResetBtn: false,
      eleParms: [],
      copy: []
    }
  },
  created() {
    this.showSubmitBtn = this.$listeners.submit
    this.showResetBtn = this.$listeners.reset
    this.copy = JSON.parse(JSON.stringify(this.elements))
    this.eleParms = this.elements.map(item => {
      return {
        key: item.key,
        value: item.value || ''
      }
    })
    // 立即执行
    if (!this.noimmediate) {
      this.submitFormFilter()
    }
  },
  mounted() {
    this.initShowCloseOrOpen()
    window.addEventListener('resize', this.initShowCloseOrOpen)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initShowCloseOrOpen)
  },
  methods: {
    getParms() {
      const parms = {}
      this.eleParms.forEach(item => {
        if (item.value) {
          parms[item.key] = item.value
        }
      })
      return parms
    },
    change(val, handler) {
      handler(val)
    },
    initShowCloseOrOpen() {
      this.showCloseAndOpen = this.$refs['input-container'].scrollHeight > 35
    },
    reset() {
      // this.eleParms.forEach(item => {
      //   item.value = ''
      // })
      // console.log(this.getParms())
      // this.$emit('reset', this.getParms())
      const temp = this.elements.map(item => {
        this.copy.forEach(sup => {
          if (item.label === sup.label) {
            item.value = sup.value
          }
        })
        return item
      })
      this.$emit('update:elements', temp)
    },
    submitFormFilter() {
      this.$emit('submit', this.getParms())
    },
    openAndCloseFilterForm() {
      this.containerHeight = this.openOrCloseText === '展开' ? 'auto' : '35px'
      this.openOrCloseText = this.openOrCloseText === '展开' ? '收起' : '展开'
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
.ck-filter-form {
  display: flex;
  align-items: top;
  overflow: hidden;
  .form-item-container {
    justify-content: flex-start;
    flex-grow: 1;
    .form-item {
      float: left;
      display: flex;
      align-items: center;
      margin: 3px;
      margin-right: 15px;
      .form-item-label {
        color: #555555;
        text-align: right;
        white-space: nowrap;
      }
    }
  }
  .right-btn-container {
    display: flex;
    text-align: center;
    padding-top: 5px;
    Button {
      margin: 0px 5px;
      height: 27px;
      margin-top: -1px;
    }
    .more-text {
      width: 45px;
      margin-top: 3px;
      color: @themColor;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
