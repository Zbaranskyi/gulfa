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
          @open-modal="modal=true; editItemID=item.id"
          v-for="(item, index) of sortedInfo" :key="index" :item="item"
      />
    </div>
    <edit-product
        v-if="modal"
        :editItemID="editItemID"
        v-model="modal"
    />
    <add-category
        v-if="showAddCategory"
        v-model="showAddCategory"
    />
    <edit-category
        v-if="showEditCategory"
        :categoryId="categoryId"
        v-model="showEditCategory"
    />
  </div>
</template>

<script>
import ProductItem from "@/components/helpers/ProductItem";
import EditProduct from "@/components/products/EditProduct";
import AddCategory from "./products/AddCategory";
import EditCategory from "./products/EditCategory";

export default {
  name: "ProductsTable",
  components: {EditCategory, AddCategory, EditProduct, ProductItem},
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
    editCategory(id) {
      this.showEditCategory = true
      this.categoryId = id
    },
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.products {
  display: flex;
  flex-direction: column;
  align-items: center;

  .button-category {
    border: none;
    border-radius: 10px;
    cursor: auto;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      cursor: pointer;
    }
  }

  .button-add-new-category {
    width: 15%;
    border-radius: 10px;
    @include fontPoppins(12px, 600, 18px);
  }

  .edit-category {
    display: block;
    height: 16px;
    width: 16px;
    margin-left: 20px;
    margin-right: 10px;
    background: url('../assets/icons/edit.svg') no-repeat center;
  }

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .categories {
      display: flex;
      flex-wrap: wrap;
    }

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
      padding: 10px 0 10px 20px;
      margin: 5px 10px;
      @include fontPoppins(12px, 600, 18px);

      &.selected {
        color: #FFFFFF;
        background: $color-background-blue;

        .edit-category {
          background: url('../assets/icons/edit-white.svg') no-repeat center;
        }
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
