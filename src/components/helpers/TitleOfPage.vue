<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script>
export default {
  name: "TitleOfPage",
  computed: {
    title () {
      return this.$route.name.split('').map((el,index)=>index === 0 ? el.toUpperCase() : el).join('')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";
  .title{
    @include fontPoppins(22px, 500, 20px);
    color: #2F3741;
    //margin: 0 20px;
  }
</style>
