<template>
  <el-dialog title="Add New Banner" :visible.sync="value" :before-close="closeModalWindow">
    <div class="image-block">
      <img v-if="base64Img" class="image" :src="base64Img" alt="">
      <div v-else class="image"></div>
      <label class="image-cropper" for="file">Upload new image</label>
      <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button
        type="primary"
        @click="saveChanges"
        round
        :loading="loadingSaveChanges"
    >Save Changes</el-button>
  </span>
  </el-dialog>
</template>

<script>
import encodeImage from "@/mixins/encodeImage";
import {mapActions} from 'vuex'

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
    ...mapActions(['postBanner', 'setErrorMessage']),
    async saveChanges() {
      if (this.base64Img) {
        let formdata = new FormData()
        formdata.append('mediafile', this.file)
        await this.postBanner(formdata)
        this.closeModalWindow()
      } else {
        await this.setErrorMessage('Image not found')
        return false;
      }
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
