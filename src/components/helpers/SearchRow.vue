<template>
  <input
      type="text"
      placeholder="Search..."
      class="search"
      @input="$emit('search', $event.target.value)"
  >
</template>

<script>
export default {
  name: "SearchRow"
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.search {
  border: 1px solid #E8E8E8;
  border-radius: 10px;
  @include fontPoppins(12px, 400, 18px);
  color: #2F3741;
  padding: 10px 20px;
  &::placeholder{
    @include fontPoppins(12px, 400, 18px);
    color: #CBCBCB;
  }
}
</style>
