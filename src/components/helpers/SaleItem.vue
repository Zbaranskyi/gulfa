<template>
  <div class="sale-item">
    <button class="item-edit" @click="$emit('edit-item', item.id)"></button>
    <p><span>Title: </span>{{ item.title[lang] }}</p>
    <div class="item-flex">
      <p><span>Discount: </span>{{ item.percent }} %</p>
      <p><span>Validity: </span>{{ item.startDate }} - {{item.endDate}}</p>
    </div>
    <p><span>Description: </span>{{ item.description[lang] }}</p>
    <p><span>Products:</span></p>
    <div class="sale-item-products">
      <div class="sale-item-product"
           v-for="(product, index) of item.products"
           :key="index"
      >
        <img :src="product.image" alt="">
        <p><span>{{product.title}}</span></p>
        <p>{{product.volume}}</p>
        <p><span>{{product.price}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaleItem",
  props: {
    item: {
      type: Object,
    },
    lang: {
      type: String,
      default: 'en'
    }
  }
}
</script>

<style>

</style>
