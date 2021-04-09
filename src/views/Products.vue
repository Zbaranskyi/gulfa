<template>
  <div id="products">
    <TopRow
        btnBanners
        btn-background="#ED1C24"
        :btn-text="btnText"
        @search="searchValue = $event"
        @btn-click="addProduct = true"
        @upload-banners="showUploadBanners = true"
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
    <add-banner
        v-if="showUploadBanners"
        v-model="showUploadBanners  "
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
import AddProduct from "@/components/products/AddProduct";
import api from "@/service/api";
import {products, categories} from "../test-data/products";
import AddBanner from "../components/products/AddBanner";

export default {
  name: "Products",
  components: {AddBanner, AddProduct, ProductsTable, TopRow},
  data() {
    return {
      btnText: 'Create New Products',
      searchValue: '',
      addProduct: false,
      categories: categories,
      items: products,
      showUploadBanners: false
    }
  },
  async created() {

    // await this.getCategories()
    // await this.getItems()

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
