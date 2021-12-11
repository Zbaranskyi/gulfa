import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: () => ({
        data: [],
        currentDriver: null
    }),
    mutations: {
        setDrivers(state, data) {
            state.data = data
        },
        setCurrentDriver(state, data) {
            state.currentDriver = data
        }
    },
    actions: {
        async fetchDrivers({commit, rootState}) {
            await api.GET('/admin/driver', rootState.token)
                .then(({data}) => commit('setDrivers', data))
                .catch(err => console.log(err))
        },
        setCurrentDriver({commit, state}, id = null) {
            if (id === null) commit('setCurrentDriver', null)
            else commit('setCurrentDriver', state.data.find(el => el.id === id))
        },
        async putDriver({dispatch, rootState, commit, state}, data) {
            let id = state.currentDriver.id
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
            } catch (e) {
                let errorMessage = e?.response?.data
                dispatch('setErrorMessage', errorMessage)
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteDriver({rootState, dispatch, commit, state}) {
            let id = state.currentDriver.id
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
        getDriver: state => {
            let {firstName, lastName, phoneNumber, email} = state.currentDriver
            return {firstName, lastName, phoneNumber, email}
        },
        getDrivers(state) {
            return (searchString) => {
                return state.data.filter(el => {
                    return search([el.email, el.firstName, el.lastName, el.phoneNumber], searchString)
                })
            }
        }
    }
}
