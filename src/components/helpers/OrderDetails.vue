<template>
  <modal-window
      @close="$emit('input', false)"
      orders
      withoutButton
      :value="value">
    <template #title v-if="order">
      Order {{ order.id }}
    </template>
    <template #default>
      <div class="all-details">
        <div class="details">
          <p><span>Customer: </span>{{order.customerName}}</p>
          <p><span>Order Date&Time: </span>{{order.createDate}}</p>
          <p><span>Delivery: </span>{{order.deliveryDate}}</p>
          <p><span>Address: </span>{{address}}</p>
        </div>
        <div class="details driver">
          <p><span>Delivery Date&Time: </span>{{order.deliveryDate}}</p>
        </div>
        <div class="details-orders">
          <div class="order" v-for="(item, index) of order.ordersShopItems" :key="index">
            <p class="order-item-bold">{{index+1}}. {{item.title}}</p>
            <p class="order-item-bold">{{item.volume}} LT</p>
            <p>$ {{item.price}}</p>
            <p>x{{item.count}}</p>
            <p>$ {{ (item.price*item.count).toFixed(2) }}</p>
<!--            <p v-if="item.substription" class="order-subscription">Subscription <span>{{item.substription.date}} {{item.substription.time}}</span></p>-->
          </div>
        </div>
        <div class="details-bottom">
          <p><span>Total Price: </span>{{totalPrice}}</p>
          <p><span>Status: </span>{{order.status}}</p>
          <p><span>Payment Method: </span>???????</p>
        </div>
      </div>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "OrderDetails",
  components: {ModalWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectId: {
      type: String,
    }
  },
  computed: {
    order () {
      return this.$store.state.orders.data.find(el=>el.id === this.selectId)
    },
    address () {
      if(this.order) {
        return `${this.order?.cityName}, ${this.order?.districtName}, ${this.order?.street}, ${this.order?.building}, ${this.order?.apartment}`
      } else return ''
    },
    totalPrice () {
      if (this.order.ordersShopItems.length) {
        return this.order.ordersShopItems.reduce((acc, order)=>acc+(order.price*order.count), 0)
      } else return '0'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.all-details{
  @include fontPoppins(12px, 400, 18px);
  color: #2F3741;
  span{
    font-weight: 600;
  }
  .details {
    display: grid;
    grid-template-columns: 210px 290px 250px;
    border-bottom: 1px solid #E8E8E8;
    padding: 15px 0;
    &.driver {
      grid-template-columns: 210px 330px;
    }
    p {
      padding: 10px 0;
      padding-right: 30px;
    }
    span {
      padding-right: 20px;
    }
    &-orders {
      //border-bottom: 1px solid #E8E8E8;
      padding: 10px 0;

      .order {
        padding: 5px 0;
        display: grid;
        grid-template-columns: 150px 50px 70px 50px 100px 280px;
        //display: flex;
        align-items: center;
        &-subscription {
          background: #D2F4FF;
          color: #005CB9;
          padding: 10px 20px;
          border-radius: 10px;
          span {
            padding-left: 20px;
          }
        }
      }
    }
    &-bottom {
      display: grid;
      padding-top: 20px;
      grid-template-columns: 200px 200px 250px;
      span {
        padding-right: 20px;
      }
    }
  }
}
</style>
