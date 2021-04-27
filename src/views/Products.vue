<template>
  <div id="products">
    <TopRow
        btn-background="#ED1C24"
        :btn-text="btnText"
        @search="searchValue = $event"
        @btn-click="addProduct = true"
    />
    <ProductsTable
        :categories="categories"
        :items="items"
        v-model="searchValue"
        @add-category="postCategory"
        @edit-product="putItem"
        @delete-product="deleteProduct"
        @delete-category="deleteCategory"
    />
    <add-product
        v-if="addProduct"
        :categories="categories"
        v-model="addProduct"
        @add-product="postItem"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import ProductsTable from "@/components/ProductsTable";
import AddProduct from "@/components/products/AddProduct";
import api from "@/service/api";
import elementUI from "@/mixins/elementUI";

export default {
  name: "Products",
  components: {AddProduct, ProductsTable, TopRow},
  data() {
    return {
      btnText: 'Create New Products',
      searchValue: '',
      addProduct: false,
      items: [],
      categories: [],
    }
  },
  mixins: [elementUI],
  computed: {
    getToken() {
      return localStorage.getItem('token')
    }
  },
  async created() {
    await this.getCategories()
    await this.getItems()
  },
  methods: {
    async getCategories() {
      let vm = this
      let categories = []
      await api.GET('/Categories')
          .then(res => categories = res.data)
          .catch(err => console.log(err))
      await api.GET('/Categories?culture=ar')
          .then(res => {
            res.data.map(el => {
                  let index = categories.findIndex(i => i.id === el.id)
                  if (index >= 0) {
                    categories[index] = {
                      ...categories[index], id: el.id,
                      titleAr: el.title,
                    }
                  }
                }
            )
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      this.categories = categories
    },
    async getItems() {
      let vm = this
      let items = []
      await api.GET('/ShopItems')
          .then(res => items = res.data)
          .catch(err => console.log(err))
      await api.GET('/ShopItems?culture=ar')
          .then(res => {
            res.data.map(el => {
                  let index = items.findIndex(i => i.id === el.id)
                  if (index >= 0) {
                    items[index] = {
                      ...items[index], id: el.id,
                      titleAr: el.title,
                      descriptionAr: el.description
                    }
                  }
                }
            )
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      this.items = items
    },
    async postItem(data, dataAr, formdata) {
      this.initLoading()
      let vm = this
      let id = ''
      await api.POST('/shopitems', data, this.getToken)
          .then(res => id = res.data)
          .catch(console.dir)

      await api.POST(`/shopitems/${id}/localization?culture=ar`, dataAr, this.getToken)
          .catch(() => {
            vm.$emit('error-action')
          })

      await this.patchPhoto(id, formdata)
          .then(() => this.addProduct = false)
      await this.loading.close();

    },
    async postCategory({formdata, dataAr}) {
      this.initLoading()
      let vm = this
      let id = ''
      await api.POST('/categories', formdata, this.getToken, true)
          .then(res => id = res.data)
          .catch(() => {
            vm.$emit('error-action')
          })
      await api.POST(`/categories/${id}/localization?culture=ar`, dataAr, this.getToken)
          .then(() => {
            vm.$emit('success-action')
            vm.getCategories()
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      await this.loading.close();
    },
    async putItem({data, formdata, id}) {
      this.initLoading()
      let vm = this
      await api.PUT(`/shopitems/${id}`, data, this.getToken)
          .then(() => {
            if (formdata) {
              vm.patchPhoto(id, formdata)
            } else {
              vm.getItems()
              vm.$emit('success-action')
            }
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      await this.loading.close();
    },
    patchPhoto(id, formdata) {
      let vm = this
      return new Promise((resolve) => {
        api.PATCH(`/shopitems/${id}/Icon`, formdata, this.getToken, true)
            .then(() => {
              vm.$emit('success-action')
              vm.getItems()
              resolve()
            })
            .catch(() => {
              vm.$emit('error-action')
            })
      })
    },
    async deleteProduct(id) {
      this.initLoading()
      let vm = this
      await api.DELETE(`/ShopItems/${id}`, this.getToken)
          .then(() => {
            this.getItems()
            this.$emit('success-action')
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      await this.loading.close();
    },
    async deleteCategory(id) {
      this.initLoading()
      let vm = this
      await api.DELETE(`/categories/${id}`, this.getToken)
          .then(() => {
            this.getCategories()
            this.$emit('success-action')
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      await this.loading.close();
    }
  }
}

</script>

<style scoped>

</style>
