<template>
  <el-dialog :title="`Order #${order.id}`" :visible.sync="value" :before-close="closeModalWindow">
    <div class="order-info">
      <div>
        <p><span class="fw500">Customer: </span>{{order.customerName}}</p>
        <p><span class="fw500">Order Date&Time: </span>{{order.createDate}}</p>
        <p><span class="fw500">Delivery: </span>{{order.deliveryDate}}</p>
        <p><span class="fw500">Address: </span>{{getAddress}}</p>
      </div>
      <div>
        <p><span class="fw500">Delivery Date&Time: </span>{{order.deliveryDate}}</p>
      </div>
      <div>

      </div>
      <div>
        <p><span class="fw500">Delivery Date&Time: </span>{{getTotalPrice}}</p>
        <p><span class="fw500">Delivery Date&Time: </span>{{order.status}}</p>
        <p><span class="fw500">Delivery Date&Time: </span>???????</p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script>
export default {
  name: "OrderDetailsN",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingSaveChanges: false,
      order: {
        apartment: "24",
        building: "12",
        cityName: "Kharkiv",
        createDate: "2021-05-05",
        customerName: "Alex Test",
        deliveryDate: "2021-05-05",
        districtName: "Saltovka",
        id: "12",
        status: "Created",
        street: "Heroiv Pratsi",
        orderShopItems: [
          {
            count: 2,
            price: 10,
            title: "bottle 1",
            volume: 1
          },
          {
            count: 4,
            price: 6,
            title: "bottle 2",
            volume: 1
          }
        ]
      }
    }
  },
  computed: {
    getAddress() {
      let {cityName, districtName, street, building, apartment} = this.order
      return `${cityName}, ${districtName}, ${street}, ${building}, ${apartment}`
    },
    getTotalPrice() {
      return this.order.orderShopItems ? this.order.orderShopItems?.reduce((acc, curr)=>acc + curr?.count * curr?.price, 0) : 0
    }
  },
  methods: {
    submitForm() {
      // let vm = this
      // this.$refs['validation-city-form'].validate(async (valid) => {
      //   if (valid) {
      //     await this.$store.dispatch('postNewCity', this.form)
      //     this.closeModalWindow()
      //   } else {
      //     await vm.$store.dispatch('setErrorMessage', 'Error with validation')
      //     return false;
      //   }
      // });
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>

</style>
