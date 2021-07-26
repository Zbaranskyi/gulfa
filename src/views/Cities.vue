<template>
  <div id="notifications">
    <TopRow
        @search="searchValue = $event"
        :btn-background="'#ED1C24'"
        btn-text="Create New City"
        @btn-click="showModalWindow = true"
    />
    <el-table
        :data="cities"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="cityName"
          label="City">
      </el-table-column>
      <el-table-column
          prop="districtName"
          label="District">
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="address"-->
<!--          label="Address">-->
<!--      </el-table-column>-->
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="editCity(scope.row)"
          ><img src="../assets/icons/edit.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="openDeleteBannerWindow(scope.row.id)"
          ><img src="../assets/icons/trash-can.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-city v-if="showModalWindow" v-model="showModalWindow"/>
    <confirmation-window
        dialogText="delete current city"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteCity}"
    />
  </div>
</template>

<script>
import AddCity from "@/components/cities/AddCity";
import TopRow from "@/components/helpers/TopRow";
import {mapActions} from 'vuex'
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";

export default {
  name: "Cities",
  components: {
    ConfirmationWindow,
    AddCity,
    TopRow,
  },
  data() {
    return {
      searchValue: '',
      showModalWindow: false,
      deleteCityId: ''
    }
  },
  async created() {
    await this.getCities()
  },
  computed: {
    cities(){
      return this.$store.state.cities.cities
    }
  },
  mixins: [confirmation],
  methods: {
    ...mapActions(['getCities']),
    editCity(city) {
      this.$store.dispatch('setEditCity', city)
      this.showModalWindow = true
    },
    openDeleteBannerWindow (id) {
      this.deleteCityId = id
      this.dialogVisible = true
    },
    async deleteCity () {
      await this.$store.dispatch('deleteCity', this.deleteCityId)
      this.closeConfirmWindow()
      this.deleteCityId = ''
    }
  }
}
</script>

<style>

</style>
