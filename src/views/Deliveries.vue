<template>
<div id="deliveries">
  <TableOfContent
      :titles="titles"
      :info="deliveries"
  />
</div>
</template>

<script>
import TableOfContent from "@/components/helpers/TableOfContent";

export default {
  name: "Deliveries",
  components: {TableOfContent},
  data () {
    return {
      titles: [
        'ID',
        'Date&Time',
        'Customer Name',
        'Delivery Address ',
        'Delivery Date&Time',
        'Price',
          'Payment Method',
          'Driver'
      ],
      deliveries:  [
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          address: 'Delivery Address details',
          deliveryDate: '05/03/2021 12:00 PM',
          price: '$ 89.99',
          paymentMethod: 'Credit Card',
          driver: 'Robert Cooper'
        },
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          address: 'Delivery Address details',
          deliveryDate: '05/03/2021 12:00 PM',
          price: '$ 89.99',
          paymentMethod: 'Credit Card',
          driver: 'Robert Cooper'
        },
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          address: 'Delivery Address details',
          deliveryDate: '05/03/2021 12:00 PM',
          price: '$ 89.99',
          paymentMethod: 'Credit Card',
          driver: 'Robert Cooper'
        },
        {
          id: '#1245',
          date: '01/03/2021 13:51 PM',
          name: 'Alex Smith',
          address: 'Delivery Address details',
          deliveryDate: '05/03/2021 12:00 PM',
          price: '$ 89.99',
          paymentMethod: 'Credit Card',
          driver: 'Robert Cooper'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
