<template>
  <modal-window
      @btn-click="postNewDriver"
      @close="$emit('input', false)"
      :value="value">
    <template #title>
      Create New Driver
    </template>
    <template #default>
      <div class="main-block">
        <div class="info">
          <div class="info-row">
            <InputWithLabel
                title="First Name"
                v-model="driver.firstName"
                :width="50"
                :error="$v.driver.firstName.$error"
            />
            <InputWithLabel
                title="Last Name"
                v-model="driver.lastName"
                :width="50"
                :error="$v.driver.lastName.$error"
            />
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Phone Number"
                v-model="driver.phoneNumber"
                :width="50"
                :error="$v.driver.phoneNumber.$error"
            />
            <InputWithLabel
                title="Email"
                v-model="driver.email"
                :width="50"
                :error="$v.driver.email.$error"
            />
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Password"
                inputType="password"
                v-model="driver.password"
                :width="50"
                :error="$v.driver.password.$error"
            />
          </div>
        </div>
      </div>
    </template>
    <template
        #button>Save changes</template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import {required, numeric, email} from 'vuelidate/lib/validators'
import {hardPassword} from "../../helpers/validate";

export default {
  name: "AddDriver",
  components: {InputWithLabel, ModalWindow},
  data () {
    return {
      driver: {
        "password": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNumber": ""
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    driver: {
      "password": {required, hardPassword},
      "firstName": {required},
      "lastName": {required},
      "email": {required, email},
      "phoneNumber": {required, numeric}
    }
  },
  methods: {
    async postNewDriver () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.$store.dispatch('postDriver', this.driver)
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block{
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);
  .select-category{
    position: relative;
    margin: 0 0 20px;
    select {
      border: 1px solid #E8E8E8;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
    }
    p{
      //&:after{
      //  position: absolute;
      //  display: block;
      //  content: '';
      //  width: 17px;
      //  height: 17px;
      //  background: #005CB9 url('../../assets/icons/arrow.svg') no-repeat center;
      //  top: 30px;
      //  left: 279px;
      //  border-radius: 5px;
      //  cursor: pointer;
      //}
    }

  }
  .image-block{
    display: flex;
    margin-bottom: 30px;
  }
  .image{
    width: 150px;
    height: 100px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  .image-cropper {
    width: 150px;
    height: 100px;
    //background: yellow;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    color: #2F3741;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    &-row {
      margin-top: 10px;
      display: flex;
      &.descriptions{
        //justify-content: space-between;
      }
    }
  }
}
</style>
