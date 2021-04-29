import api from "@/service/api";

export default {
    state: () => ({
        data: []
    }),
    mutations: {
        setBanners(state, data) {
            state.data = data
        }
    },
    actions: {
        async getBanners({commit, rootState}) {
            await api.GET('/Banners', rootState.token)
                .then(({data}) => commit('setBanners', data))
                .catch(err => console.log(err))
        },
        deleteBanner({rootState, dispatch, commit}, id) {
            commit('setLoading')
            api.DELETE(`/banners?id=${id}`, rootState.token)
                .then(() => {
                    dispatch('getBanners')
                    dispatch('setSuccessMessage')
                })
                .catch(() => {
                    dispatch('setErrorMessage')
                })
            commit('unsetLoading')
        },
        postBanner({rootState, dispatch, commit}, formdata) {
            commit('setLoading')
            api.POST(`/banners?Linq=http://www.syject.com/`, formdata, rootState.token, true)
                    .then(() => {
                        dispatch('getBanners')
                        dispatch('setSuccessMessage')
                    })
                .catch(() => {
                    dispatch('setErrorMessage')
                })
            commit('unsetLoading')
        }
    },
    getters: {}
}
