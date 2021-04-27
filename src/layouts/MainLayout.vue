<template>
<div class="main-layout">
  <AdminMenu
      v-model="menu"
  />
  <div class="side-menu">
    <Logo/>
    <ul>
      <li v-for="(page, index) of pages" :key="index">
        <router-link class="link" :to="`/${page.name.toLowerCase()}`">
          <span
              :class="[page.name.toLowerCase(), {active: route === page.name.toLowerCase()}]"
              class="link-logo"
          ></span>
          {{page.name}}</router-link>
      </li>
    </ul>
  </div>
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import AdminMenu from "@/components/helpers/AdminMenu";
const Logo = () => import('@/components/helpers/Logo')
export default {
  name: "MainLayout",
  data () {
    return {
      pages: [
        {
          name: 'Products'
        },
        {
          name: 'Orders'
        },
        {
          name: 'Customers'
        },
        {
          name: 'Drivers'
        },
        {
          name: 'Payments'
        },
        {
          name: 'Sale'
        },
        {
          name: 'Notifications'
        },
        {
          name: 'Banners'
        }
      ],
      menu: false
    }
  },
  components: {
    AdminMenu,
    Logo
  },
  computed: {
    route () {
      return this.$route.name
    }}
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.main-layout{
  background: #F3F3F3;
  width: 100vw;
  min-height: 100vh;
  min-width: 1000px;
  display: flex;
  position: relative;

  .side-menu{
    //width: 300px;
    padding: 0 50px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul{
      list-style-type: none;
      li{
        margin: 10px;
        cursor: pointer;
        .link{
          display: flex;
          align-items: center;
          text-decoration: none;
          @include fontPoppins(15px, 400, 20px);
          color: #2F3741;
          &-logo{
            display: block;
            width: 37px;
            height: 37px;
            border-radius: 10px;
            margin-right: 10px;
            background-repeat: no-repeat;
            background-position: center;
            &.products{
              background-image: url('../assets/icons/menu/products.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/products-select.svg');
              }
            }
            &.orders{
              background-image: url('../assets/icons/menu/orders.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/orders-select.svg');
              }
            }
            &.customers{
              background-image: url('../assets/icons/menu/users.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/users-select.svg');
              }
            }
            &.drivers{
              background-image: url('../assets/icons/menu/drivers.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/drivers-select.svg');
              }
            }
            &.payments{
              background-image: url('../assets/icons/menu/payments.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/payments-select.svg');
              }
            }
            &.sale{
              background-image: url('../assets/icons/menu/sale.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/sale-select.svg');
              }
            }
            &.notifications{
              background-image: url('../assets/icons/menu/notifications.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/notifications-select.svg');
              }
            }
            &.banners{
              background-image: url('../assets/icons/menu/banners.svg');
              &.active {
                background-color: #005CB9;
                background-image: url('../assets/icons/menu/banners-select.svg');
              }
            }
          }
        }

      }
    }
  }
  .content {
    background: white;
    border-radius: 10px;
    margin: 60px 60px 30px 30px;
    width: 100%;
    padding: 30px;
  }
}
</style>
