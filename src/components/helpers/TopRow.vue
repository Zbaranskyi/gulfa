<template>
  <div class="top-row">
    <TitleOfPage/>
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

<style scoped lang="scss">
@import "../../style/variables";

.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .button-top-row{
    width: 20%;
    border-radius: 10px;
    @include fontPoppins(12px, 600, 18px);
  }
}
</style>
