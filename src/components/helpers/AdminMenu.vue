<template>
  <div class="profile">
    <div class="base" v-click-outside="hide" @click="openClose">
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
import ClickOutside from 'vue-click-outside'
export default {
  name: "AdminMenu",
  props: ['value'],
  methods: {
    openClose () {
      this.menu = !this.menu
      this.$emit('input', this.menu)
    },
    hide(){
      this.menu = false
      this.$emit('input', false)
    },
    logOut() {
      localStorage.removeItem('token')
      this.$store.commit('setToken', '')
      this.$router.push('auth')
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style>
</style>
