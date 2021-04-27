<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        edit
        :titles="titles"
        :info="data"
        v-model="searchValue"
        @edit-action="editCustomer"
    />
    <edit-customer
        v-if="showEditCustomer"
        :customer="customer"
        v-model="showEditCustomer"
    />
  </div>
</template>

<script>
import {customersHeaders} from "../test-data/headers";
import {customers, customersFull} from "../test-data/customers";
import EditCustomer from "../components/customers/EditCustomer";
import api from "@/service/api";

export default {
  name: "Users",
  components: {
    EditCustomer,
    TopRow: () => import('@/components/helpers/TopRow'),
    TableOfContent: () => import('@/components/helpers/TableOfContent')
  },
  data() {
    return {
      titles: customersHeaders,
      data: customers,
      fullData: customersFull,
      searchValue: '',
      customer: {},
      showEditCustomer: false
    }
  },
  methods: {
    editCustomer ({name}) {
      this.customer = this.fullData.find(el=>el.name === name)
      this.showEditCustomer = true
    },
    async getCustomers () {
      await api.GET('/')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
