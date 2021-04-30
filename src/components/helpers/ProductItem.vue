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

<style scoped lang="scss">
@import "../../style/variables";

.item {
  width: 200px;
  //min-width: 200px;
  //max-width: 200px;
  border: 1px solid #E8E8E8;
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2F3741;

  img {
    width: 100px;
    height: 200px;
    //height: 100px;
  }

  &-edit {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 37px;
    width: 37px;
    border-radius: 5px;
    cursor: pointer;
    background: url(../../assets/icons/edit.svg) no-repeat center, rgba(28, 200, 255, 0.2);
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
          color: #92ABBA;
          @include fontPoppins(12px, 500, 16px);
        }
      }

      .volume {
        @include fontPoppins(12px, 500, 16px);
        color: #92ABBA;
      }

      .description {
        @include fontPoppins(12px, 600, 16px);
      }
    }
  }
}
</style>
