<template functional>
  <div class="switch">
    <p
        :class="{active: props.lang === 'en'}"
        @click="listeners['change-lang']('en')"
    >English</p>
    <p
        :class="{active: props.lang === 'ar'}"
        @click="listeners['change-lang']('ar')"
    >Arabic</p>
  </div>
</template>

<style scoped lang="scss">
@import "../../style/variables";

.switch {
  border-radius: 10px;
  border: 1px solid #E8E8E8;
  display: flex;
  @include fontPoppins(12px, 400, 18px);
  overflow: hidden;
  p {
    width: 50%;
    padding: 10px 30px;
    cursor: pointer;
    &.active {
      background: #D2F4FF;
      color: #005CB9;
      font-weight: 600;
    }
  }
}
</style>
