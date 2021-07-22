<template>
  <h2 class="title-page">{{ title }}</h2>
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

<style>
</style>
