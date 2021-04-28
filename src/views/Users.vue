<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        edit
        :titles="titles"
        :info="filteredData"
        v-model="searchValue"
        @edit-action="editCustomer"
    />
    <edit-customer
        v-if="showEditCustomer"
        :customer="customer"
        v-model="showEditCustomer"
        @save-changes="putCustomer"
        @delete-customer="deleteCustomer"
    />
  </div>
</template>

<script>
import {customersHeaders} from "../test-data/headers";
import EditCustomer from "../components/customers/EditCustomer";
import api from "@/service/api";
import elementUI from "@/mixins/elementUI";


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
      customer: {},
      showEditCustomer: false,
      filteredData: [],
      trueData: [],
      fullData: []
    }
  },
  mixins: [elementUI],
  computed: {
    getToken() {
      return localStorage.getItem('token')
    }
  },
  async created() {
    await this.getCustomers()
  },
  methods: {
    editCustomer ({id}) {
      this.customer = this.fullData.find(el=>el.id === id)
      console.log(this.customer)
      this.showEditCustomer = true
    },
    async getCustomers () {
      let vm = this
      await api.GET('/admin/customers', this.getToken)
      .then(r=> {
        vm.trueData = [...r.data]
        vm.filteredData = r.data.map(el=>({
          id: el.id,
          name: el.firstName ?? '----',
          lastName: el.lastName ?? '----',
          number: el.phoneNumber ?? '----',
          birthday: el?.birthDate ? new Intl.DateTimeFormat('en-GB').format(new Date(el.birthDate)) : '----',
          city: el.cityName ?? '----',
          family: el.familyMembersCount ?? '----',
          lastOrder: el.ordersId?.length ? el.ordersId[0] : '----',
          subscription: el.subscriptionIsActive
        }))
        vm.fullData = r.data.map(el=>({
          id: el.id,
          name: el.firstName ?? '',
          lastName: el.lastName ?? '',
          number: el.phoneNumber ?? '',
          birthday: el?.birthDate ? new Intl.DateTimeFormat('en-GB').format(new Date(el.birthDate)) : '',
          city: el.cityName ?? '',
          family: String(el.familyMembersCount),
          lastOrder: el.ordersId?.length ? el.ordersId[0] : '',
          orders: el.ordersId ?? [],
          subscription: el.subscriptionIsActive ? 'yes' : ''
        }))
      })
          .catch(() => {
            vm.$emit('error-action')
          })
      console.log(this.trueData)
    },
    async putCustomer(customer, id) {
      this.initLoading()
      let dataCustomer = this.trueData.find(el=>el.id===id)
      let [day, month, year]  = customer.birthday.split("/")
      let data = {
        firstName: customer.name ? customer.name : null,
        lastName: customer.lastName ? customer.lastName : null,
        phoneNumber: customer.number ? customer.number : null,
        birthDate: new Date(Date.UTC(+year, month-1, +day)).toJSON(),
        familyMembersCount: customer.family ? Number(customer.family) : 0,
        nationality: dataCustomer.nationality,
        addressTranslations: [
          {
            "culture": "en",
            "cityName": customer.city ? customer.city : null,
            "districtName": dataCustomer.districtName,
            "street": dataCustomer.street,
            "building": dataCustomer.building,
            "apartment": dataCustomer.apartment
          }
        ]
      }
      await api.PUT(`/admin/customer/${id}`, data, this.getToken)
          .then(() => {
            this.getCustomers()
            this.$emit('success-action')
          })
          .catch(() => {
            this.$emit('error-action')
          })
      await this.loading.close();

    },
    async deleteCustomer (id) {
      this.initLoading()
      let vm = this
      await api.DELETE(`/admin/customer/${id}`, this.getToken)
          .then(() => {
            this.getCustomers()
            this.$emit('success-action')
          })
          .catch(() => {
            vm.$emit('error-action')
          })
      await this.loading.close();
    }
  }
}
</script>

<style scoped lang="scss">
</style>
