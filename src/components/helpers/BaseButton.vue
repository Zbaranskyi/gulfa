<template>
<div
    class="btn"
    :style="`background: ${background}; width: ${width}%`"
    @click="$emit('btn-click')">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    background: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.btn{
  border-radius: 10px;
  @include fontPoppins(12px, 600, 18px);
  color: white;
  text-align: center;
  padding: 11px;
  cursor: pointer;
}
</style>
