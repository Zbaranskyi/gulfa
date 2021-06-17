import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import './style/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, {locale});

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import router from './router'

import store from './store'


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
