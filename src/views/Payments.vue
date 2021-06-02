<template>
<div id="payments">
  <TopRow
      @search="searchValue = $event"
  />
  <TableOfContent
      withID
      :titles="titles"
      :info="payments"
      v-model="searchValue"
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

<style lang="scss">
@import "../style/variables";

.header-cell{
  background-color: #D2F4FF!important;
  color: $color-background-blue;
  @include fontPoppins(12px, 600, 18px);
  text-align: center!important;
}
.table-cell{
  text-align: center!important;
  @include fontPoppins(12px, 400, 18px);
  color: #2F3741;
}
.el-table__header-wrapper{
  border-radius: 10px;
}
.el-table--enable-row-hover .el-table__body tr:hover{
  border: 1px solid #E8E8E8;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
}
</style>
