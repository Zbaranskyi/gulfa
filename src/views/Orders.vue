<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        :titles="titles"
        :info="data"
        v-model="searchValue"
        orders
        @show-details="showDetails"
    />
    <order-details
        v-if="details"
        :selectId="selectId"
        v-model="details"
    />
  </div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')
import TopRow from "@/components/helpers/TopRow";
import {tableOrders} from "@/test-data/orders";
import {orders} from "@/test-data/headers";
import OrderDetails from "@/components/helpers/OrderDetails";

export default {
  name: "Orders",
  components: {
    OrderDetails,
    TopRow,
    TableOfContent
  },
  data() {
    return {
      titles: orders,
      data: tableOrders,
      searchValue: '',
      details: false,
      selectId: '#123451'
    }
  },
  methods: {
    showDetails (id) {
      this.selectId = id
      this.details = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
