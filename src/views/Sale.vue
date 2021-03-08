<template>
<div id="sale">
  <TopRow
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
export default {
  name: "Sale",
  components: {TopRow},
  data () {
    return {
      btnText: 'Create New Sale'
    }
  }
}
</script>

<style scoped>

</style>
