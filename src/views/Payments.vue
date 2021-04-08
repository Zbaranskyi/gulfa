<template>
<div id="payments">
  <TopRow
      @search="searchValue = $event"
  />
  <TableOfContent
      :titles="titles"
      :info="payments"
      v-model="searchValue"
  />
</div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')
import {payments} from "@/test-data/payments";
import {paymentsHeaders} from "@/test-data/headers";
import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Payments",
  components: {
    TableOfContent,
    TopRow
  },
  data() {
    return {
      titles: paymentsHeaders,
      payments:  payments,
      searchValue: ''
     }
  }
}
</script>

<style scoped>

</style>
