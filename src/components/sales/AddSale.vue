<template>
  <modal-window
      @btn-click="postSale"
      @close="$emit('input', false)"
      :value="value">
    <template #title>
      Create New Sale
    </template>
    <template #default>
      <div class="main-block">
        <div class="info">
          <!--          <div class="select-category">-->
          <!--            <p>Select Type of Sale</p>-->
          <!--            <select v-model="type">-->
          <!--              <option v-for="item of typesSales" :value="item.id" :key="item.id">{{item.title}}</option>-->
          <!--            </select>-->
          <!--          </div>-->
          <div class="info-row">
            <InputWithLabel
                title="Select - %"
                inputType="number"
                inputLabel="%"
                v-model="sale.percent"
                :width="40"
                :error="$v.sale.percent.$error"
            />
          </div>
          <div>
            <p style="font-weight: 600">Validity:</p>
            <div class="info-row">
              <InputWithLabel
                  title="From"
                  inputType="date"
                  v-model="sale.startDate"
                  :width="50"
                  :error="$v.sale.startDate.$error"
              />
              <InputWithLabel
                  title="To"
                  inputType="date"
                  v-model="sale.endDate"
                  :width="50"
                  :error="$v.sale.endDate.$error"
              />
            </div>
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Title"
                v-model="sale.title"
                :width="50"
                :error="$v.sale.title.$error"
            />
            <InputWithLabel
                title="Title (Arabic)"
                v-model="saleAr.title"
                align="right"
                :width="50"
                :error="$v.saleAr.title.$error"
            />
          </div>
          <div class="info-row descriptions">
            <TextareaWithLabel
                title="Description"
                v-model="sale.description"
                :width="50"
                :error="$v.sale.description.$error"
            />
            <TextareaWithLabel
                title="Description (Arabic)"
                v-model="saleAr.description"
                align="right"
                :width="50"
                :error="$v.saleAr.description.$error"
            />
          </div>
          <div class="select-category">
            <p>Select Type of Sale</p>
            <select multiple v-model="sale.shopItemsId" :class="{invalid: $v.sale.shopItemsId.$error}">
              <option v-for="item of getProducts" :value="item.id" :key="item.id">{{ item.title }}</option>
            </select>
          </div>
        </div>
      </div>
    </template>
    <template
        #button>Save changes
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import TextareaWithLabel from "@/components/helpers/TextareaWithLabel";
import {required, numeric, between} from 'vuelidate/lib/validators'
import {minLengthOfArray} from "../../helpers/validate";

export default {
  name: "AddSale",
  components: {TextareaWithLabel, InputWithLabel, ModalWindow},
  data() {
    return {
      sale: {
        "percent": '',
        "startDate": "",
        "endDate": "",
        "shopItemsId": [],
        "title": "",
        "description": ""
      },
      saleAr: {
        "title": "",
        "description": ""
      },
    }
  },
  computed: {
    getProducts() {
      return this.$store.state.products.data
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    sale: {
      "percent": {required, numeric, between: between(1, 99)},
      "startDate": {required},
      "endDate": {required},
      "shopItemsId": {minLengthOfArray},
      "title": {required},
      "description": {required}
    },
    saleAr: {
      "title": {required},
      "description": {required}
    },
  },
  methods: {
    async postSale() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.$store.dispatch('postSale', {data: this.sale, dataAr: this.saleAr})
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);

  .select-category {
    position: relative;
    margin: 10px 0 20px;
    padding-right: 20px;

    select {
      border: 1px solid #E8E8E8;
      border-radius: 10px;
      padding: 10px;
      width: 100%;
      cursor: pointer;
    }

    p {
      //&:after{
      //  position: absolute;
      //  display: block;
      //  content: '';
      //  width: 17px;
      //  height: 17px;
      //  background: #005CB9 url('../../assets/icons/arrow.svg') no-repeat center;
      //  top: 30px;
      //  left: 279px;
      //  border-radius: 5px;
      //  cursor: pointer;
      //}
    }

  }

  .image-block {
    display: flex;
    margin-bottom: 30px;
  }

  .image {
    width: 150px;
    height: 100px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }

  .image-cropper {
    width: 150px;
    height: 100px;
    //background: yellow;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    color: #2F3741;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }

  .info {
    display: flex;
    flex-direction: column;

    &-row {
      margin-top: 10px;
      display: flex;

      &.descriptions {
        //justify-content: space-between;
      }
    }
  }
}
</style>
