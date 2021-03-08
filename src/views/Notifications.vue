<template>
<div id="notifications">
  <TopRow
      @search="searchValue = $event"
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
  />
  <TableOfContent
      :titles="titles"
      :info="notifications"
      v-model="searchValue"
  />
</div>
</template>

<script>
const TableOfContent = () => import('@/components/helpers/TableOfContent')

import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Notifications",
  components: {TopRow, TableOfContent},
  data() {
    return {
      titles:  [
        'Date&Time',
        'Theme',
        'Description'
      ],
      notifications: [
        {
          date: '01/02/2021 13:51 PM',
          theme: 'Theme',
          number: 'Description'
        },
        {
          date: '01/01 /2021 13:51 PM',
          theme: 'Theme',
          number: 'Description'
        },
        {
          date: '01/03/2021 13:51 PM',
          theme: 'Theme',
          number: 'Description'
        }
      ],
      searchValue: '',
      btnText: 'Create New Notification'
    }
  }
}
</script>

<style scoped>

</style>
