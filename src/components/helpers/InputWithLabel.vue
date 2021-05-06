<template>
  <div class="input" :style="`width: ${width}%`">
    <p class="label">{{ title }}</p>
    <div style="display: flex; align-items: center">
      <input :style="`text-align: ${align}`"
             :readonly="readonly"
             :value="value"
             :type="inputType"
             :class="{invalid: error}"
             @input="$emit('input', $event.target.value)">
      <span class="label">{{inputLabel}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWithLabel",
  data () {
    return {
      model: null
    }
  },
  props: {
    title: {
      type: String,
      default: 'Label'
    },
    value: {
      type: String,
      default: ''
    },
    inputLabel: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 100
    },
    align: {
      type: String,
      default: 'left'
    },
    inputType: {
      type: String,
      default: 'text'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    minMaxValidate: {
      type: Boolean,
      default: false
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
  input {
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    height: 30px;
    padding: 0 10px;
    margin: 10px 0;
    width: 100%;
    @include fontPoppins(12px, 500, 20px);
  }
}

</style>
