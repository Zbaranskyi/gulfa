<template>
  <modal-window
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
                v-model="name"
                :width="50"
            />
            <InputWithLabel
                title="Last Name"
                v-model="lastName"
                :width="50"
            />
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Phone Number"
                v-model="number"
                :width="50"
            />
            <InputWithLabel
                title="Email"
                v-model="email"
                :width="50"
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

export default {
  name: "AddDriver",
  components: {InputWithLabel, ModalWindow},
  data () {
    return {
      name: '',
      lastName: '',
      number: '',
      email: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
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
