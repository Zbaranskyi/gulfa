<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <el-table
        :data="getOrders"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="id"
          label="Order ID">
      </el-table-column>
      <el-table-column
          prop="name"
          label="Customer Name">
      </el-table-column>
      <el-table-column
          prop="date"
          label="Date">
      </el-table-column>
      <el-table-column
          prop="total"
          label="Total">
      </el-table-column>
      <el-table-column
          prop="payStatus"
          label="Payment Status">
      </el-table-column>
      <el-table-column
          prop="subscription"
          label="Subscription">
      </el-table-column>
      <el-table-column
          label="View Details">
        <template slot-scope="scope">
          <span @click="showDetails(scope.row.id)"
                style="cursor: pointer; text-decoration: underline">View Details</span>
        </template>
      </el-table-column>
    </el-table>
    <order-details-n
        v-if="details"
        v-model="details"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import {orders} from "@/test-data/headers";
import OrderDetailsN from "@/components/orders/OrderDetailsN";

export default {
  name: "Orders",
  components: {
    OrderDetailsN,
    TopRow,
  },
  data() {
    return {
      titles: orders,
      data: [],
      searchValue: '',
      details: false,
    }
  },
  async created() {
    await this.$store.dispatch('getOrders')
  },
  computed: {
    getOrders() {
      return this.$store.getters.getSimpleOrdersInformation
    }
  },
  methods: {
    showDetails(id) {
      this.$store.dispatch('showOrderDetails', id)
      this.details = true
    }
  }
}
</script>

<style>
</style>
