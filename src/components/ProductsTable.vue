<template>
  <div class="products">
    <div class="row">
      <div class="categories">
        <button
            class="button-category"
            :class="{selected: selectedCategory === index}"
            v-for="(category, index) of categories"
            :key="index">
          <span @click="selectedCategory = index">{{ category.title }}</span>
          <span @click="editCategory(category.id)" class="edit-category"></span>
        </button>
      </div>

      <el-button @click="showAddCategory = true" class="button-add-new-category" type="info">+ Add New Category</el-button>
    </div>
    <div class="items">
      <product-item
          @open-modal="editProduct(item.id)"
          v-for="(item, index) of sortedInfo" :key="index" :item="item"
      />
    </div>
    <edit-product-n
        v-if="modal"
        v-model="modal"
    />
    <add-category-n
        v-if="showAddCategory"
        v-model="showAddCategory"
    />
    <edit-category-n
        v-if="showEditCategory"
        v-model="showEditCategory"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/helpers/ProductItem";
import AddCategoryN from "@/components/products/AddCategoryN";
import EditCategoryN from "@/components/products/EditCategoryN";
import EditProductN from "@/components/products/EditProductN";

export default {
  name: "ProductsTable",
  components: {
    EditProductN,
    EditCategoryN, AddCategoryN, ProductItem},
  data() {
    return {
      selectedCategory: 0,
      modal: false,
      editItemID: '',
      showAddCategory: false,
      showEditCategory: false,
      categoryId: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array
    },
    categories: {
      type: Array
    }
  },
  computed: {
    filteredItems() {
      if (this.items.length && this.categories.length) return this.items.filter(el => el.categoryId === this.categories[this.selectedCategory].id)
      else return []
    },
    sortedInfo() {
      let sort = []
      if (this.value) {
        for (let item of this.filteredItems) {
          for (let prop in item) {
            if ((prop !== 'id' && prop !== 'categoryId' && prop !== 'imageUri') && String(item[prop]).toLowerCase().includes(this.value.toLowerCase())) {
              sort.push(item)
              break;
            }
          }
        }
      } else return this.filteredItems
      return sort
    }
  },
  methods: {
    async editCategory(id) {
      this.$store.commit('setLoading')
      await this.$store.dispatch('getSelectedCategory', id)
      this.$store.commit('unsetLoading')
      this.showEditCategory = true
    },
    async editProduct(id) {
      this.$store.commit('setLoading')
      await this.$store.dispatch('getSelectedProduct', id)
      this.$store.commit('unsetLoading')
      this.modal = true
    }
  }
}
</script>

<style>
</style>
