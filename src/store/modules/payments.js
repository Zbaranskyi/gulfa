// import api from "@/service/api";
import {payments} from "@/test-data/payments";
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
        fetchPayments({commit, /*rootState*/}) {
            // try {
            //     const {data} = await api.GET('/payments', rootState.token)
            //     commit('setPayments', data)
            // } catch (e) {
            //     console.log(e);
            // }
            commit('setPayments', payments)
        },
    },
    getters: {
        getPayments(state) {
            return (searchString) => {
                return state.data.map(el => ({
                    id: el.id,
                    date: el.date,
                    name: el.name,
                    price: el.price,
                    payMethod: el.payMethod,
                })).filter(el => {
                    return search([el.name], searchString)
                })
            }
        }
    }
}
