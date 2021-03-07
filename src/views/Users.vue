<template>
  <div id="users">
    <TableOfContent
        :titles="titles"
        :info="users"
    />
  </div>
</template>

<script>
import TableOfContent from "@/components/helpers/TableOfContent";

export default {
  name: "Users",
  components: {TableOfContent},
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
      users: [
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1990',
          address: 'Address',
          family: 4
        },
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1990',
          address: 'Address',
          family: 4
        },
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1990',
          address: 'Address',
          family: 4
        },
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1990',
          address: 'Address',
          family: 4
        },
        {
          name: 'Alex',
          lastName: 'Smith',
          number: '+ 123 456 7890',
          birthday: '28/07/1990',
          address: 'Address',
          family: 4
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
