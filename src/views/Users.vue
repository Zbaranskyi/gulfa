<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        edit
        :titles="titles"
        :info="getFilteredData"
        v-model="searchValue"
        @edit-action="editCustomer"
    />
    <edit-customer
        v-if="showEditCustomer"
        :customerID="customerID"
        v-model="showEditCustomer"
    />
  </div>
</template>

<script>
import {customersHeaders} from "@/test-data/headers";
import EditCustomer from "../components/customers/EditCustomer";
import {mapGetters} from 'vuex'

export default {
  name: "Users",
  components: {
    EditCustomer,
    TopRow: () => import('../components/helpers/TopRow'),
    TableOfContent: () => import('../components/helpers/TableOfContent')
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
    editCustomer ({id}) {
      this.customerID = id
      this.showEditCustomer = true
    },
  }
}
</script>

<style scoped lang="scss">
</style>
