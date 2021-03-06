<template>
  <div class="create-new-product">
    <span class="close" @click="$emit('close-create')"><img src="../assets/icons/close.svg" alt=""></span>
    <h2>Create New Product</h2>
    <div class="select">
      <p>Select Current Product</p>
      <select v-model="category">
        <option :value="category.id" v-for="(category, index) of categories" :key="index">{{category.title}}</option>
      </select>
    </div>
    <div class="upload">
      <img src="../assets/bottle.svg" alt="bottle">
    </div>
    <div class="names">
      <p>Name (English):</p>
      <input type="text" v-model="nameEng">
      <p>Name (Arabic):</p>
      <input type="text" v-model="nameAr">
    </div>
    <div class="volume">
      <p>Volume</p>
      <input type="number" v-model.number="volume">
    </div>
    <div class="description">
      <p>Description</p>
      <textarea cols="30" rows="10" v-model="descriptionEng"></textarea>
      <p>Description</p>
      <textarea cols="30" rows="10" v-model="descriptionAr"></textarea>
    </div>
    <div class="price">
      <p>Price</p>
      <input type="number" v-model.number="price">
    </div>
    <div>
      <button @click="postProduct">Save Changes</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "CreateProduct",
  props: ['categories'],
  data() {
    return {
      category: '',
      nameEng: '',
      nameAr: '',
      volume: 0,
      descriptionEng: '',
      descriptionAr: '',
      price: 0
    }
  },
  methods: {
    async postProduct() {
      let vm = this
      let dataENG = {
        imageUri: '',
        price: this.price,
        volume: this.volume,
        categoryId: this.category,
        title: this.nameEng,
        description: this.descriptionEng
      }
      let dataAR = {
        title: this.nameAr,
        description: this.descriptionAr
      }

      await axios.post('https://gulfawaterweb.azurewebsites.net/ShopItems', dataENG)
      .then(async (res) => {
        await axios.post(`https://gulfawaterweb.azurewebsites.net/ShopItems/${res.data}/localization?culture=ar`, dataAR)
            .then(() => {vm.$emit('close-create')})
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped lang="scss">
.create-new-product {
  z-index: 15;
  min-width: 500px;
  width: 70%;
  max-width: 600px;
  height: 500px;
  overflow: auto;
  background: white;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  input, select, textarea {
    width: 300px;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
