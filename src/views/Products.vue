<template>
  <div id="products">
    <TopRow
        btn-background="#ED1C24"
        btn-text="Create New Products"
        @search="searchValue = $event"
        @btn-click="addProduct = true"
    />
    <ProductsTable
        :categories="getCategoriesS"
        :items="getProductsS"
        v-model="searchValue"
    />
    <add-product-n
        v-if="addProduct"
        v-model="addProduct"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
import AddProductN from "@/components/products/AddProductN";
import {mapActions} from 'vuex'

export default {
  name: "Products",
  components: {AddProductN, ProductsTable, TopRow},
  data() {
    return {
      searchValue: '',
      addProduct: false,
    }
  },
  computed: {
    getProductsS() {
      return this.$store.state.products.data
    },
    getCategoriesS() {
      return this.$store.state.products.categories
    }
  },
  async created() {
    await this.getCategories()
    await this.getProducts()
  },
  methods: mapActions(['getCategories', 'getProducts'])
}

</script>

<style>

</style>
