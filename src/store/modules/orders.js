import api from "@/service/api";

export default {
    state: () => ({
        data: [],
        orderDetails: null
    }),
    mutations: {
        setOrders(state, data) {
            state.data = data
        },
        setOrderDetails(state, data) {
            state.orderDetails = data
        }
    },
    actions: {
        async getOrders({commit, rootState}) {
            try {
                const {data} = await api.GET('/orders', rootState.token)
                commit('setOrders', data)
            } catch (e) {
                console.log(e);
            }
        },
        showOrderDetails({commit, state}, id) {
            commit('setOrderDetails', state.data.find(el => el.id === id))
        },
        closeOrderDetails({commit}) {
            commit('setOrderDetails', null)
        }
    },
    getters: {
        getSimpleOrdersInformation(state) {
            return state.data.map(el => ({
                id: el.id,
                name: el.customerName,
                date: new Intl.DateTimeFormat('en-GB').format(new Date(`${el.createDate}Z`)),
                total: `${el.ordersShopItems.reduce((acc, order) => acc + (order.price * order.count), 0)} $`,
                payStatus: el.status,
                payMethod: '??????',
            }))
        }
    }
}
