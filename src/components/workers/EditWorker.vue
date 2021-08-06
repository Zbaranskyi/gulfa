<template>
  <el-dialog title="Edit Worker" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-worker-form"
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
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        dialogText="delete current worker"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteWorker}"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import {mapActions, mapMutations, mapState} from 'vuex'
import rules from "@/helpers/validationRules";
import api from "../../service/api";

export default {
  name: "EditWorker",
  components: {ConfirmationWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentWorker: {
      type: Object,
      default: () => ({})
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
      },
    }
  },
  computed: mapState(['token']),
  mixins: [confirmation],
  created() {
    this.form = {...this.currentWorker}
  },
  methods: {
    ...mapActions(['setErrorMessage', 'setSuccessMessage']),
    ...mapMutations(['setLoading', 'unsetLoading']),
    closeModalWindow() {
      this.$emit('input', false)
    },
    async deleteWorker() {
      this.setLoading()
      try {
        await api.DELETE(`/admin/worker/${this.currentWorker.id}`, this.token)
        this.$emit('get-workers')
        this.setSuccessMessage()
        this.closeConfirmWindow()
        this.closeModalWindow()
      } catch (e) {
        this.setErrorMessage()
        console.log(e)
      } finally {
        this.unsetLoading()
      }
    }
  }
}
</script>

<style>
</style>
