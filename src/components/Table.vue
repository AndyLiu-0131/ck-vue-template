/* eslint-disable vue/require-prop-types */
<template>
  <div class="flex-table">
    <div class="flex-table-container">
      <el-table
        border
        ref="elTable"
        v-loading="loading"
        :data="data"
        :row-key="rowKey"
        header-row-class-name="ck-table-header"
        :row-class-name="rowClassName"
        size="small"
        height="100%"
        :tree-props="{ children: children, hasChildren: hasChildren }"
        @selection-change="handleSelectionChange"
        @row-dblclick="dbSelected"
      >
        <el-table-column align="center" v-if="selection" width="55" type="selection" />
        <el-table-column align="center" v-if="index" width="55" type="index" label="序号" />
        <template v-for="(item, indexNum) in columns">
          <template v-if="item.type === 'expand'">
            <el-table-column :align="item.align ? item.align : 'left'" :key="indexNum" type="expand">
              <template slot-scope="props">
                <slot :row="props" />
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'otherTag'">
            <el-table-column :align="item.align ? item.align : 'left'" :key="indexNum" :label="item.title" :width="item.width" show-overflow-tooltip>
              <template slot-scope="props">
                <slot :row="props.row" :name="item.dataIndex" />
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column :align="item.align ? item.align : 'left'" v-if="!item.render" :key="indexNum" show-overflow-tooltip :width="item.width" :prop="item.dataIndex" :label="item.title" :type="item.type" />
            <el-table-column :align="item.align ? item.align : 'left'" v-if="item.render" :key="indexNum" :width="item.width||'200px'" :prop="item.dataIndex" :label="item.title" :type="item.type">
              <template slot-scope="scope">
                <template v-if="item.render.length <= 3">
                  <template v-for="(item3, index3) in item.render">
                    <TextButton :key="index + '_' + index3" :type="item3.type" @click.native="btnClick(item3.handlerClick, scope.row)">
                      <template v-if="item3.img">
                        <img :src="item3.img" alt="" class="icon-img-table">
                      </template>
                      <template v-else>
                        {{ item3.label }}
                      </template>
                    </TextButton>
                  </template>
                </template>
                <template v-else>
                  <el-dropdown
                    @command="
                      (fnIndex) => btnClickMore(item, item.render[fnIndex])
                    "
                  >
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="(item3, index3) in item.render">
                        <el-dropdown-item :key="index3" :command="index3">{{ item3.label }}
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagenation-box">
      <el-pagination ref="pagination" class="pagination-container" background :total="pagination.total" :current-page="pagination.current" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" @current-change="currentChange" @size-change="sizeChange" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CkTable',
  // eslint-disable-next-line vue/require-prop-types
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'tableRowClassName',
    // eslint-disable-next-line vue/require-prop-types
    'columns',
    // eslint-disable-next-line vue/require-prop-types
    'data',
    // eslint-disable-next-line vue/require-prop-types
    'height',
    // eslint-disable-next-line vue/require-prop-types
    'type',
    // eslint-disable-next-line vue/require-prop-types
    'index',
    // eslint-disable-next-line vue/require-prop-types
    'selection',
    // eslint-disable-next-line vue/require-prop-types
    'pagination',
    // eslint-disable-next-line vue/require-prop-types
    'children',
    // eslint-disable-next-line vue/require-prop-types
    'hasChildren',
    // eslint-disable-next-line vue/require-prop-types
    'loading',
    // eslint-disable-next-line vue/require-prop-types
    'rowKey',
    // eslint-disable-next-line vue/require-prop-types
    'isFillHeight'
  ],
  data() {
    return {
      lisenTimer: null,
      pageData: {
        current: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    currentChange(currentPage) {
      this.pageData.current = currentPage
      this.$emit('paginationChange', this.pageData)
    },
    sizeChange(size) {
      this.pageData.pageSize = size
      this.pageData.current = 1
      this.$emit('paginationChange', this.pageData)
    },
    btnClick(handler, item) {
      handler && handler(item)
    },
    btnClickMore(row, fn) {
      fn.handlerClick && fn.handlerClick(row)
    },
    handleSelectionChange(row) {
      this.$emit('rowSelection', row)
    },
    dbSelected(row) {
      this.$emit('dbSelected', row)
    },
    rowClassName({ row, rowIndex }) {
      return this.tableRowClassName({ row, rowIndex })
    }
  }
}
</script>
<style lang="less">
  .el-table--mini,
  .el-table--small,
  .el-table__expand-icon {
    font-size: 14px !important;
  }

  .ck-table-header {
    th {
      background: #fafafa !important;
      height: 48px;
      color: #555555 !important;
    }
  }

  .flex-table {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .flex-table-container {
    flex-grow: 1;
    display: flex;
    overflow: hidden;
    height: 100%;
  }

  .pagenation-box {
    display: flex;
    padding-top: 2px;
    justify-content: flex-end;
  }

  .icon-img-table {
    width: 15px;
    height: 15px;
    position: relative;
    top:3px;
  }
</style>
