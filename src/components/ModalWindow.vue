<template >
  <div class="shadow" v-if="value">
    <div class="modal" :style="`max-width: ${orders ? `800`:`600`}px`">
      <span class="close" @click="$emit('close')"><img src="../assets/icons/close.svg" alt=""></span>
      <h2 class="title"><slot name="title"></slot></h2>
      <slot></slot>
      <base-button
          v-show="!withoutButton"
          @btn-click="$emit('btn-click')"
          class="button"
          background="#005CB9"
         :width="40"
      ><slot name="button"></slot></base-button>
<!--      <div style="background: yellow; width: 100%; height: 100%"></div>-->
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/helpers/BaseButton";
export default {
  name: "ModalWindow",
  components: {BaseButton},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    orders: {
      type: Boolean,
      default: false
    },
    withoutButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.shadow{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000060;
  .modal {
    z-index: 15;
    min-width: 500px;
    width: 70%;
    max-width: 600px;
    //height: 500px;
    overflow: auto;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 30px;
    box-sizing: border-box;
    input, select, textarea {
      width: 300px;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .title{
      @include fontPoppins(20px, 500, 20px);
      padding-bottom: 30px;
    }
    .button{
      margin-top: 30px;
    }
  }

}
</style>
