<template>
  <modal-window
      @close="$emit('input', false)"
      @btn-click="saveChanges"
      :value="value">
    <template #title>
      Create New Product
    </template>
    <template #default>
      <div class="main-block">
        <div class="select-category">
          <p>Select Category</p>
          <select id="select-category" v-model="category">
            <option v-for="item of categories" :value="item.id" :key="item.id">{{item.title}}</option>
          </select>
        </div>
        <div class="image-block">
          <img v-if="base64Img" class="image" :src="base64Img" alt="">
          <img v-else-if="image" class="image" :src="image" alt="">
          <div v-else class="image"></div>
          <label class="image-cropper" for="file">Upload new image</label>
          <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
        </div>
        <div class="info">
          <div class="info-row">
            <InputWithLabel
                title="Name"
                v-model="name"
                :width="50"
            />
            <InputWithLabel
                title="Arabic Name"
                align="right"
                v-model="arName"
                :width="50"
            />
          </div>
          <div class="info-row descriptions">
            <TextareaWithLabel
                title="Description"
                v-model="descript"
                :width="50"
            />
            <TextareaWithLabel
                title="Arabic Description"
                v-model="arDescript"
                align="right"
                :width="50"
            />
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Price"
                v-model="price"
                inputType="number"
                :width="25"
                inputLabel="$"
            />
            <InputWithLabel
                title="Volume"
                v-model="volume"
                inputType="number"
                :width="40"
                inputLabel="LT"
            />
          </div>
        </div>
      </div>
    </template>
    <template
        #button>Save changes</template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import encodeImage from "@/mixins/encodeImage";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import TextareaWithLabel from "@/components/helpers/TextareaWithLabel";

export default {
  name: "AddProduct",
  components: {TextareaWithLabel, InputWithLabel, ModalWindow},
  data () {
    return {
      volume: '',
      price: '',
      newPrice: '',
      name: '',
      arName: '',
      descript: '',
      arDescript: '',
      image: null,
      category: ''
    }
  },
  created() {
    this.category = this.categories[0].id
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array
    }
  },
  mixins: [encodeImage],
  methods: {
    saveChanges () {
      let changedData = {
        description: this.descript,
        imageUri: this.base64Img || this.image,
        price: this.price,
        title: this.name,
        volume: this.volume
      }
      let data = {...this.editItem, ...changedData}
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block{
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);
  .select-category{
    position: relative;
    margin: 0 0 20px;
    select {
      border: 1px solid #E8E8E8;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
    }
    p{
      //&:after{
      //  position: absolute;
      //  display: block;
      //  content: '';
      //  width: 17px;
      //  height: 17px;
      //  background: #005CB9 url('../../assets/icons/arrow.svg') no-repeat center;
      //  top: 30px;
      //  left: 279px;
      //  border-radius: 5px;
      //  cursor: pointer;
      //}
    }

  }
  .image-block{
    display: flex;
    margin-bottom: 30px;
  }
  .image{
    width: 150px;
    height: 100px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  .image-cropper {
    width: 150px;
    height: 100px;
    //background: yellow;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    color: #2F3741;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    &-row {
      margin-top: 10px;
      display: flex;
      &.descriptions{
        //justify-content: space-between;
      }
    }
  }
}
</style>
