<template>
  <el-dialog title="Edit Sale" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-sale">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-product-form"
          label-position="top">
        <el-form-item label="Select the % of Sale" prop="percent">
          <el-input-number v-model.number="form.percent" :min="1" :max="99"></el-input-number>
          <!--          <el-input v-model.number="form.selectPercent" autocomplete="off"></el-input>-->
        </el-form-item>

        <div style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 15px">

          <el-form-item label="From" prop="startDate">
            <el-date-picker
                style="width: 100%"
                v-model="form.startDate"
                type="date"
                :picker-options="pickerOptionsS"
                placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="To" prop="endDate">
            <el-date-picker
                style="width: 100%"
                v-model="form.endDate"
                type="date"
                :picker-options="pickerOptionsE"
                placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Title (Arabic)" prop="arTitle">
            <el-input v-model="form.arTitle" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.description"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="Description (Arabic)" prop="arDescription">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.arDescription"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Select Products" prop="typeOfSale">
            <el-select v-model="form.shopItemsId" placeholder="" style="width: 100%" collapse-tags multiple>
              <el-option
                  v-for="item of getProducts"
                  :label="item.title"
                  :value="item.id"
                  :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        dialogText="delete current sale"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteSale}"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";

export default {
  name: "EditSaleN",
  components: {ConfirmationWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        description: [
          {
            required: true,
            message: 'Please input a description',
            trigger: 'blur'
          }
        ],
        arDescription: [
          {
            required: true,
            message: 'Please input a description',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: 'Please input a title',
            trigger: 'blur'
          }
        ],
        arTitle: [
          {
            required: true,
            message: 'Please input a title',
            trigger: 'blur'
          }
        ],
        startDate: [
          {
            required: true,
            message: 'Please pick a date',
            trigger: 'blur'
          }
        ],
        endDate: [
          {
            required: true,
            message: 'Please pick a date',
            trigger: 'blur'
          }
        ],
        shopItemsId: [
          {
            type: 'array',
            required: true,
            message: 'Please choose at least one product',
            trigger: 'change'
          }
        ],
        percent: [
          {
            required: true,
            message: 'Please input a percent',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: 'must be a number',
            trigger: 'blur'
          }
        ]
      },
      loadingSaveChanges: false,
      form: {
        description: '',
        arDescription: '',
        title: '',
        arTitle: '',
        startDate: null,
        endDate: null,
        shopItemsId: [],
        percent: 1
      }
    }
  },
  mixins: [confirmation],
  created() {
    this.form = {...this.$store.getters.getCurrentSale}
  },
  computed: {
    getProducts() {
      return this.$store.state.products.data
    },
    pickerOptionsE() {
      let vm = this
      return {
        disabledDate(time) {
          let limitDate = vm.form.startDate ? vm.form.startDate.getTime() : Date.now()
          return time.getTime() < limitDate;
        }
      }
    },
    pickerOptionsS() {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    }
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-product-form'].validate(async (valid) => {
        if (valid) {
          let {arTitle: title, arDescription: description, startDate, endDate, ...data} = this.form
          startDate = startDate.toLocaleDateString('en-GB')
          endDate = endDate.toLocaleDateString('en-GB')
          let [dayS, monthS, yearS] = startDate.split('/')
          let [dayE, monthE, yearE] = endDate.split('/')
          startDate = `${yearS}-${monthS}-${dayS}T00:00:00`
          endDate = `${yearE}-${monthE}-${dayE}T00:00:00`
          data = {...data, startDate, endDate}
          let dataAr = {title, description}
          await this.$store.dispatch('postSale', {data, dataAr})
          this.closeModalWindow()
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    async deleteSale() {
      await this.$store.dispatch('deleteSale')
      this.closeConfirmWindow()
      this.closeModalWindow()
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
