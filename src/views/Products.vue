<template>
  <div id="products">
    <TopRow
        btn-background="#ED1C24"
        btn-text="Create New Products"
        @search="searchValue = $event"
        @btn-click="addProduct = true"
    />
    <ProductsTable
        :categories="getCategories"
        :items="getProducts"
        v-model="searchValue"
    />
    <add-product
        v-if="addProduct"
        v-model="addProduct"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
import AddProduct from "@/components/products/AddProduct";

export default {
  name: "Products",
  components: {AddProduct, ProductsTable, TopRow},
  data() {
    return {
      searchValue: '',
      addProduct: false,
    }
  },
  computed: {
    getProducts() {
      return this.$store.state.products.data
    },
    getCategories() {
      return this.$store.state.products.categories
    }
  },
  async created() {
    await this.$store.dispatch('getCategories')
    await this.$store.dispatch('getProducts')
  }
}

</script>

<style scoped>

</style>
