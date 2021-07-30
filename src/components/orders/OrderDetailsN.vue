<template>
  <el-dialog :title="`Order #${order.id}`" :visible.sync="value" :before-close="closeModalWindow">
    <div class="order-info">
      <div>
        <p><span class="fw500">Customer: </span>{{ order.customerName }}</p>
        <p><span class="fw500">Order Date&Time: </span>{{ getCreateDate }}</p>
        <p><span class="fw500">Delivery: </span>{{ getDeliveryDate }}</p>
        <p><span class="fw500">Address: </span>{{ getAddress }}</p>
      </div>
      <el-divider></el-divider>
      <div>
        <p><span class="fw500">Delivery Date&Time: </span>{{ getDeliveryDate }}</p>
      </div>
      <el-divider></el-divider>
      <div>
        <div v-for="(item, index) of order.ordersShopItems" :key="`${index} ${item.title}`" class="order-info_items">
          <span class="fw500">{{ index+1 }}. {{ item.title }}</span>
          <span class="fw500">{{ item.volume }}LT</span>
          <span>$ {{ item.price }}</span>
          <span>x{{ item.count }}</span>
          <span>$ {{ item.price * item.count }}</span>
        </div>
      </div>
      <div>
        <p><span class="fw500">Total price: </span>{{ getTotalPrice }}</p>
        <p><span class="fw500">Status: </span>{{ order.status }}</p>
        <p><span class="fw500">Subscription: </span>{{ String(!!order.isSubscribed) }}</p>
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
    }
  },
  computed: {
    order() {
      return this.$store.state.orders.orderDetails
    },
    getAddress() {
      let {cityName, districtName, street, building, apartment} = this.order
      return `${cityName}, ${districtName}, ${street}, ${building}, ${apartment}`
    },
    getTotalPrice() {
      return this.order.orderShopItems ? this.order.orderShopItems?.reduce((acc, curr) => acc + curr?.count * curr?.price, 0) : 0
    },
    getDeliveryDate() {
      return new Intl.DateTimeFormat('en-GB').format(new Date(`${this.order.deliveryDate}Z`))
    },
    getCreateDate() {
      return new Intl.DateTimeFormat('en-GB').format(new Date(`${this.order.createDate}Z`))
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
      this.$store.dispatch('closeOrderDetails')
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
.order-info{
  &_items{
    display: grid;
    grid-template-columns: 1fr 100px 60px 60px 60px 1fr;
    &-subscription {
      background-color: #D2F4FF;
    }
  }
}
</style>
