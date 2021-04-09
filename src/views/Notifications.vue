<template>
<div id="notifications">
  <TopRow
      @search="searchValue = $event"
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      @btn-click="showAddNotification = true"
  />
  <TableOfContent
      :titles="titles"
      :info="notifications"
      v-model="searchValue"
  />
  <add-notification
      v-if="showAddNotification"
      v-model="showAddNotification"
  />
</div>
</template>

<script>
import AddNotification from "../components/notifications/AddNotifications";
const TableOfContent = () => import('@/components/helpers/TableOfContent')

import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Notifications",
  components: {AddNotification, TopRow, TableOfContent},
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
      btnText: 'Create New Notification',
      showAddNotification: false
    }
  }
}
</script>

<style scoped>

</style>
