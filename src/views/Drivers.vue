<template>
<div id="drivers">
  <TopRow
      :btn-background="'#ED1C24'"
      btn-text="Create New Driver"
      @search="searchValue = $event"
      @btn-click="showAddDriver = true"
  />
  <TableOfContent
      withID
      edit
      :titles="titles"
      :info="getDrivers"
      v-model="searchValue"
      @edit-action="editDriver"
  />
  <add-driver
      v-if="showAddDriver"
      v-model="showAddDriver"
  />
  <edit-driver
      v-if="showEditDriver"
      v-model="showEditDriver"
      :driverId="driverId"
  />
</div>
</template>

<script>
import AddDriver from "../components/drivers/AddDriver";
const TableOfContent = () => import('@/components/helpers/TableOfContent')
import {driversHeaders} from "@/test-data/headers";
import {drivers} from "@/test-data/drivers";
import TopRow from "@/components/helpers/TopRow";
import EditDriver from "../components/drivers/EditDriver";

export default {
  name: "Drivers",
  components: {EditDriver, AddDriver, TopRow, TableOfContent},
  data() {
    return {
      titles: driversHeaders,
      drivers: drivers,
      searchValue: '',
      showAddDriver: false,
      showEditDriver: false,
      driverId: ''
    }
  },
  computed: {
    getDrivers () {
      return this.$store.state.drivers.data
    }
  },
  async created() {
    await this.$store.dispatch('getDrivers')
  },
  methods: {
    editDriver ({id}) {
      this.driverId = id
      this.showEditDriver = true
    }
  }
}
</script>

<style scoped>

</style>
