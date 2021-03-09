<template>
  <div class="top-row">
    <TitleOfPage/>
    <SearchRow
        @search="$emit('search', $event)"
    />
    <base-button
        v-if="btnBackground && btnText"
        :background="btnBackground"
        :width="btnWidth"
    >{{btnText}}</base-button>
  </div>
</template>

<script>
import TitleOfPage from "@/components/helpers/TitleOfPage";
import SearchRow from "@/components/helpers/SearchRow";
import BaseButton from "@/components/helpers/BaseButton";

export default {
  name: "TopRow",
  components: {BaseButton, SearchRow, TitleOfPage},
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
