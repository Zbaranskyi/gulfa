<template>
<div id="drivers">
  <TopRow
      :btn-background="'#ED1C24'"
      :btn-text="btnText"
      @search="searchValue = $event"
      @btn-click="showAddDriver = true"
  />
  <TableOfContent
      edit
      :titles="titles"
      :info="drivers"
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
      :driver="driver"
  />
</div>
</template>

<script>
import AddDriver from "../components/drivers/AddDriver";
const TableOfContent = () => import('@/components/helpers/TableOfContent')
import {driversHeaders} from "../test-data/headers";
import {drivers} from "../test-data/drivers";
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
      btnText: 'Create New Driver',
      showAddDriver: false,
      showEditDriver: false,
      driver: {}
    }
  },
  methods: {
    editDriver ({id}) {
      console.log(id)
      this.driver = this.drivers.find(el=>el.id === id)
      this.showEditDriver = true
    }
  }
}
</script>

<style scoped>

</style>
