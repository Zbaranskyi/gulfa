import api from "@/service/api";

export default {
    state: {
        cities: []
    },
    mutations: {
        setCities(state, payload) {
            state.cities = payload
        }
    },
    actions: {
        async getCities({commit}) {
            try {
                const {data} = await api.GET('/admin/city')
                commit('setCities', data)
            } catch (e) {
                console.log(e);
            }
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
        async deleteCity({dispatch, rootState}, id) {
            try {
                await api.DELETE(`/admin/city/${id}`, rootState.token)
                await dispatch('setSuccessMessage')
                await dispatch('getCities')
            } catch (e) {
                console.log(e);
            }
        }
    }
}
