<template>
  <el-dialog title="Edit Category" :visible.sync="value" :before-close="closeModalWindow">
    <div class="image-block">
      <img v-if="base64Img" class="image" :src="base64Img" alt="">
      <img v-else-if="image" class="image" :src="image" alt="">
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
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        dialogText="delete current category"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteCategory}"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import encodeImage from "@/mixins/encodeImage";
import rules from "@/helpers/validationRules";

export default {
  name: "EditCategoryN",
  components: {ConfirmationWindow},
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
      },
      image: null
    }
  },
  async created() {
          this.form.name = this.getSelectedCategory.title
          this.form.arName = this.getSelectedCategory.titleAr
          this.image = this.getSelectedCategory.imageUri
  },
  computed: {
    getSelectedCategory() {
      return this.$store.getters.getSelectedCategory
    }
  },
  mixins: [encodeImage, confirmation],
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-category-form'].validate(async (valid) => {
        if (valid) {
            let formdata = null
            if (this.file) {
              formdata = new FormData()
              formdata.append('File', this.file)
            }
            let data = {
              title: this.form.name,
            }
            let dataAr = {
              title: this.form.arName
            }
            await this.$store.dispatch('putCategory', {data, formdata,dataAr})
            this.closeModalWindow()
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    closeModalWindow() {
      this.$emit('input', false)
    },
    async deleteCategory() {
      await this.$store.dispatch('deleteCategory')
      this.closeConfirmWindow()
      this.closeModalWindow()
    }
  }
}
</script>

<style>
</style>
