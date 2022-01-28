<template>
  <el-tree
    :data="data"
    :node-key="nodeKey"
    default-expand-all
    :expand-on-click-node="false"
    :props="defaultProps"
    @node-click="handleNodeClick"
  >
    <div slot-scope="scope" class="custom-tree-node">
      <i class="el-icon-folder file-icon" />
      <span>{{ scope.data[label] }}</span>
    </div>
  </el-tree>
</template>

<script>
export default {
  name: 'Tree',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    nodeKey: {
      type: String,
      default: () => '',
      required: true
    },
    children: {
      type: String,
      default: () => 'children'
    },
    label: {
      type: String,
      default: () => 'label'
    }
  },
  data() {
    return {
      defaultProps: {
        children: this.children,
        label: this.label
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(item, node) {
      const payload = {
        item,
        node
      }
      this.$emit('nodeClick', payload)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .file-icon {
  margin-right: 6px;
}
  /deep/ .el-tree {
    padding: 0 12px;
  }
  /deep/ .el-tree-node__content {
    padding: 20px 0;
    border-bottom: 1px solid #f1f2f3;
  }
</style>
