<template>
<div id="drivers">
  <TopRow
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      @search="searchValue = $event"
  />
  <TableOfContent
      :titles="titles"
      :info="drivers"
      v-model="searchValue"
  />
</div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')

import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Drivers",
  components: {TopRow, TableOfContent},
  data() {
    return {
      titles: [
        'Name',
        'Last Name',
        'Phone Number',
        'Email',
        'Delivery Address'
      ],
      drivers: [
        {
          name: 'Andrey',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          email: 'email@gmail.com',
          address: 'Address'
        },
        {
          name: 'John',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          email: 'email@gmail.com',
          address: 'Address'
        },
        {
          name: 'Tom',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          email: 'email@gmail.com',
          address: 'Address'
        },
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          email: 'email@gmail.com',
          address: 'Address'
        },
      ],
      searchValue: '',
      btnText: 'Create New Driver',
    }
  }
}
</script>

<style scoped>

</style>
