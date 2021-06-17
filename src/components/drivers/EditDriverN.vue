<template>
  <el-dialog title="Edit Driver" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-driver-form"
          label-position="top">
        <div
            style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 20px; justify-content: center">
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
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        v-if="dialogVisible"
        dialogText="delete current driver"
        :dialogVisible="dialogVisible"
        @close-confirm="closeConfirmWindow"
        @accept-confirm="deleteDriver"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";

export default {
  name: "EditDriverN",
  components: {ConfirmationWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
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
      },
      loadingSaveChanges: false,
      form: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      },
    }
  },
  mixins: [confirmation],
  created() {
    this.form = {...this.$store.getters.getDriver}
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-driver-form'].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('putDriver', this.form)
          await this.$store.dispatch('setCurrentDriver')
          this.closeModalWindow()
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    closeModalWindow() {
      this.$emit('input', false)
      this.$store.dispatch('setCurrentDriver')
    },
    async deleteDriver() {
      await this.$store.dispatch('deleteDriver')
      this.closeConfirmWindow()
      this.closeModalWindow()
    }
  }
}
</script>

<style scoped>
</style>
