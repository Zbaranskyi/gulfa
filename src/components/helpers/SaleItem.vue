<template>
  <div class="sale-item">
    <button class="item-edit" @click="$emit('edit-item', item.id)"></button>
    <p><span>Title: </span>{{ item.title[lang] }}</p>
    <div class="item-flex">
      <p><span>Type: </span>{{ item.typeValue }} %</p>
      <p><span>Validity: </span>{{ item.fromDate }} - {{item.toDate}}</p>
    </div>
    <p><span>Description: </span>{{ item.description[lang] }}</p>
    <p><span>Products:</span></p>
    <div class="sale-item-products">
      <div class="sale-item-product"
           v-for="(product, index) of item.products"
           :key="index"
      >
        <span class="close">+</span>
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

<style scoped lang="scss">
@import "../../style/variables";

.sale-item {
  border: 1px solid #E8E8E8;
  border-radius: 10px;
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  color: #2F3741;
  position: relative;
  @include fontPoppins(12px, 400, 18px);
  .item-edit {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 37px;
    width: 37px;
    border-radius: 5px;
    cursor: pointer;
    background: url(../../assets/icons/edit.svg) no-repeat center, rgba(28, 200, 255, 0.2);
  }
  span {
    font-weight: 600;
    padding-right: 10px;
  }
  p{
    padding: 10px 0;
  }
  .item-flex {
    display: grid;
    grid-template-columns: 200px 300px;
  }
  &-products {
    display: flex;
  }
  &-product {
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 140px;
    padding: 10px;
    margin-right: 20px;
    position: relative;
    .close {
      position: absolute;
      transform: rotate(45deg);
      top: 5px;
      right: 10px;
      font-size: 25px;
      font-weight: 400;
      cursor: pointer;
    }
    img {
      width: 100px;
      align-self: center;
    }
    p {
      padding: 0;
    }
    span {
      padding-right: 0;
    }
  }
}
</style>
