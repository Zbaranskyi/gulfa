<template>
  <div id="payments">
    <TopRow
        @search="searchValue = $event"
    />
    <el-table
        :data="payments"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="id"
          label="ID">
      </el-table-column>
      <el-table-column
          prop="date"
          label="Date&Time">
      </el-table-column>
      <el-table-column
          prop="name"
          label="Customer Name">
      </el-table-column>
      <el-table-column
          prop="price"
          label="Price">
      </el-table-column>
      <el-table-column
          prop="payMethod"
          label="Payment Method">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {payments} from "@/test-data/payments";
import {paymentsHeaders} from "@/test-data/headers";
import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Payments",
  components: {
    TopRow
  },
  data() {
    return {
      titles: paymentsHeaders,
      payments: payments,
      searchValue: ''
    }
  }
}
</script>

<style>
</style>
