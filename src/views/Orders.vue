<template>
  <div id="users">
    <TopRow @search="searchValue = $event">
      <el-select
          v-model="filterByCity"
          clearable
          placeholder="Filter by City"
          @change="filterByDistrict = null"
      >
        <el-option
            v-for="city in getCityList"
            :key="city"
            :label="city"
            :value="city">
        </el-option>
      </el-select>

      <el-select
          v-if="filterByCity"
          v-model="filterByDistrict"
          clearable
          placeholder="Filter by District"
      >
        <el-option
            v-for="district in getDistrictList(filterByCity)"
            :key="district"
            :label="district"
            :value="district">
        </el-option>
      </el-select>
    </TopRow>
    <el-table
        :data="getSimpleOrdersInformation(searchValue, filterByCity, filterByDistrict)"
        cell-class-name="table-cell"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        style="width: 100%"
    >
      <el-table-column
          label="Order ID"
          prop="id">
      </el-table-column>
      <el-table-column
          label="Customer Name"
          prop="name">
      </el-table-column>
      <el-table-column
          label="City"
          prop="cityName"
          sortable>
      </el-table-column>
      <el-table-column
          label="District"
          prop="districtName"
          sortable>
      </el-table-column>
      <el-table-column
          label="Date"
          prop="date">
      </el-table-column>
      <el-table-column
          label="Total"
          prop="total">
      </el-table-column>
      <el-table-column
          label="Payment Status"
          prop="payStatus">
      </el-table-column>
      <el-table-column
          label="Subscription"
          prop="subscription">
      </el-table-column>
      <el-table-column
          label="View Details">
        <template slot-scope="scope">
          <span style="cursor: pointer; text-decoration: underline"
                @click="showDetails(scope.row.id)">View Details</span>
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
import TopRow from '@/components/helpers/TopRow'
import {orders} from '@/test-data/headers'
import OrderDetailsN from '@/components/orders/OrderDetailsN'
import {mapGetters} from 'vuex'

export default {
  name: 'Orders',
  components: {
    OrderDetailsN,
    TopRow,
  },
  data() {
    return {
      titles: orders,
      data: [],
      searchValue: '',
      filterByCity: null,
      filterByDistrict: null,
      details: false,
    }
  },
  async created() {
    await this.$store.dispatch('getOrders')
  },
  computed: {
    ...mapGetters([
      'getSimpleOrdersInformation',
      'getCityList',
      'getDistrictList',
    ]),
  },
  methods: {
    showDetails(id) {
      this.$store.dispatch('showOrderDetails', id)
      this.details = true
    },
  },
}
</script>

<style>
</style>
