// import api from "@/service/api";

import api from "@/service/api";

export default {
    state: () => ({
        data: [],
        dataAr: [],
        currentSale: null
    }),
    mutations: {
        setSales(state, {data, lang}) {
            if(lang === 'en') {
                state.data = data
            } else if (lang === 'ar') {
                state.dataAr = data
            }
        },
        setCurrentSale(state, data) {
            state.currentSale = data
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
        async deleteSale({rootState, dispatch, commit, state}) {
            let id = state.currentSale.id
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
        setCurrentSale({commit, state}, id = null) {
            if (id === null) commit('setCurrentSale', null)
            else {
                let el = state.data.find(el => el.id === id)
                let index = state.data.findIndex(el => el.id === id)
                let orders = []
                if (el.shopItems.length) {
                    orders = el.shopItems.map(order => order.id)
                }
                let data = {
                    title: el?.title ?? '',
                    arTitle: state.dataAr[index]?.title ?? '',
                    percent: String(el.percent),
                    startDate: el.startDate.substring(0,10),
                    endDate: el.endDate.substring(0,10),
                    description: el?.description ?? '',
                    arDescription: state.dataAr[index]?.description ?? '',
                    shopItemsId: orders
                }
                commit('setCurrentSale', data)
            }
        },
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
        getCurrentSale(state) {
            // eslint-disable-next-line no-unused-vars
            let {id, ...data} = state.currentSale
            return data
        }
    }
}
