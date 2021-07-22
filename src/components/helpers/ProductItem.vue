<template>
  <div class="item">
    <button class="item-edit" @click="$emit('open-modal')"></button>
    <img :src="item.imageUri ? item.imageUri : require('../../assets/bottle.svg')" alt="">
    <div class="item-info">
      <div class="item-info-row"><span class="price">${{getPromotionalPrice}}</span><span v-show="getOldPrice" class="price-promo">${{ getOldPrice }}</span></div>
      <div class="item-info-row"><span class="volume">{{item.volume}} LT</span></div>
      <div class="item-info-row">
        <p class="description">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getPromotionalPrice () {
      if(this.item.sale) {
        return (this.item.price * (1-this.item.sale.percent*0.01))
      } else return this.item.price
    },
    getOldPrice () {
      return this.item.sale ? Number(this.item.price).toFixed(2) : 0
    }
  }
}
</script>

<style>
</style>
