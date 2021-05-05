// import api from "@/service/api";

import api from "@/service/api";

export default {
    state: () => ({
        data: [],
        dataAr: []
    }),
    mutations: {
        setSales(state, {data, lang}) {
            if(lang === 'en') {
                state.data = data
            } else if (lang === 'ar') {
                state.dataAr = data
            }
        }
    },
    actions: {
        async getSales({commit, rootState}) {
            await api.GET('/sale', rootState.token)
                .then(({data}) => commit('setSales', {data, lang: 'en'}))
                .catch(err => console.log(err))
            await api.GET('/sale?culture=ar', rootState.token)
                .then(({data}) => commit('setSales', {data, lang: 'ar'}))
                .catch(err => console.log(err))
        },
        async postSale({dispatch, rootState, commit}, {data, dataAr}) {
            commit('setLoading')
            let id = ''
            try {
                await api.POST('/sale', data, rootState.token).then(({data}) => (id = data))
                await api.POST(`/sale/${id}/localization?culture=ar`, dataAr, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async putSale({dispatch, rootState, commit}, {data, dataAr, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/sale/${id}`, data, rootState.token)
                await api.PUT(`/sale/${id}?culture=ar`, dataAr, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteSale({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/sale/${id}`, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        }
    },
    getters: {
        getReformatSales(state) {
            return state.data.map((el, index) => {
                let orders = []
                if (el.shopItems.length) {
                    orders = el.shopItems.map(order => {
                        return {
                            id: order.id,
                            title: order.title,
                            image: order.imageUri,
                            volume: `${order.volume}LT`,
                            price: `$${(order.price * (1 - 0.01 * el.percent)).toFixed(2)}`
                        }
                    })
                }
                return {
                    id: el.id,
                    title: {
                        en: el?.title ?? '',
                        ar: state.dataAr[index]?.title ?? ''
                    },
                    percent: String(el.percent),
                    startDate: new Intl.DateTimeFormat('en-GB').format(new Date(el.startDate)),
                    endDate: new Intl.DateTimeFormat('en-GB').format(new Date(el.endDate)),
                    description: {
                        en: el?.description ?? '',
                        ar: state.dataAr[index]?.description ?? ''
                    },
                    products: orders
                }
            })
        },
        getSalesForEdit(state) {
            return state.data.map((el, index) => {
                let orders = []
                if (el.shopItems.length) {
                    orders = el.shopItems.map(order => order.id)
                }
                return {
                    id: el.id,
                    title: {
                        en: el?.title ?? '',
                        ar: state.dataAr[index]?.title ?? ''
                    },
                    percent: String(el.percent),
                    startDate: el.startDate.substring(0,10),
                    endDate: el.endDate.substring(0,10),
                    description: {
                        en: el?.description ?? '',
                        ar: state.dataAr[index]?.description ?? ''
                    },
                    shopItemsId: orders
                }
            })
        },
    }
}
