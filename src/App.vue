<template>
  <div>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  name: 'App',
  components: {
    MainLayout,
    AuthLayout
  },
  computed: {
    layout () {
      return `${this.$route.meta.layout || 'auth'}-layout`
    }
  }
}
</script>

<style lang="scss">
@import "./style/reset.css";

//.dark{
//  position: fixed;
//  top: 0;
//  left: 0;
//  width: 100vw;
//  height: 100vh;
//  background: #00000099;
//  z-index: 10;
//}
</style>
