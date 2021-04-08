<template>
<div id="products">
  <TopRow
      btnBanners
      btn-background="#ED1C24"
      :btn-text="btnText"
      @search="searchValue = $event"
      @btn-click="addProduct = true"
  />
  <ProductsTable
      :categories="categories"
      :items="items"
      v-model="searchValue"
  />
  <add-product
      v-if="addProduct"
      :categories="categories"
      v-model="addProduct"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
import AddProduct from "@/components/products/AddProduct";
import api from "@/service/api";
export default {
  name: "Products",
  components: {AddProduct, ProductsTable, TopRow},
  data () {
    return {
      btnText: 'Create New Products',
      searchValue: '',
      addProduct: false,
      categories: [],
      items: []
    }
  },
  async created() {

    await this.getCategories()
    await this.getItems()

    console.log(this.categories)
    console.log(this.items)
  },
  methods: {
    async getCategories() {
      await api.GET('/Categories')
          .then(res => this.categories = res.data)
          .catch(err => console.log(err))
    },
    async getItems() {
      await api.GET('/ShopItems')
          .then(res => this.items = res.data)
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
