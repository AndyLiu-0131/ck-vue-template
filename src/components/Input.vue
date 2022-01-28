<template>
  <div>
    <template v-if="type==='number'">
      <el-input-number v-model="inputValue" size="mini" :placeholder="inputPlacehoder" :min="min" :max="max" style="width:100%" :disabled="inputDisabled" @change="returnChange" />
    </template>
    <template v-else>
      <el-input v-model="inputValue" size="mini" :type="type" :placeholder="inputPlacehoder" :rows="rows" :disabled="inputDisabled" @input="returnChange" />
    </template>

  </div>
</template>
<script>
export default {
  name: 'CkInput',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'field', 'type', 'min', 'max', 'rows', 'inputDisabled'],
  data() {
    return {
      isFocus: false,
      inputValue: this.value || ''
    }
  },
  computed: {
    inputPlacehoder: function() {
      return '请输入' + (this.placeholder || '')
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    }
  },
  methods: {
    returnChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
