<template>
  <div id="workers">
    <TopRow
        :btn-background="'#ED1C24'"
        btn-text="Add New Worker"
        @search="searchValue = $event"
        @btn-click="showAddWorker = true"
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
      <el-table-column>
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="editWorker(scope.row.id)"
          ><img src="../assets/icons/edit.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-worker
        v-if="showAddWorker"
        v-model="showAddWorker"
        @get-workers="getWorkers"
    />
        <edit-worker
            v-if="showEditWorker"
            v-model="showEditWorker"
            :current-worker="currentWorker"
            @get-workers="getWorkers"
        />
  </div>
</template>

<script>
import TopRow from "../components/helpers/TopRow";
import {mapState} from 'vuex'
import AddWorker from "../components/workers/AddWorker";
import api from "../service/api";
import EditWorker from "../components/workers/EditWorker";

export default {
  name: "Workers",
  components: {
    EditWorker,
    AddWorker,
    TopRow,
  },
  data() {
    return {
      searchValue: '',
      showAddWorker: false,
      showEditWorker: false,
      workers: [],
      currentWorker: null
    }
  },
  computed: mapState(['token']),
  async created() {
    await this.getWorkers()
  },
  methods: {
    editWorker(id) {
      this.currentWorker = this.workers.find(el => el.id === id)
      this.showEditWorker = true
    },
    async getWorkers() {
      try {
        const {data} = await api.GET('/Admin/Worker', this.token)
        this.workers = data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
