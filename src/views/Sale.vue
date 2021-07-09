<template>
  <div id="sale">
    <TopRow
        btnSwitch
        :btn-background="'#ED1C24'"
        btn-text="Create New Sale"
        v-model="lang"
        @search="searchValue = $event"
        @btn-click="showAddSale = true"
    />
    <sale-item
        v-for="(item,index) of getReformatSales"
        :key="index"
        :item="item"
        :lang="lang"
        @edit-item="editSale"
    />
    <add-sale
        v-if="false"
        v-model="showAddSale"
    />
    <add-sale-n
        v-if="showAddSale"
        v-model="showAddSale"
    />
    <edit-sale
        v-if="false"
        :saleId="saleId"
        v-model="showEditSale"
    />
    <edit-sale-n
        v-if="showEditSale"
        v-model="showEditSale"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import SaleItem from "@/components/helpers/SaleItem";
import AddSale from "../components/sales/AddSale";
import EditSale from "../components/sales/EditSale";
import AddSaleN from "@/components/sales/AddSaleN";
import EditSaleN from "@/components/sales/EditSaleN";
import {mapActions} from 'vuex'

export default {
  name: "Sale",
  components: {EditSaleN, AddSaleN, EditSale, AddSale, SaleItem, TopRow},
  data() {
    return {
      lang: 'en',
      showAddSale: false,
      saleId: '',
      showEditSale: false,
      searchValue: ''
    }
  },
  async created() {
    await this.getSales()
    await this.getProducts()
  },
  computed: {
    getReformatSales() {
      return this.$store.getters.getReformatSales
    },
  },
  methods: {
    ...mapActions(['getSales', 'getProducts', 'setCurrentSale']),
    async editSale(id) {
      await this.setCurrentSale(id)
      this.showEditSale = true
    }
  }
}
</script>

<style scoped>

</style>
