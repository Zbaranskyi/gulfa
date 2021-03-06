<template>
  <div class="products">
    <div class="row">
      <h2 class="row-title">Products</h2>
      <button class="button-create product" @click="createNewProduct">Create New Products</button>
    </div>
    <div class="row">
      <div class="categories">
        <button class="button-category" v-for="(category, index) of categories" :key="index">{{ category.title }}
        </button>
      </div>
      <button class="button-create category">+ Add New Category</button>
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) of items" :key="index">
        <button class="item-edit"></button>
        <img :src="item.imageUri ? item.imageUri : require('../assets/bottle.svg')" alt="">
        <div class="item-info">
          <div class="item-info-row"><span class="price">${{item.price}}</span><span class="price-promo">$27.00</span></div>
          <div class="item-info-row"><span class="volume">{{item.volume}} LT</span></div>
          <div class="item-info-row">
            <p class="description">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <CreateProduct
        v-if="createMode"
        :categories="categories"
        @close-create="closeCreate"/>
  </div>
</template>

<script>
import CreateProduct from "@/components/CreateProduct";
import axios from 'axios';

export default {
  name: "Products",
  components: {CreateProduct},
  data() {
    return {
      createMode: false,
      categories: [],
      items: []
    }
  },
  async created() {
    await this.getCategories()
    await this.getItems()
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
  padding: 10px;

  button {
    border: none;
    outline: none;
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

    }
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;

    .item {
      width: 20%;
      min-width: 150px;
      max-width: 200px;
      border: 1px solid black;
      border-radius: 10px;
      padding: 10px;
      margin: 5px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 100px;
        height: 200px;
      }

      &-edit {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 37px;
        width: 37px;
        background: url(../assets/icons/edit.svg) no-repeat center, rgba(28, 200, 255, 0.2);;
      }

      &-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        &-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;

          .price {
            @include fontPoppins(15px, 500, 16px);

            &-promo {
              text-decoration: line-through;
              @include fontPoppins(12px, 500, 16px);
            }
          }

          .volume {
            @include fontPoppins(12px, 500, 16px);
          }

          .description {
            @include fontPoppins(12px, 600, 16px);
          }
        }
      }
    }
  }
}
</style>
