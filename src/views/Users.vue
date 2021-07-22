<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <el-table
        :data="getFilteredData"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="name"
          label="Name">
      </el-table-column>
      <el-table-column
          prop="lastName"
          label="Last Name">
      </el-table-column>
      <el-table-column
          prop="number"
          label="Phone Number">
      </el-table-column>
      <el-table-column
          prop="birthday"
          label="Birthday">
      </el-table-column>
      <el-table-column
          prop="city"
          label="City">
      </el-table-column>
      <el-table-column
          prop="family"
          label="Family Members">
      </el-table-column>
      <el-table-column
          prop="lastOrder"
          label="Last Order">
      </el-table-column>
      <el-table-column
          label="Subscription">
        <template slot-scope="scope">
          <span>{{ scope.row.subscription }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="editCustomer(scope.row.id)"
          ><img src="../assets/icons/edit.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-customer-n
        v-if="showEditCustomer"
        v-model="showEditCustomer"
    />
  </div>
</template>

<script>
import {customersHeaders} from "@/test-data/headers";
import {mapGetters} from 'vuex'
import EditCustomerN from "@/components/customers/EditCustomerN";

export default {
  name: "Users",
  components: {
    EditCustomerN,
    TopRow: () => import('../components/helpers/TopRow'),
  },
  data() {
    return {
      titles: customersHeaders,
      searchValue: '',
      customerID: '',
      showEditCustomer: false,
    }
  },
  computed: {
    ...mapGetters(['getFilteredData', 'getCustomers'])
  },
  async created() {
    await this.$store.dispatch('getCustomers')
  },
  methods: {
    async editCustomer(id) {
      await this.$store.dispatch('setCurrentCustomer', id)
      this.showEditCustomer = true
    },
  }
}
</script>

<style>
</style>
