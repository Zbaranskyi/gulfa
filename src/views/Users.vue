<template>
  <div id="users">
    <TopRow
        @search="searchValue = $event"
    />
    <TableOfContent
        :titles="titles"
        :info="data"
        v-model="searchValue"
    />
  </div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')
import TopRow from "@/components/helpers/TopRow";
export default {
  name: "Users",
  components: {
    TopRow,
    TableOfContent
  },
  data() {
    return {
      titles: [
        'Name',
        'Last Name',
        'Phone Number',
        'Birthday',
        'Delivery Address',
        'Family Members'
      ],
      data: [
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1991',
          address: 'Address',
          family: 4
        },
        {
          name: 'Max',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/2000',
          address: 'Address',
          family: 4
        },
        {
          name: 'Andrey',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1987',
          address: 'Address',
          family: 4
        },
        {
          name: 'Tom',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/2003',
          address: 'Address',
          family: 4
        },
        {
          name: 'John',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1960',
          address: 'Address',
          family: 4
        }
      ],
      searchValue: ''
    }
  }

}
</script>

<style scoped lang="scss">
</style>
