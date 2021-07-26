<template>
  <el-dialog :title="getEditCity ? 'Edit City' : 'Create New City'" :visible.sync="value"
             :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-city-form"
          label-position="top">
        <el-form-item label="City Name" label-width="120px" prop="cityName">
          <el-input v-model="form.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="District" label-width="120px" prop="districtName">
          <el-input v-model="form.districtName" autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item label="Address" prop="address">-->
        <!--          <el-input-->
        <!--              type="textarea"-->
        <!--              :autosize="{ minRows: 3}"-->
        <!--              v-model="form.address"-->
        <!--          >-->
        <!--          </el-input>-->
        <!--        </el-form-item>-->
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
import {mapActions} from 'vuex'
import rules from "@/helpers/validationRules";

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
      rules,
      loadingSaveChanges: false,
      form: {
        cityName: "",
        districtName: "",
        // address: "",
      }
    }
  },
  computed: {
    getEditCity() {
      return this.$store.state.cities.editCity
    }
  },
  created() {
    if (this.getEditCity) {
      let {cityName, districtName} = this.getEditCity
      this.form = {cityName, districtName}
    }
  },
  methods: {
    ...mapActions(['setErrorMessage']),
    async submitForm() {
      try {
        await this.$refs['validation-city-form'].validate()
        this.loadingSaveChanges = true
        if(this.getEditCity) await this.$store.dispatch('putCity', this.form)
        else await this.$store.dispatch('postNewCity', this.form)
        this.loadingSaveChanges = false
        this.closeModalWindow()
      } catch (e) {
        await this.setErrorMessage('Error with validation')
        console.log(e)
      }
    },
    closeModalWindow() {
      this.$store.dispatch('setEditCity', null)
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
