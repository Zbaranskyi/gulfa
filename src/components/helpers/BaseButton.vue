<template>
<div class="btn" @click="$emit('btn-click')">
  <slot></slot>
</div>
</template>

<style scoped lang="scss">
@import "../../style/variables";

.btn{
  border-radius: 10px;
  background: #005CB9;
  width: 100%;
  @include fontPoppins(12px, 600, 18px);
  color: white;
  text-align: center;
  padding: 11px;
  cursor: pointer;
}
</style>
