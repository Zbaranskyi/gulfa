<template>
  <el-dialog title="Create New Notification" :visible.sync="value" :before-close="closeModalWindow">
    <div class="image-block">
      <img v-if="base64Img" class="image" :src="base64Img" alt="">
      <div v-else class="image"></div>
      <label class="image-cropper" for="file">Upload new image</label>
      <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button
        type="primary"
        @click="postBanner"
        round
        :loading="loadingSaveChanges"
    >Save Changes</el-button>
  </span>
  </el-dialog>
</template>

<script>
import encodeImage from "@/mixins/encodeImage";

export default {
  name: "AddBanner",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingSaveChanges: false,
    }
  },
  mixins: [encodeImage],
  methods: {
    async postBanner() {
        if (this.base64Img) {
          let formdata = new FormData()
          formdata.append('mediafile', this.file)
          await this.$store.dispatch('postBanner', formdata)
          this.closeModalWindow()
        } else {
          await this.$store.dispatch('setErrorMessage', 'Image not found')
          return false;
        }
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";
.image-block{
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  .image{
    width: 300px;
    height: 200px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  .image-cropper {
    width: 300px;
    height: 200px;
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
}
.dialog-footer {
  display: flex;
  justify-content: center;

  button {
    width: 300px;
  }
}
</style>
