<template>
  <el-dialog title="Add Promo" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-promo-form"
          label-position="top">
        <div
            style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 20px; justify-content: center">
          <el-form-item label="Code" label-width="120px" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Discount" label-width="120px" prop="discount">
            <el-input v-model.number="form.discount" autocomplete="off">
                <el-select v-model="select" slot="append" placeholder="Select">
                  <el-option label="%" value="%"></el-option>
                  <el-option label="$" value="$"></el-option>
                </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="Expire Date" prop="expireDate">
            <el-date-picker
                style="width: 100%"
                v-model="form.expireDate"
                type="date"
                :picker-options="pickerOptionsS"
                placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Personal Amount Use, times" label-width="120px" prop="personalAmountUse">
            <el-input v-model.number="form.personalAmountUse" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="User Email" label-width="120px" prop="ownerEmail">
            <el-input v-model="form.ownerEmail" :disabled="form.isForAll" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="For All Users" label-width="120px" prop="isForAll">
            <el-checkbox v-model="form.isForAll">For All Users</el-checkbox>
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
  name: "AddPromo",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
    let validateEmail = (rule, value, callback) => {
      if (!this.getIsForAll && !testEmail.test(String(value))) {
        callback(new Error('The email address is incorrect'))
      } else {
        callback();
      }
    }
    return {
      rules: {
        ...rules,
        ownerEmail: [
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
      },
      loadingSaveChanges: false,
      form: {
        code: '',
        discount: 0,
        toDiscountAmount: 0,
        expireDate: null,
        personalAmountUse: 0,
        ownerEmail: '',
        isForAll: false,
      },
      select: '%'
    }
  },
  computed: {
    ...mapState(['token']),
    pickerOptionsS () {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    },
    getIsForAll() {
      return this.form.isForAll
    }
  },
  methods: {
    ...mapActions(['setErrorMessage', 'setSuccessMessage']),
    ...mapMutations(['setLoading', 'unsetLoading']),
    submitForm() {
      let vm = this
      this.$refs['validation-promo-form'].validate(async (valid) => {
        if (valid) {
          await this.postPromo()
          this.closeModalWindow()
        } else {
          await vm.setErrorMessage('Error with validation')
          return false;
        }
      });
    },
    async postPromo() {
      this.setLoading()
      try {
        this.form.expireDate = this.form.expireDate.toLocaleDateString('en-GB')
        let [day, month, year] = this.form.expireDate.split('/')
        this.form.expireDate = `${year}-${month}-${day}T00:00:00`
        if(this.select === '$') {
          this.form.toDiscountAmount = this.form.discount
          this.form.discount = 0
        }
        if(this.form.isForAll) {
          this.form.ownerEmail = ''
        }
        await api.POST('/admin/promocode', this.form, this.token)
        this.$emit('get-promo')
        this.setSuccessMessage()
        this.closeModalWindow()
      } catch (e) {
        let errorMessage = e?.response?.data
        this.setErrorMessage(errorMessage)
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
.el-select .el-input {
  width: 60px;
  color: black;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
