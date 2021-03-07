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
        <base-button @btn-click="isAuthAction">{{ modes[mode].button }}</base-button>
      </div>
    </div>
    <div class="links">
      <router-link to="/auth/forgot">Forgot your password?</router-link>
      <p>New in?
        <router-link to="/auth/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
// import BaseButton from "@/components/helpers/BaseButton";
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
              value: ''
            },
            password: {
              name: 'Password',
              type: 'password',
              value: ''
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
    }
  },
  methods: {
    isAuthAction() {
      let data = {}
      switch (this.mode) {
        case 'signin':
        case 'signup':
          data.email = this.modes[this.mode].fields.email.value
          data.password = this.modes[this.mode].fields.password.value
          break;
        case 'forgot':
          data.email = this.modes[this.mode].fields.email.value
      }
      console.log(data)
      this.$router.push('/')
      // axios.post(this.$mainRoute + `/${this.mode}`, data)
      // .then(res=>console.log(res))
      // .catch(err=>console.log(err))
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
        outline: none;
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
