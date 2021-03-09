<template>
  <div class="input" :style="`width: ${width}%`">
    <p class="label">{{ title }}</p>
    <textarea :style="`text-align: ${align}`" :value="value" @input="$emit('input', $event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  name: "TextareaWithLabel",
  props: {
    title: {
      type: String,
      default: 'Label'
    },
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.input {
  display: flex;
  flex-direction: column;
  .label {
    @include fontPoppins(12px, 500, 20px);
    padding: 0 15px 0 5px;
  }
  textarea {
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    min-height: 100px;
    outline: none;
    padding: 10px;
    margin: 10px 20px 0 0;
    resize: none;
    box-sizing: border-box;
    @include fontPoppins(12px, 500, 20px);
  }
}

</style>
