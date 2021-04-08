<template>
<div id="sale">
  <TopRow
      btnSwitch
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      v-model="lang"
  />
  <sale-item
      v-for="(item,index) of sales"
      :key="index"
      :item="item"
      :lang="lang"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import {sale} from "@/test-data/sale";
import SaleItem from "@/components/helpers/SaleItem";

export default {
  name: "Sale",
  components: {SaleItem, TopRow},
  data () {
    return {
      btnText: 'Create New Sale',
      sales: sale,
      lang: 'en'
    }
  }
}
</script>

<style scoped>

</style>
