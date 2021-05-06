<template>
  <div>
    <modal-window
        deleteButton
        @btn-click="putDriver"
        @close="$emit('input', false)"
        @delete-product="confirmDelete=true"
        :value="value">
      <template #title>
        Edit Driver
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
          </div>
        </div>
      </template>
      <template
          #button>Save changes</template>
    </modal-window>
    <confirmation-delete
        v-if="confirmDelete"
        v-model="confirmDelete"
        @delete-product="deleteDriver"
    />
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import ConfirmationDelete from "../helpers/ConfirmationDelete";
import {required, email, numeric} from 'vuelidate/lib/validators'

export default {
  name: "EditDriver",
  components: {ConfirmationDelete, InputWithLabel, ModalWindow},
  data () {
    return {
      driver: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      },
      confirmDelete: false,
    }
  },
  created() {
    let driver = this.$store.getters.getDriver(this.driverId)
    this.driver.firstName = driver.firstName
    this.driver.lastName = driver.lastName
    this.driver.phoneNumber = driver.phoneNumber
    this.driver.email = driver.email
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    driverId: {
      type: String
    }
  },
  validations: {
    driver: {
      firstName: {required},
      lastName: {required},
      phoneNumber: {required, numeric},
      email: {required, email},
    },
  },
  methods: {
    async putDriver() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.$store.dispatch('putDriver', {data: this.driver, id: this.driverId})
        this.$emit('input', false)
      }
    },
    async deleteDriver() {
      await this.$store.dispatch('deleteDriver', this.driverId)
      this.$emit('input', false)
    },
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
