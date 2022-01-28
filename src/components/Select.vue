<template>
  <el-select v-model="defaultValue" :disabled="disabled" size="mini" :placeholder="inputPlacehoder" clearable filterable @change="returnChange">
    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>
export default {
  name: 'CkInput',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'options', 'field', 'disabled'],
  data() {
    return {
      isFocus: false,
      defaultValue: this.value || ''
    }
  },
  computed: {
    inputPlacehoder: function() {
      return '请选择' + this.placeholder
    }
  },
  watch: {
    value(val) {
      this.defaultValue = val
    }
  },
  created() {
    this.defaultValue = this.value
  },
  methods: {
    returnChange() {
      this.$emit('change', this.defaultValue)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
