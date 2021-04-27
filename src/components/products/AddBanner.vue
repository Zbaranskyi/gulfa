<template>
  <modal-window
      @close="$emit('input', false)"
      @btn-click="addNewBanner"
      :value="value">
    <template #title>
      Upload Banner
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
      </div>
    </template>
    <template
        #button>Save changes</template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import encodeImage from "@/mixins/encodeImage";

export default {
  name: "AddBanner",
  components: { ModalWindow},
  data () {
    return {
      name: '',
      arName: '',
      image: null,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mixins: [encodeImage],
  methods: {
    async addNewBanner () {
      let formdata = new FormData()
      formdata.append('mediafile', this.file)
      this.$emit('add-banner', formdata)
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
