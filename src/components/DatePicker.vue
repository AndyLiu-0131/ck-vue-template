<template>
  <el-date-picker
    v-model="defaultValue"
    size="mini"
    :type="mode || 'date'"
    :format="format || 'yyyy-MM-dd'"
    :value-format="format || 'yyyy-MM-dd'"
    :placeholder="inputPlacehoder"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="returnChange"
  />
</template>
<script>
export default {
  name: 'DatePicker',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'field', 'mode', 'format'],
  data() {
    return {
      defaultValue: ''
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
  mounted() {
    this.defaultValue = this.value
  },
  methods: {
    returnChange() {
      this.$emit('change', this.defaultValue)
    }
  }
}
</script>
