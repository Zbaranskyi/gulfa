<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        withID
        :titles="titles"
        :info="getOrders"
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
      selectId: ''
    }
  },
  async created() {
    await this.$store.dispatch('getOrders')
  },
  computed: {
    getOrders () {
      return this.$store.getters.getSimpleOrdersInformation
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
