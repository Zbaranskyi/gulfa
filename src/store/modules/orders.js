// import api from "@/service/api";

// import api from "@/service/api";
import {modelOrder} from "@/test-data/orders";

export default {
    state: () => ({
        data: []
    }),
    mutations: {
        setOrders (state, data) {
            state.data = data
        }
    },
    actions: {
        async getOrders ({commit, rootState}) {
            // await api.GET('/orders', rootState.token)
            //     .then(({data}) => commit('setOrders', data))
            //     .catch(err => console.log(err))
            console.log(rootState.token)
            commit('setOrders', modelOrder)
        },
    },
    getters: {
        getSimpleOrdersInformation (state) {
            return state.data.map(el=>({
                id: el.id,
                name: el.customerName,
                date: el.createDate,
                total: `${el.ordersShopItems.reduce((acc, order)=>acc+(order.price*order.count), 0)} $`,
                payStatus: el.status,
                payMethod: '??????',
                details: 'View Details'
            }))
        }
    }
}
