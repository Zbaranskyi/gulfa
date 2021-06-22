<template>
  <el-dialog title="Add Driver" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-driver-form"
          label-position="top">
        <div style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 20px; justify-content: center">
          <el-form-item label="First Name" label-width="120px" prop="firstName">
            <el-input v-model="form.firstName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" label-width="120px" prop="lastName">
            <el-input v-model="form.lastName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Phone Number" label-width="120px" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" label-width="120px" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" label-width="120px" prop="password">
            <el-input v-model="form.password" autocomplete="off" show-password></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "AddDriverN",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let testPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.,#\$%\^&\*])(?=.{8,})/; //eslint-disable-line
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a password'));
      } else if (!testPass.test(String(value))) {
        callback(new Error('password must be contain digits, letters, symbols (min 8 characters)'))
      } else {
        callback();
      }
    };
    return {
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please input a first name',
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: 'Please input a last name',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: 'Please input a phone number',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input an email',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ],
      },
      loadingSaveChanges: false,
      form: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: ""
      },
    }
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-driver-form'].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('postDriver', this.form)
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

<style scoped lang="scss">

</style>
