<template>
  <div>
    <modal-window
        deleteButton
        @close="closeModal"
        @btn-click="saveChanges"
        @delete-product="confirmDelete=true"
        :value="value">
      <template #title>
        Edit Product
      </template>
      <template #default>
        <div class="main-block">
          <div class="select-category">
            <p>Select Category</p>
            <select id="select-category" v-model="category">
              <option v-for="item of getCategories" :value="item.id" :key="item.id">{{ item.title }}</option>
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
                  title="Volume"
                  v-model="volume"
                  inputType="number"
                  :width="40"
                  inputLabel="LT"
              />
              <InputWithLabel
                  title="Price"
                  v-model="price"
                  inputType="number"
                  :width="25"
                  inputLabel="$"
              />
              <InputWithLabel
                  title="New Price"
                  v-model="newPrice"
                  inputType="number"
                  :width="25"
                  inputLabel="$"
              />
            </div>
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
          </div>
        </div>
      </template>
      <template
          #button>Save changes
      </template>
    </modal-window>

    <confirmation-delete
        v-if="confirmDelete"
        v-model="confirmDelete"
        @delete-product="deleteProduct"
    />
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import encodeImage from "@/mixins/encodeImage";

import InputWithLabel from "@/components/helpers/InputWithLabel";
import TextareaWithLabel from "@/components/helpers/TextareaWithLabel";
import ConfirmationDelete from "../helpers/ConfirmationDelete";

export default {
  name: "EditProduct",
  components: {ConfirmationDelete, TextareaWithLabel, InputWithLabel, ModalWindow},
  data() {
    return {
      volume: '',
      price: '',
      newPrice: '',
      name: '',
      arName: '',
      descript: '',
      arDescript: '',
      image: null,
      category: '',
      confirmDelete: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    editItemID: {
      type: String
    }
  },
  async created() {
    this.$store.commit('setLoading')
    await this.$store.dispatch('getSelectedProduct', this.editItemID)
        .then(() => {
          this.volume = `${this.getSelectedProduct.volume}`
          this.price = `${this.getSelectedProduct.price}`
          this.name = this.getSelectedProduct.title
          this.arName = this.getSelectedProduct.titleAr
          this.arDescript = this.getSelectedProduct.descriptionAr
          this.image = this.getSelectedProduct.imageUri
          this.descript = this.getSelectedProduct.description
          this.category = this.getSelectedProduct.categoryId
        })
    this.$store.commit('unsetLoading')

  },
  computed: {
    getSelectedProduct() {
      return this.$store.getters.getSelectedProduct
    },
    getCategories() {
      return this.$store.state.products.categories
    }
  },
  mixins: [encodeImage],
  methods: {
    async saveChanges() {
      let id = this.editItemID
      let formdata = null
      if (this.file) {
        formdata = new FormData()
        formdata.append('file', this.file)
      }
      let data = {
        categoryId: this.category,
        description: this.descript,
        price: this.price,
        title: this.name,
        volume: this.volume
      }
      await this.$store.dispatch('putProduct', {data, formdata, id})
      this.$emit('input', false)
    },
    closeModal() {
      this.$store.commit('setSelectedProduct', {})
      this.$emit('input', false)
    },
    async deleteProduct() {
      this.initLoading()
      await this.$store.dispatch('deleteProduct', this.editItemID)
          .then(() => {
            this.$emit('success-action')
          })
          .catch(() => {
            this.$emit('error-action')
          })
      await this.loading.close();
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block {
  display: flex;
  flex-direction: column;
  @include fontPoppins(12px, 400, 20px);

  .select-category {
    position: relative;
    margin: 0 0 20px;

    select {
      border: 1px solid #E8E8E8;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
    }

    p {
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

  .image-block {
    display: flex;
    margin-bottom: 30px;
  }

  .image {
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
    @include fontPoppins(12px, 500, 20px);
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
      display: flex;

      &.descriptions {
        //justify-content: space-between;
      }
    }
  }
}
</style>
