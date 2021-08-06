<template>
  <el-dialog title="Add Worker" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-worker-form"
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
import {mapActions, mapState, mapMutations} from 'vuex'
import rules from "@/helpers/validationRules";
import api from "../../service/api";

export default {
  name: "AddWorker",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules,
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
  computed: mapState(['token']),
  methods: {
    ...mapActions(['setErrorMessage', 'setSuccessMessage']),
    ...mapMutations(['setLoading', 'unsetLoading']),
    submitForm() {
      let vm = this
      this.$refs['validation-worker-form'].validate(async (valid) => {
        if (valid) {
          await this.postWorker()
          this.closeModalWindow()
        } else {
          await vm.setErrorMessage('Error with validation')
          return false;
        }
      });
    },
    async postWorker() {
      this.setLoading()
      try {
        await api.POST('/admin/worker', this.form, this.token)
        this.$emit('get-workers')
        this.setSuccessMessage()
        this.closeModalWindow()
      } catch (e) {
        this.setErrorMessage()
        console.log(e)
      } finally {
        this.unsetLoading()
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
