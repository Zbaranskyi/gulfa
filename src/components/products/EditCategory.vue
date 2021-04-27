<template>
  <div>
    <modal-window
        deleteButton
        @close="$emit('input', false)"
        @btn-click="saveChanges"
        @delete-product="confirmDelete=true"
        :value="value">
      <template #title>
        Edit Category
      </template>
      <template #default>
        <div class="main-block">
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
          </div>
        </div>
      </template>
      <template
          #button>Save changes</template>
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
import ConfirmationDelete from "../helpers/ConfirmationDelete";

export default {
  name: "EditCategory",
  components: {ConfirmationDelete, InputWithLabel, ModalWindow},
  data () {
    return {
      name: '',
      arName: '',
      image: null,
      confirmDelete: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object
    }
  },
  created() {
    this.name = this.category.title
    this.arName = this.category.titleAr
    this.image = this.category.imageUri
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
    },
    deleteProduct () {
      this.$emit('delete-category', this.category.id)
      this.$emit('input', false)
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
  .image-block{
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
  }
  .image{
    width: 150px;
    //height: 100px;
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
