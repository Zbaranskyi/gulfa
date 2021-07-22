<template>
  <div id="drivers">
    <TopRow
        :btn-background="'#ED1C24'"
        btn-text="Create New Driver"
        @search="searchValue = $event"
        @btn-click="showAddDriver = true"
    />
    <el-table
        :data="getDriversS"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="firstName"
          label="Name">
      </el-table-column>
      <el-table-column
          prop="lastName"
          label="Last Name">
      </el-table-column>
      <el-table-column
          prop="email"
          label="Email">
      </el-table-column>
      <el-table-column
          prop="phoneNumber"
          label="Phone Number">
      </el-table-column>
      <el-table-column
          prop="id"
          label="Employee ID">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="editDriver(scope.row.id)"
          ><img src="../assets/icons/edit.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-driver-n
        v-if="showAddDriver"
        v-model="showAddDriver"
    />
    <edit-driver-n
        v-if="showEditDriver"
        v-model="showEditDriver"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import EditDriverN from "@/components/drivers/EditDriverN";
import AddDriverN from "@/components/drivers/AddDriverN";
import {mapActions} from 'vuex'

export default {
  name: "Drivers",
  components: {
    AddDriverN,
    EditDriverN,
    TopRow,
  },
  data() {
    return {
      searchValue: '',
      showAddDriver: false,
      showEditDriver: false,
    }
  },
  computed: {
    getDriversS() {
      return this.$store.state.drivers.data
    }
  },
  async created() {
    await this.getDrivers()
  },
  methods: {
    ...mapActions(['getDrivers', 'setCurrentDriver']),
    async editDriver(id) {
      await this.setCurrentDriver(id)
      this.showEditDriver = true
    }
  }
}
</script>

<style>

</style>
