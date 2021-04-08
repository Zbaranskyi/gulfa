<template>
  <modal-window
      @close="$emit('input', false)"
      orders
      withoutButton
      :value="value">
    <template #title>
      Order {{order.id}}
    </template>
    <template #default>
      <div class="all-details">
        <div class="details">
          <p><span>Customer: </span>{{order.name}}</p>
          <p><span>Order Date&Time: </span>{{order.date}}</p>
          <p><span>Delivery: </span>{{order.delivery}}</p>
          <p><span>Address: </span>{{order.address}}</p>
        </div>
        <div class="details driver">
          <p><span>Driver: </span>{{order.driver}}</p>
          <p><span>Delivery Date&Time: </span>{{order.deliveryDate}}</p>
        </div>
        <div class="details-orders">
          <div class="order" v-for="(item, index) of order.orders" :key="index">
            <p class="order-item-bold">{{index+1}}. {{item.name}}</p>
            <p class="order-item-bold">{{item.volume}}</p>
            <p>{{item.price}}</p>
            <p>{{item.quantity}}</p>
            <p>{{item.priceAll}}</p>
            <p v-if="item.substription" class="order-subscription">Subscription <span>{{item.substription.date}} {{item.substription.time}}</span></p>
          </div>
        </div>
        <div class="details-bottom">
          <p><span>Total Price: </span>{{order.total}}</p>
          <p><span>Status: </span>{{order.payStatus}}</p>
          <p><span>Payment Method: </span>{{order.payMethod}}</p>
        </div>
      </div>
    </template>
  </modal-window>
</template>

<script>
import {detailOrders} from "@/test-data/orders";
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
      return detailOrders.find(el=>el.id === this.selectId)
    }
  },
  mounted() {
    console.log(this.order)
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
