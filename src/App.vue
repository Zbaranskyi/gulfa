<template>
  <div id="app">
    <Products @create-mode="dark = !dark"/>
    <div :class="{dark: dark}"></div>
  </div>
</template>

<script>


import Products from "@/components/Products";
export default {
  name: 'App',
  components: {Products},
  data () {
    return {
      dark: false
    }
  }
}
</script>

<style lang="scss">
@import "./style/reset.css";
.dark{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 10;
}
</style>
