import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

// const App = () => import('../App')
const Auth = () => import('../views/Auth')
const Deliveries = () => import('../views/Deliveries')
const Drivers = () => import('../views/Drivers')
const Notifications = () => import('../views/Notifications')
const Payments = () => import('../views/Payments')
const Products = () => import('../views/Products')
const Sale = () => import('../views/Sale')
const Users = () => import('../views/Users')

const routes = [
    {path: '/', redirect: '/products'},
    {path: '/auth', meta: {layout: 'auth'}, redirect: '/auth/signin'},
    {name: 'auth',path: '/auth/:mode', meta: {layout: 'auth'}, component: Auth},
    {name: 'deliveries',path: '/deliveries', meta: {layout: 'main'}, component: Deliveries},
    {name: 'drivers',path: '/drivers', meta: {layout: 'main'}, component: Drivers},
    {name: 'notifications',path: '/notifications', meta: {layout: 'main'}, component: Notifications},
    {name: 'payments',path: '/payments', meta: {layout: 'main'}, component: Payments},
    {name: 'products',path: '/products', meta: {layout: 'main'}, component: Products},
    {name: 'sale',path: '/sale', meta: {layout: 'main'}, component: Sale},
    {name: 'users',path: '/users', meta: {layout: 'main'}, component: Users},
]

export default new VueRouter({
    mode: 'history',
    routes
})
