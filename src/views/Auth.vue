<template>
  <div id="auth">
    <Logo/>
    <p class="title">{{ formTitle }}</p>
    <div class="fields" v-if="mode === 'signin'">
      <div class="item" >
        <p class="item-name">Email</p>
        <el-input class="item-input" v-model.trim="$v.email.$model" :class="{invalid: $v.email.$error }"></el-input>
      </div>
      <div class="item" >
        <p class="item-name">Password</p>
        <el-input class="item-input" v-model="$v.password.$model" :class="{invalid: $v.password.$error }" show-password></el-input>

      </div>
      <div class="item">
        <el-button @click="logIn" :loading="loading" class="button-auth" type="primary">Log In</el-button>
      </div>
    </div>
    <div class="fields" v-else-if="mode === 'forgot'">
      <div class="item" >
        <p class="item-name">Email</p>
        <el-input class="item-input" v-model.trim="$v.email.$model" :class="{invalid: $v.email.$error }"></el-input>

      </div>
      <div class="item">
        <el-button @click="forgotPassword" :loading="loadingForgot" class="button-auth" type="primary">Reset password</el-button>
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
    password:{required, minLength: minLength(6), hardPassword}
  },
  computed: {
    mode() {
      return this.$route.params.mode
    },
    formTitle () {
      return this.mode === 'signin' ? 'Log In' : 'Forgot password'
    }
  },
  methods: {
    async logIn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        await api.POST('/admin/login', {email: this.email, password: this.password})
            .then(res => {
              let token = res.data.token
              localStorage.setItem('token', token)
              this.$store.commit('setToken', token)
              this.$router.push('/')
            })
            .catch(e => {
              this.$message({
                message: e?.response?.data?.title || 'Error with authorization',
                type: 'error',
                center: true
              });
            })
        this.loading = false
      }
    },
    async forgotPassword () {
      this.$v.email.$touch()
      if(!this.$v.email.$invalid) {
        this.loadingForgot = true
        // TODO it
        this.loadingForgot = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables";

#auth {
  //min-width: 350px;
  width: 80%;
  max-width: 800px;
  //height: 80vh;
  background: white;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  @include fontPoppins(12px, 500, 20px);
  color: #2F3741;

  .title {
    font-size: 22px;
    margin: 10px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 30px;

    .item {
      min-width: 200px;
      width: 40%;
      margin: 10px;

      .button-auth{
        width: 100%;
        @include fontPoppins(12px, 600, 18px);
        border-radius: 10px;
        padding: 10px;
      }

      &-name {
        margin: 10px;
      }

      &-input {
        @include fontPoppins(12px, 500, 20px);
      }
    }
  }

  .links {
    text-align: center;
    color: #92ABBA;
    margin: 30px;
  }
}
</style>
