<template>
  <div id="workers">
    <TopRow
        :btn-background="'#ED1C24'"
        btn-text="Add New Promo"
        @search="searchValue = $event"
        @btn-click="showAddPromo = true"
    />
    <el-table
        :data="promos"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="code"
          label="Code">
      </el-table-column>
      <el-table-column
          prop="discount"
          label="Discount, %">
      </el-table-column>
      <el-table-column
          prop="toDiscountAmount"
          label="Discount Amount, $">
      </el-table-column>
      <el-table-column
          prop="expireDate"
          label="Expire Date">
        <template slot-scope="scope">
          {{getHumanDate(scope.row.expireDate)}}
        </template>
      </el-table-column>
      <el-table-column
          prop="personalAmountUse"
          label="Personal Amount Use">
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
              type="warning"
              @click="openDeleteBannerWindow(scope.row.code)"
          ><img src="../assets/icons/trash-can.svg" alt="edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-promo
        v-if="showAddPromo"
        v-model="showAddPromo"
        @get-promo="getPromos"
    />
    <confirmation-window
        dialogText="delete current promo"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deletePromo}"
    />
  </div>
</template>

<script>
import TopRow from "../components/helpers/TopRow";
import {mapActions, mapState} from 'vuex'
import api from "../service/api";
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import AddPromo from "@/components/promos/AddPromo";
export default {
  name: "Promo",
  components: {
    AddPromo,
    TopRow,
    ConfirmationWindow,
  },
  data() {
    return {
      searchValue: '',
      showAddPromo: false,
      promos: [],
      deletePromoId: ''
    }
  },
  computed: mapState(['token']),
  async created() {
    await this.getPromos()
  },
  mixins: [confirmation],
  methods: {
    ...mapActions(['setErrorMessage', 'setSuccessMessage']),
    async getPromos() {
      try {
        const {data} = await api.GET('/Admin/PromoCode', this.token)
        this.promos = data
      } catch (e) {
        console.log(e)
      }
    },
    getHumanDate(date) {
      return new Intl.DateTimeFormat('en-GB').format(new Date(`${date}Z`))
    },
    openDeleteBannerWindow (id) {
      this.deletePromoId = id
      this.dialogVisible = true
    },
    async deletePromo() {
      try {
        await api.DELETE(`/admin/PromoCode/${this.deletePromoId}`, this.token)
        await this.getPromos()
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
