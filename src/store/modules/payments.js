import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: () => ({
        data: [],
    }),
    mutations: {
        setPayments(state, data) {
            state.data = data
        },
    },
    actions: {
        async fetchPayments({commit, rootState}) {
            try {
                const {data} = await api.GET('/admin/getpayments', rootState.token)
                commit('setPayments', data)
            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        getPayments(state) {
            return (searchString) => {
                return state.data.map(el => ({
                    paymentId: el.paymentId,
                    orderId: el.orderId,
                    dateTime: new Intl.DateTimeFormat('en-GB').format(new Date(`${el.dateTime}Z`)),
                    customerName: el.customerName,
                    price: el.price,
                    paymentMethod: el.paymentMethod,
                })).filter(el => {
                    return search([el.paymentId.toString(), el.orderId.toString(), el.customerName], searchString)
                })
            }
        }
    }
}
