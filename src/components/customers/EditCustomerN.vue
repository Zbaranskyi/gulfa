<template>
  <el-dialog title="Edit Customer" :visible.sync="value" :before-close="closeModalWindow">
    <div class="edit-customer">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-customer-form"
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
          <el-form-item label="Birthday" label-width="120px" prop="birthDate">
            <el-date-picker
                v-model="form.birthDate"
                type="date"
                placeholder="Pick a day">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="City" label-width="120px" prop="cityName">
            <el-input v-model="form.cityName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Family Members" label-width="120px" prop="familyMembersCount">
            <el-input v-model.number="form.familyMembersCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Subscription" label-width="120px">
            <el-input v-model="form.subscriptionIsActive" autocomplete="off" readonly></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Orders" label-width="120px">
          <el-input v-model="form.ordersId" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        dialogText="delete current customer"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteCurrentCustomer}"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import rules from "@/helpers/validationRules";
import {mapActions} from 'vuex'

export default {
  name: "EditCustomerN",
  components: {ConfirmationWindow},
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
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: '',
        cityName: '',
        familyMembersCount: 0,
        subscriptionIsActive: false,
        ordersId: []
      },
    }
  },
  mixins: [confirmation],
  created() {
    this.form = {...this.$store.getters.getCurrentCustomer}
    this.form.subscriptionIsActive = this.form.subscriptionIsActive ? 'true' : 'false'
  },
  methods: {
    ...mapActions(['putCustomer', 'setErrorMessage', 'setCurrentCustomer', 'deleteCustomer']),
    submitForm() {
      let vm = this
      this.$refs['validation-customer-form'].validate(async (valid) => {
        if (valid) {
          let {birthDate} = this.form
          delete this.form.subscriptionIsActive
          delete this.form.ordersId
          if (birthDate && typeof birthDate !== 'string') {
            birthDate = birthDate.toLocaleDateString('en-GB')
            let [day, month, year] = birthDate.split('/')
            birthDate = `${year}-${month}-${day}T00:00:00`
          }
          await this.putCustomer({...this.form, birthDate})
          this.closeModalWindow()
        } else {
          await vm.setErrorMessage('Error with validation')
          return false;
        }
      });
    },
    closeModalWindow() {
      this.$emit('input', false)
      this.setCurrentCustomer()
    },
    async deleteCurrentCustomer() {
      await this.deleteCustomer()
      this.closeConfirmWindow()
      this.closeModalWindow()
    }
  }
}
</script>

<style>
</style>
