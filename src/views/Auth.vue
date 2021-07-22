<template>
  <div id="auth">
    <Logo/>
    <p class="title">{{ formTitle }}</p>
    <div class="fields" v-if="mode === 'signin'">
      <div class="auth-item">
        <p class="auth-item-name">Email</p>
        <el-input class="auth-item-input" v-model.trim="$v.email.$model" :class="{invalid: $v.email.$error }"></el-input>
      </div>
      <div class="auth-item">
        <p class="auth-item-name">Password</p>
        <el-input class="auth-item-input" v-model="$v.password.$model" :class="{invalid: $v.password.$error }"
                  show-password></el-input>

      </div>
      <div class="auth-item">
        <el-button @click="logIn" :loading="loading" class="button-auth" type="primary">Log In</el-button>
      </div>
    </div>
    <div class="fields" v-else-if="mode === 'forgot'">
      <div class="auth-item">
        <p class="auth-item-name">Email</p>
        <el-input class="auth-item-input" v-model.trim="$v.email.$model" :class="{invalid: $v.email.$error }"></el-input>

      </div>
      <div class="auth-item">
        <el-button @click="forgotPassword" :loading="loadingForgot" class="button-auth" type="primary">Reset password
        </el-button>
      </div>
    </div>
    <div class="links">
      <router-link to="/auth/forgot" v-show="mode==='signin'">Forgot your password?</router-link>
      <p v-show="mode==='forgot'">Back to
        <router-link to="/auth/signin">log in page</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "@/service/api";
import {required, email, minLength} from 'vuelidate/lib/validators'
import {hardPassword} from "../helpers/validate";

const Logo = () => import('@/components/helpers/Logo')

export default {
  name: "Auth",
  components: {Logo},
  data() {
    return {
      email: 'gulfa.admin@mail.com',
      password: 'Kk123456@',
      bgButton: '#005CB9',
      loading: false,
      loadingForgot: false
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6), hardPassword}
  },
  computed: {
    mode() {
      return this.$route.params.mode
    },
    formTitle() {
      return this.mode === 'signin' ? 'Log In' : 'Forgot password'
    }
  },
  methods: {
    async logIn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        try {
          let {data: {token}} = await api.POST('/admin/login', {email: this.email, password: this.password})
          localStorage.setItem('token', token)
          this.$store.commit('setToken', token)
          this.$router.push('/')
        } catch (e) {
          this.$message({
            message: e?.response?.data?.title || 'Error with authorization',
            type: 'error',
            center: true
          });
        }
        this.loading = false
      }
    },
    async forgotPassword() {
      this.$v.email.$touch()
      if (!this.$v.email.$invalid) {
        this.loadingForgot = true
        // TODO it
        this.loadingForgot = false
      }
    }
  }
}
</script>

<style>

</style>
