<template>
  <div
    class="loader">
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss" scoped>
:root{
    --width: 20px!important;
}
.loader{
    border: 2px solid white!important;;
    border-top: 2px solid red!important;
    border-right: 2px solid red!important;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    width: 20px!important;
    height: 20px!important;
    margin: 0!important;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
