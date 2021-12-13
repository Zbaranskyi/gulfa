<template>
  <div class="top-row">
    <TitleOfPage/>

    <div class="top-row__right">
      <slot />
      <SearchRow
          v-if="!withoutSearch"
          @search="$emit('search', $event)"
      />
      <switch-language
          v-if="btnSwitch"
          :lang="value"
          @change-lang="$emit('input', $event)"
      />
      <el-button v-if="btnBackground && btnText" @click="$emit('btn-click')" class="button-top-row" type="info">{{btnText}}</el-button>
    </div>
  </div>
</template>

<script>
import TitleOfPage from "@/components/helpers/TitleOfPage";
import SearchRow from "@/components/helpers/SearchRow";
import SwitchLanguage from "@/components/helpers/SwitchLanguage";

export default {
  name: "TopRow",
  components: {SwitchLanguage, SearchRow, TitleOfPage},
  props: {
    btnBackground: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    btnWidth: {
      type: Number,
      default: 20
    },
    btnSwitch: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: 'en'
    },
    withoutSearch: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.top-row__right {
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-left: 20px;
  }
}
</style>
