<template>
  <el-dialog
      class="create-notification"
      title="Create New Notification"
      :visible.sync="value"
      :before-close="closeModalWindow">
    <div>
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-notification-form"
          label-position="top">
        <el-form-item prop="enBody" label="English Description">
          <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              v-model="form.enBody"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="arBody" label="Arabic Description">
          <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              v-model="form.arBody"
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
import rules from "@/helpers/validationRules";

export default {
  name: "AddNotification",
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
        arBody: "",
        enBody: ""
      }
    }
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-notification-form'].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('postNewNotification', this.form)
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

<style>

</style>
