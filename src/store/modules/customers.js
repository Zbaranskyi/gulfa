import api from "@/service/api";

export default {
    state: () => ({
        data: [],

    }),
    mutations: {
        setCustomers(state, data) {
            state.data = data
        }
    },
    actions: {
        async getCustomers({commit, rootState}) {
            await api.GET('/admin/customers', rootState.token)
                .then(({data}) => commit('setCustomers', data))
                .catch(err => console.log(err))
        },
        async deleteCustomer({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/admin/customer/${id}`, rootState.token)
                await dispatch('getCustomers')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async putCustomer({dispatch, rootState, commit}, {data, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/admin/customer/${id}`, data, rootState.token)
                await dispatch('getCustomers')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
    },
    getters: {
        getFilteredData(state) {
            return state.data.map(el => ({
                id: el.id,
                name: el.firstName ?? '----',
                lastName: el.lastName ?? '----',
                number: el.phoneNumber ?? '----',
                birthday: el?.birthDate ? new Intl.DateTimeFormat('en-GB').format(new Date(el.birthDate)) : '----',
                city: el.cityName ?? '----',
                family: el.familyMembersCount ?? '----',
                lastOrder: el.ordersId?.length ? el.ordersId[0] : '----',
                subscription: el.subscriptionIsActive
            }))
        },
        getFullData: state => id => state.data.find(el =>el.id === id),
        getCustomers: state => state.data,
        getCustomer: state => id => state.data.find(el => el.id === id)
    }
}
