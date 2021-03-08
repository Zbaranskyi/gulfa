<template>
  <div class="products">
    <div class="row">
      <div class="categories">
        <button
            @click="selectedCategory = index"
            class="button-category"
            :class="{selected: selectedCategory === index}"
            v-for="(category, index) of categories"
            :key="index">{{ category.title }}</button>
      </div>
      <base-button :background="'#ED1C24'" :width="15">+ Add New Category</base-button>
    </div>
    <div class="items">
      <product-item
          v-for="(item, index) of filteredItems" :key="index" :item="item"
      />
    </div>
    <CreateProduct
        v-if="createMode"
        :categories="categories"
        @close-create="closeCreate"/>
  </div>
</template>

<script>
import CreateProduct from "@/components/CreateProduct";
import BaseButton from "@/components/helpers/BaseButton";
import ProductItem from "@/components/helpers/ProductItem";
import axios from 'axios';

export default {
  name: "ProductsTable",
  components: {ProductItem, BaseButton, CreateProduct},
  data() {
    return {
      createMode: false,
      categories: [],
      items: [],
      selectedCategory: 0
    }
  },
  computed: {
    filteredItems () {
      return this.items.filter(el=>el.categoryId === this.categories[this.selectedCategory].id)
    }
  },
  async created() {
    await this.getItems()

    await this.getCategories()
    console.log(this.categories)
    console.log(this.items)
  },
  methods: {
    createNewProduct() {
      this.createMode = true
      this.$emit('create-mode')
    },
    async closeCreate() {
      this.createMode = false
      this.$emit('create-mode')
      await this.getItems()
    },
    async getCategories() {
      await axios.get('https://gulfawaterweb.azurewebsites.net/Categories')
          .then(res => this.categories = res.data)
          .catch(err => console.log(err))
    },
    async getItems() {
      await axios.get('https://gulfawaterweb.azurewebsites.net/ShopItems')
          .then(res => this.items = res.data)
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.products {
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
  }

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    &-title {
      @include fontPoppins(22px, 500, 20px);
    }

    .button-create {
      background: #ED1C24;
      padding: 10px 20px;
      @include fontPoppins(12px, 600, 18px);
    }

    .button-category {
      background: #D2F4FF;
      color: #005CB9;
      padding: 10px 20px;
      margin: 5px 10px;
      @include fontPoppins(12px, 600, 18px);
      &.selected {
        color: #FFFFFF;
        background: #005CB9;
      }
    }
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
  }
}
</style>
