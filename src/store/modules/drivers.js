// import api from "@/service/api";

import api from "@/service/api";

export default {
    state: () => ({
        data: []
    }),
    mutations: {
        setDrivers(state, data) {
            state.data = data
        }
    },
    actions: {
        async getDrivers({commit, rootState}) {
            await api.GET('/admin/driver', rootState.token)
                .then(({data}) => commit('setDrivers', data))
                .catch(err => console.log(err))
        },
        async putDriver({dispatch, rootState, commit}, {data, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/admin/driver/${id}`, data, rootState.token)
                await dispatch('getDrivers')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async postDriver({dispatch, rootState, commit}, data) {
            commit('setLoading')
            try {
                await api.POST(`/admin/driver`, data, rootState.token)
                await dispatch('getDrivers')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteDriver({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/admin/driver/${id}`, rootState.token)
                await dispatch('getDrivers')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
    },
    getters: {
        getDriver: state => id => state.data.find(el=>el.id===id)
    }
}
