<template>
  <div id="notifications">
    <TopRow
        @search="searchValue = $event"
        :btn-background="'#ED1C24'"
        btn-text="Create New Notification"
        @btn-click="showAddNotification = true"
    />
    <el-table
        :data="getNotifications"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="postedTime"
          label="Date&Time">
      </el-table-column>
      <el-table-column
          prop="body"
          label="Description">
      </el-table-column>
    </el-table>
    <add-notification v-if="showAddNotification" v-model="showAddNotification"/>
  </div>
</template>

<script>
import AddNotification from "../components/notifications/AddNotification";

import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Notifications",
  components: {
    AddNotification,
    TopRow,
  },
  data() {
    return {
      titles: [
        'Date&Time',
        'Description'
      ],
      searchValue: '',
      showAddNotification: false
    }
  },
  async created() {
    await this.$store.dispatch('getNotifications')
  },
  computed: {
    getNotifications() {
      return this.$store.getters.getNotifications
    }
  }
}
</script>

<style>

</style>
