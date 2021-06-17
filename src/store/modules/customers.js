import api from "@/service/api";

export default {
    state: () => ({
        data: [],
        currentCustomer: null

    }),
    mutations: {
        setCustomers(state, data) {
            state.data = data
        },
        setCurrentCustomer(state, data) {
            state.currentCustomer = data
        }
    },
    actions: {
        async getCustomers({commit, rootState}) {
            await api.GET('/admin/customers', rootState.token)
                .then(({data}) => commit('setCustomers', data))
                .catch(err => console.log(err))
        },
        async deleteCustomer({rootState, dispatch, commit, state}) {
            let id = state.currentCustomer.id
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
        setCurrentCustomer({commit, state}, id = null) {
            if (id === null) commit('setCurrentCustomer', null)
            else commit('setCurrentCustomer', state.data.find(el => el.id === id))
        },
        async putCustomer({dispatch, rootState, commit, state}, data) {
            let id = state.currentCustomer.id
            let customer = state.currentCustomer
            let {cityName: cityName, ...mainInfo} = data
            let fullData = {
                ...mainInfo,
                nationality: customer.nationality,
                addressTranslations: [
                    {
                        "culture": "en",
                        "cityName": cityName,
                        "districtName": customer.districtName,
                        "street": customer.street,
                        "building": customer.building,
                        "apartment": customer.apartment
                    }
                ]
            }
            commit('setLoading')
            try {
                await api.PUT(`/admin/customer/${id}`, fullData, rootState.token)
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
        getCustomer: state => id => state.data.find(el => el.id === id),
        getCurrentCustomer: state => {
            let {firstName, lastName, phoneNumber, birthDate, cityName, familyMembersCount, subscriptionIsActive, ordersId} = state.currentCustomer
            return {firstName, lastName, phoneNumber, birthDate, cityName, familyMembersCount, subscriptionIsActive, ordersId}
        }
    }
}
