<template>
  <div
      class="profile"
  >
    <div class="base" @click="openClose">
      <div class="logo"></div>
      <p class="title">Admin John</p>
    </div>
    <transition name="slide-fade">
      <div class="menu" v-if="value">
        <p
            @click="logOut"
            class="title">Logout</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  props: ['value'],
  methods: {
    openClose () {
      this.menu = !this.menu
      this.$emit('input', this.menu)
    },
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('auth')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.profile {
  position: absolute;
  top: 10px;
  right: 80px;
  display: flex;
  cursor: pointer;
  background: #F3F3F3;
  flex-direction: column;
  border-radius: 10px;
  width: 200px;
  .title {
    @include fontPoppins(12px, 600, 18px);
    color: $color-background-blue;
    padding: 10px 0;
  }

  .base {
    display: flex;
    align-items: center;
    width: 100%;

    .logo {
      background: url(../../assets/icons/menu/users.svg) no-repeat center, white;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      margin: 0 15px;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      text-align: center;
    }
  }

  .slide-fade-enter-active {
    transition: all .2s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .2s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
