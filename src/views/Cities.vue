<template>
  <div id="notifications">
        <TopRow
            @search="searchValue = $event"
            :btn-background="'#ED1C24'"
            btn-text="Create New Notification"
            @btn-click="showAddNotification = true"
        />
    <!--  <TableOfContent-->
    <!--      :titles="titles"-->
    <!--      :info="getNotifications"-->
    <!--      v-model="searchValue"-->
    <!--  />-->
    <el-table
        :data="table"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="name"
          label="City">
      </el-table-column>
      <el-table-column
          prop="district"
          label="District">
      </el-table-column>
      <el-table-column
          prop="address"
          label="Address">
      </el-table-column>
    </el-table>
    <add-notification v-if="showAddNotification" v-model="showAddNotification"/>
  </div>
</template>

<script>
import AddNotification from "../components/notifications/AddNotification";

// const TableOfContent = () => import('@/components/helpers/TableOfContent');
import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Cities",
  components: {
    AddNotification,
    TopRow,
    // TableOfContent
  },
  data() {
    return {
      titles: [
        'Date&Time',
        'Description'
      ],
      table: [
        {
          name: 'City 1',
          district: 'District 1',
          address: 'Address'
        },
        {
          name: 'City 2',
          district: 'District 2',
          address: 'Address'
        },
        {
          name: 'City 3',
          district: 'District 3',
          address: 'Address'
        },
        {
          name: 'City 4',
          district: 'District 4',
          address: 'Address'
        }
      ],
      searchValue: '',
      showAddNotification: false
    }
  },
  // async created() {
  //   await this.$store.dispatch('getNotifications')
  // },
  computed: {
    getNotifications() {
      return this.$store.getters.getNotifications
    }
  }
}
</script>

<style scoped>

</style>
