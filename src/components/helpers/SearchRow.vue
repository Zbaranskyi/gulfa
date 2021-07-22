<template>
  <input
      type="text"
      placeholder="Search..."
      class="search-row"
      @input="$emit('search', $event.target.value)"
  >
</template>

<script>
export default {
  name: "SearchRow"
}
</script>

<style>
</style>
