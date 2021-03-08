<template>
<div id="payments">
  <TopRow
      @search="searchValue = $event"
  />
  <TableOfContent
      :titles="titles"
      :info="payments"
      v-model="searchValue"
  />
</div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')

import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Payments",
  components: {
    TableOfContent,
    TopRow
  },
  data() {
    return {
      titles: [
        'ID',
        'Date&Time',
        'Customer Name',
        'Price',
        'Payment Method'
      ],
      payments:  [
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          price: '$ 89.99',
          paymentMethod: 'Credit Card'
        },
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          price: '$ 89.99',
          paymentMethod: 'Credit Card'
        },{
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          price: '$ 89.99',
          paymentMethod: 'Credit Card'
        },
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          price: '$ 89.99',
          paymentMethod: 'Credit Card'
        },


      ],
      searchValue: ''
     }
  }
}
</script>

<style scoped>

</style>
