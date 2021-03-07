<template>
<div class="auth-layout">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "AuthLayout"
}
</script>

<style scoped lang="scss">
.auth-layout{
  background: #E5E5E5;
  width: 100vw;
  height: 100vh;
  position: relative;
  //min-width: 1000px;

}
</style>
