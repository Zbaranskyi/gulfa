<template>
  <div id="notifications">
    <TopRow
        @search="searchValue = $event"
        :btn-background="'#ED1C24'"
        btn-text="Create New City"
        @btn-click="showAddNotification = true"
    />
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
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="editCity(scope.row.id)"
          ><img src="../assets/icons/edit.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="deleteCity(scope.row.id)"
          ><img src="../assets/icons/trash-can.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-city v-if="showAddNotification" v-model="showAddNotification"/>
  </div>
</template>

<script>
import AddCity from "@/components/cities/AddCity";
import TopRow from "@/components/helpers/TopRow";

export default {
  name: "Cities",
  components: {
    AddCity,
    TopRow,
  },
  data() {
    return {
      titles: [
        'Date&Time',
        'Description'
      ],
      table: [
        {
          id: 0,
          name: 'City 1',
          district: 'District 1',
          address: 'Address'
        },
        {
          id: 1,
          name: 'City 2',
          district: 'District 2',
          address: 'Address'
        },
        {
          id: 2,
          name: 'City 3',
          district: 'District 3',
          address: 'Address'
        },
        {
          id: 3,
          name: 'City 4',
          district: 'District 4',
          address: 'Address'
        }
      ],
      searchValue: '',
      showAddNotification: false
    }
  },
  methods: {
    editCity(id) {
      console.log(id)
    },
    deleteCity(id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
