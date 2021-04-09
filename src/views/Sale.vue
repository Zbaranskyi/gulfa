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
      v-for="(item,index) of sales"
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
      showEditSale: false
    }
  },
  methods: {
    editSale (id) {
      this.sale = this.sales.find(el=>el.id === id)
      this.showEditSale = true
    }
  }
}
</script>

<style scoped>

</style>
