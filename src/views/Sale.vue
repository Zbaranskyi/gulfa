<template>
<div id="sale">
  <TopRow
      btnSwitch
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      v-model="lang"
      @btn-click="showAddSale = true"
  />
  <sale-item
      v-for="(item,index) of  trueSales"
      :key="index"
      :item="item"
      :lang="lang"
      @edit-item="editSale"
  />
  <add-sale
      v-if="showAddSale"
      v-model="showAddSale"
  />
  <edit-sale
      v-if="showEditSale"
      :sale="sale"
      v-model="showEditSale"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import {sale} from "@/test-data/sale";
import SaleItem from "@/components/helpers/SaleItem";
import AddSale from "../components/sales/AddSale";
import EditSale from "../components/sales/EditSale";
import api from "../service/api";

export default {
  name: "Sale",
  components: {EditSale, AddSale, SaleItem, TopRow},
  data () {
    return {
      btnText: 'Create New Sale',
      sales: sale,
      lang: 'en',
      showAddSale: false,
      sale: {},
      showEditSale: false,
      trueSales: []
    }
  },
  computed: {
    getToken() {
      return localStorage.getItem('token')
    }
  },
  async created () {
    await this.getSales()
  },
  methods: {
    editSale (id) {
      this.sale = this.trueSales.find(el=>el.id === id)
      this.showEditSale = true
    },
    async getSales () {
      await api.GET('/sale', this.getToken)
      .then(this.isReformater)
      .catch(console.dir )
    },
    isReformater({data}) {
      let res = []
      console.log(data)
      if (data.length) {
        res = data.map(el=>{
          let orders = []
          if(el.shopItems.length) {
            orders = el.shopItems.map(order=>{
              return {
                id: order.id,
                title: order.title,
                image: '',
                volume: `${order.volume}LT`,
                price: `$${order.price*(1-0.01*el.percent)}`
              }
            })
          }
          return {
            id: el.id,
            title: {
              en: el?.title ?? '',
              ar: el?.titleAr ?? ''
            },
            type: '1',
            typeValue: String(el.percent),
            fromDate: new Date(el.startDate),
            toDate: new Date(el.endDate),
            description: {
              en: el?.description ?? '',
              ar: el?.descriptionAr ?? ''
            },
            products: orders
          }
        })
      }
      this.trueSales = res
    }
  }
}
</script>

<style scoped>

</style>
