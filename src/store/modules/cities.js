import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: {
        cities: [],
        editCity: null
    },
    mutations: {
        setCities(state, payload) {
            state.cities = payload
        },
        setEditCity(state, data) {
            state.editCity = data
        }
    },
    actions: {
        async fetchCities({commit}) {
            try {
                const {data} = await api.GET('/admin/city')
                commit('setCities', data)
            } catch (e) {
                console.log(e);
            }
        },
        setEditCity({commit}, data) {
            commit('setEditCity', data)
        },
        async postNewCity({dispatch, rootState}, payload) {
            try {
                await api.POST('/admin/city', payload, rootState.token)
                await dispatch('setSuccessMessage')
                await dispatch('getCities')
            } catch (e) {
                console.log(e);
            }
        },
        async putCity({dispatch, rootState, state}, data) {
            try {
                await api.PUT(`/admin/put/${state.editCity.id}`, data, rootState.token)
                await dispatch('setSuccessMessage')
                await dispatch('getCities')
            } catch (e) {
                console.log(e);
            }
        },
        async deleteCity({dispatch, rootState}, id) {
            try {
                await api.DELETE(`/admin/city/${id}`, rootState.token)
                await dispatch('setSuccessMessage')
                await dispatch('getCities')
            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        getCities(state) {
            return (searchString) => {
                return state.cities.filter(el => {
                    return search([el.cityName, el.districtName], searchString)
                })
            }
        }
    }
}
