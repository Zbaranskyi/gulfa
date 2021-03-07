<template>
<div class="main-layout">
  <div class="profile">
    <div class="logo">

    </div>
    <span class="name">Admin John</span>
  </div>
  <div class="side-menu">
    <Logo/>
    <ul>
      <li v-for="(page, index) of pages" :key="index" :class="{active: route === page.toLowerCase()}">
        <router-link class="link" :to="`/${page.toLowerCase()}`">
          <span
              class="link-logo"
              :style="`${page.toLowerCase() === $route.name ?
            `background: url(${require(`../assets/icons/menu/${page.toLowerCase()}-select.svg`)}) no-repeat center, #005CB9` :
            `background: url(${require(`../assets/icons/menu/${page.toLowerCase()}.svg`)}) no-repeat center`}`"
          ></span>
          {{page}}</router-link>
      </li>
    </ul>
  </div>
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
const Logo = () => import('@/components/helpers/Logo')
export default {
  name: "MainLayout",
  data () {
    return {
      pages: [
          'Products',
          'Users',
          'Deliveries',
          'Drivers',
          'Payments',
          'Sale',
          'Notifications'
      ],
    }
  },
  components: {
    Logo
  },
  computed: {
    route () {
      return this.$route.name
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

.main-layout{
  background: #E5E5E5;
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  display: flex;
  position: relative;
  .profile{
    position: absolute;
    top: 10px;
    right: 80px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo{
      background: url(../assets/icons/menu/users.svg) no-repeat center, white;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      margin: 0 15px;
    }
    .name{
      @include fontPoppins(12px, 600, 18px);
      color: #005CB9;
    }
  }
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
            //&.active{
            //  background: #005CB9;
            //}
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
  }
}
</style>
