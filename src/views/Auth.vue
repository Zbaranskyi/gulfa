<template>
  <div id="auth">
    <Logo/>
    <p class="title">{{ modes[mode].title }}</p>
    <div class="fields">
      <div class="item" v-for="(item, index) of modes[mode].fields" :key="index">
        <p class="item-name">{{ item.name }}</p>
        <input class="item-input" :type="item.type" v-model="item.value">
      </div>
      <div class="item">
        <base-button @btn-click="isAuthAction" :background="'#005CB9'">{{ modes[mode].button }}</base-button>
      </div>
    </div>
    <div class="links">
      <router-link to="/auth/forgot">Forgot your password?</router-link>
      <p v-show="mode==='forgot' || mode==='signup'">Back to <router-link  to="/auth/signin">log in page</router-link></p>
    </div>
  </div>
</template>

<script>
// import BaseButton from "@/components/helpers/BaseButton";
import api from "@/service/api";

const Logo = () => import('@/components/helpers/Logo')
const BaseButton = () => import('@/components/helpers/BaseButton')
// import axios from "axios";

export default {
  name: "Auth",
  components: {BaseButton, Logo},
  data() {
    return {
      modes: {
        signin: {
          title: 'Log In',
          fields: {
            email: {
              name: 'Email',
              type: 'text',
              value: 'gulfa.admin@mail.com'
            },
            password: {
              name: 'Password',
              type: 'password',
              value: 'Kk123456@'
            }
          },
          button: 'Log In'
        },
        signup: {
          title: 'Sign Up',
          fields: {
            email: {
              name: 'Email',
              type: 'text',
              value: ''
            },
            password: {
              name: 'Password',
              type: 'password',
              value: ''
            },
            confirm: {
              name: 'Confirm Password',
              type: 'password',
              value: ''
            }
          },
          button: 'Sign Up'
        },
        forgot: {
          title: 'Forgot password',
          fields: {
            email: {
              name: 'Email',
              type: 'text',
              value: ''
            },
          },
          button: 'Reset password'
        }
      }
    }
  },
  computed: {
    mode() {
      return this.$route.params.mode
    },
    checkEmailAndPassword () {
      return !!(this.modes[this.mode].fields.email.value && this.modes[this.mode].fields.password.value)
    }
  },
  methods: {
    isAuthAction() {
      let data = {}
      switch (this.mode) {
        case 'signin':
          data.email = this.modes[this.mode].fields.email.value
          data.password = this.modes[this.mode].fields.password.value
            this.logIn(data)
              break;
        case 'signup':
          data.email = this.modes[this.mode].fields.email.value
          data.password = this.modes[this.mode].fields.password.value
          break;
        case 'forgot':
          data.email = this.modes[this.mode].fields.email.value
      }
      // console.log(data)
      // this.$router.push('/')
      // axios.post(this.$mainRoute + `/${this.mode}`, data)
      // .then(res=>console.log(res))
      // .catch(err=>console.log(err))
    },
    async logIn (data) {
      if(this.checkEmailAndPassword) {
        await api.POST('/admin/login', data)
        .then(res=>{
          let token = res.data.token
          localStorage.setItem('token', token)
          this.$store.commit('setToken', token)
          this.$router.push('/')
        })
        .catch(e=>{
          console.log(e.response)
          this.$message({
            message: e?.response?.data?.title || 'Error with authorization',
            type: 'error',
            center: true
          });
        })
      } else {
        this.$message({
          message: 'Error with credentials',
          type: 'error',
          center: true
        });
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

      &-name {
        margin: 10px;
      }

      &-input {
        width: 100%;
        border: 1px solid #E8E8E8;
        border-radius: 5px;
        padding: 10px;
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
