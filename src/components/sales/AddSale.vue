<template>
  <modal-window
      @close="$emit('input', false)"
      :value="value">
    <template #title>
      Create New Sale
    </template>
    <template #default>
      <div class="main-block">
        <div class="info">
          <div class="select-category">
            <p>Select Type of Sale</p>
            <select v-model="type">
              <option v-for="item of typesSales" :value="item.id" :key="item.id">{{item.title}}</option>
            </select>
          </div>
          <div class="info-row" v-if="type === '1'">
            <InputWithLabel
                title="Select - %"
                v-model="percent"
                :width="40"
                inputType="number"
                inputLabel="%"

            />
          </div>
          <div>
            <p style="font-weight: 600">Validity:</p>
            <div class="info-row">
              <InputWithLabel
                  title="From"
                  v-model="fromDate"
                  :width="50"
              />
              <InputWithLabel
                  title="To"
                  v-model="toDate"
                  :width="50"
              />
            </div>
          </div>
          <div class="info-row">
            <InputWithLabel
                title="Title"
                v-model="title"
                :width="100"
            />
          </div>
          <div class="info-row descriptions">
            <TextareaWithLabel
                title="Description"
                v-model="descript"
                :width="100"
            />
          </div>
          <div class="select-category">
            <p>Select Type of Sale</p>
            <select >
              <option v-for="item of products" :value="item.id" :key="item.id">{{item.title}}</option>
            </select>
          </div>
        </div>
      </div>
    </template>
    <template
        #button>Save changes</template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import TextareaWithLabel from "@/components/helpers/TextareaWithLabel";
import {products} from "../../test-data/products";

export default {
  name: "AddSale",
  components: {TextareaWithLabel, InputWithLabel, ModalWindow},
  data () {
    return {
      type:'0',
      typesSales: [
        {
          id: '0',
          title: 'Sale 5 + 1'
        },
        {
          id: '1',
          title: 'Sale %'
        }
      ],
      title: '',
      percent: 0,
      descript: '',
      products: products,
      fromDate: '',
      toDate: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block{
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);
  .select-category{
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
    p{
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
  .image-block{
    display: flex;
    margin-bottom: 30px;
  }
  .image{
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
      &.descriptions{
        //justify-content: space-between;
      }
    }
  }
}
</style>
