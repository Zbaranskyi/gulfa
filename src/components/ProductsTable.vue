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
          @open-modal="modal=true; editItem=item"
          v-for="(item, index) of sortedInfo" :key="index" :item="item"
      />
    </div>
    <edit-product
        v-if="modal"
        :editItem="editItem"
        v-model="modal"
    />
  </div>
</template>

<script>
import BaseButton from "@/components/helpers/BaseButton";
import ProductItem from "@/components/helpers/ProductItem";
import EditProduct from "@/components/helpers/EditProduct";
import api from "@/service/api";

export default {
  name: "ProductsTable",
  components: {EditProduct, ProductItem, BaseButton},
  data() {
    return {
      createMode: false,
      categories: [],
      items: [],
      selectedCategory: 0,
      modal: false,
      editItem: 'null',
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  computed: {
    filteredItems () {
      return this.items.filter(el=>el.categoryId === this.categories[this.selectedCategory].id)
    },
    sortedInfo () {
      let sort = []
      if(this.value) {
        for(let item of this.filteredItems) {
          for(let prop in item) {
            if(String(item[prop]).toLowerCase().includes(this.value.toLowerCase())) {
              sort.push(item)
              break;
            }
          }
        }
      } else return this.filteredItems
      return sort
    }
  },
  async created() {

    await this.getCategories()
    await this.getItems()

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
      color: $color-background-blue;
      padding: 10px 20px;
      margin: 5px 10px;
      @include fontPoppins(12px, 600, 18px);
      &.selected {
        color: #FFFFFF;
        background: $color-background-blue;
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
