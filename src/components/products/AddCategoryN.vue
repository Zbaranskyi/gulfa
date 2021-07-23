<template>
  <el-dialog title="Create New Category" :visible.sync="value" :before-close="closeModalWindow">
    <div class="image-block">
      <img v-if="base64Img" class="image" :src="base64Img" alt="">
      <div v-else class="image"></div>
      <label class="image-cropper" for="file">Upload new image</label>
      <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
    </div>
    <el-form
        :model="form"
        :rules="rules"
        ref="validation-category-form"
        label-position="top">
      <div style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 15px">
        <el-form-item label="Name" label-width="120px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Arabic Name" label-width="120px" prop="arName">
          <el-input v-model="form.arName" autocomplete="off"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button
        type="primary"
        @click="submitForm"
        round
        :loading="loadingSaveChanges"
    >Save Changes</el-button>
  </span>
  </el-dialog>
</template>

<script>
import encodeImage from "@/mixins/encodeImage";
import rules from "@/helpers/validationRules";

export default {
  name: "AddCategoryN",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingSaveChanges: false,
      rules,
      form: {
        name: "",
        arName: "",
      }
    }
  },
  mixins: [encodeImage],
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-category-form'].validate(async (valid) => {
        if (valid) {
          if (this.base64Img) {
            let formdata = new FormData()
            formdata.append('File', this.file)
            await this.$store.dispatch('postCategory', {
              formdata,
              data: {title: this.form.name},
              dataAr: {title: this.form.arName}
            })
            this.closeModalWindow()
          } else {
            await this.$store.dispatch('setErrorMessage', 'Image not found')
            return false;
          }
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
