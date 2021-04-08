<template>
<div id="products">
  <TopRow
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      @search="searchValue = $event"
  />
  <ProductsTable
      v-model="searchValue"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
export default {
  name: "Products",
  components: {ProductsTable, TopRow},
  data () {
    return {
      btnText: 'Create New Products',
      searchValue: ''
    }
  }
}
</script>

<style scoped>

</style>
