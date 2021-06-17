<template>
  <el-dialog title="Create New City" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-city-form"
          label-position="top">
        <el-form-item label="City Name" label-width="120px" prop="cityName">
          <el-input v-model="form.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="District" label-width="120px" prop="district">
          <el-input v-model="form.district" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              v-model="form.address"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
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
export default {
  name: "AddCity",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        cityName: [
          {
            required: true,
            message: 'Please input a city name',
            trigger: 'blur'
          }
        ],
        district: [
          {
            required: true,
            message: 'Please input a district',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: 'Please input an address',
            trigger: 'blur'
          }
        ],
      },
      loadingSaveChanges: false,
      form: {
        cityName: "",
        district: "",
        address: "",
      }
    }
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-city-form'].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('postNewCity', this.form)
          this.closeModalWindow()
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

<style scoped >
</style>
