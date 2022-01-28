<template>
  <div class="ck-textarea">
    <el-input type="textarea" :rows="rows" :placeholder="'请输入'+placeholder" :value="value" @input="$emit('input', $event)"></el-input>
  </div>
</template>
<script>
  export default {
    name: 'CkTextarea',
    props: {
      value: String,
      rows: {
        type: Number,
        default: 3
      },
      placeholder: ''
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>