<template>
  <div ref="container" class="container" :style="conHeight" :class="itemClass+' '+ addFlexRow">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Container',
  // eslint-disable-next-line vue/require-prop-types
  props: ['height', 'scrollY', 'scrollX', 'display'],
  data() {
    return {
      conHeight: 'height:100%',
      itemClass: 'container-item',
      addFlexRow: '',
      boxHeight: 0,
      isShow: true
    }
  },
  created() {
    if (this.height !== 'fill') {
      this.conHeight = this.height || this.height === 0 ? 'height:' + this.height + 'px' : ''
      this.itemClass = ''
    }
    this.addFlexRow = this.display
  },
  mounted() {
    const classList = []
    // if (this.height === 'fill') {
    //   classList.push('container-item')
    // }
    if (this.scrollY) {
      classList.push('scrollY')
    }
    if (this.scrollX) {
      classList.push('scrollX')
    }
    this.$children.forEach(item => {
      if (item.$attrs.isFillHeight !== undefined) {
        this.addFlexRow = 'flexY'

        if (this.height !== 'fill') {
          classList.push('container-item')
        }
      }
    })
    this.itemClass = classList.join(' ')
  },
  methods: {
  }
}
</script>
<style scoped>
.container{
  padding:10px;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}
.scrollY{
  overflow-y: auto;
}
.flexY{
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
</style>
