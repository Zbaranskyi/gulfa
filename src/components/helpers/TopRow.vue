<template>
  <div class="top-row">
    <TitleOfPage/>
    <SearchRow
        @search="$emit('search', $event)"
    />
    <base-button
        v-if="btnBanners"
        background="#005CB9"
        :width="10"
    >Upload Banners</base-button>
    <switch-language
        v-if="btnSwitch"
        :lang="value"
        @change-lang="$emit('input', $event)"
    />
    <base-button
        v-if="btnBackground && btnText"
        :background="btnBackground"
        :width="btnWidth"
        @btn-click="$emit('btn-click')"
    >{{btnText}}</base-button>
  </div>
</template>

<script>
import TitleOfPage from "@/components/helpers/TitleOfPage";
import SearchRow from "@/components/helpers/SearchRow";
import BaseButton from "@/components/helpers/BaseButton";
import SwitchLanguage from "@/components/helpers/SwitchLanguage";

export default {
  name: "TopRow",
  components: {SwitchLanguage, BaseButton, SearchRow, TitleOfPage},
  props: {
    btnBackground: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    btnBanners: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>

<style scoped>
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 10px;
}
</style>
