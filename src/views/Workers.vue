<template>
  <div id="workers">
    <TopRow
        :btn-background="'#ED1C24'"
        btn-text="Add New Worker"
        @search="searchValue = $event"
        @btn-click="showAddWorker = true"
        withoutSearch
    />
    <el-table
        :data="workers"
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
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="openDeleteBannerWindow(scope.row.id)"
          ><img src="../assets/icons/trash-can.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-worker
        v-if="showAddWorker"
        v-model="showAddWorker"
        @get-workers="getWorkers"
    />
    <confirmation-window
        dialogText="delete current worker"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteWorker}"
    />
  </div>
</template>

<script>
import TopRow from "../components/helpers/TopRow";
import {mapActions, mapState} from 'vuex'
import AddWorker from "../components/workers/AddWorker";
import api from "../service/api";
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";

export default {
  name: "Workers",
  components: {
    AddWorker,
    TopRow,
    ConfirmationWindow,
  },
  data() {
    return {
      searchValue: '',
      showAddWorker: false,
      workers: [],
      deleteWorkerId: ''
    }
  },
  computed: mapState(['token']),
  async created() {
    await this.getWorkers()
  },
  mixins: [confirmation],
  methods: {
    ...mapActions(['setErrorMessage', 'setSuccessMessage']),
    async getWorkers() {
      try {
        const {data} = await api.GET('/Admin/Worker', this.token)
        this.workers = data
      } catch (e) {
        console.log(e)
      }
    },
    openDeleteBannerWindow (id) {
      this.deleteWorkerId = id
      this.dialogVisible = true
    },
    async deleteWorker() {
      try {
        await api.DELETE(`/admin/worker/${this.deleteWorkerId}`, this.token)
        await this.getWorkers()
        this.setSuccessMessage()
        this.closeConfirmWindow()
      } catch (e) {
        this.setErrorMessage()
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
