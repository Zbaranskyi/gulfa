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
      v-if="showAddSale"
      v-model="showAddSale"
  />
  <edit-sale
      v-if="showEditSale"
      :saleId="saleId"
      v-model="showEditSale"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import SaleItem from "@/components/helpers/SaleItem";
import AddSale from "../components/sales/AddSale";
import EditSale from "../components/sales/EditSale";

export default {
  name: "Sale",
  components: {EditSale, AddSale, SaleItem, TopRow},
  data () {
    return {
      lang: 'en',
      showAddSale: false,
      saleId: '',
      showEditSale: false,
      searchValue: ''
    }
  },
  async created () {
    await this.$store.dispatch('getSales')
    await this.$store.dispatch('getProducts')
  },
  computed: {
    getReformatSales () {
      return this.$store.getters.getReformatSales
    },
    // TODO it
    // sortedInfo () {
    //   let sort = []
    //   if(this.searchValue) {
    //     for(let item of this.getReformatSales) {
    //       for(let prop in item) {
    //         if(String(item[prop]).toLowerCase().includes(this.value.toLowerCase())) {
    //           sort.push(item)
    //           break;
    //         }
    //       }
    //     }
    //   } else return this.getReformatSales
    //   return sort
    // }
  },
  methods: {
    editSale (id) {
      this.saleId = id
      this.showEditSale = true
    }
  }
}
</script>

<style scoped>

</style>
