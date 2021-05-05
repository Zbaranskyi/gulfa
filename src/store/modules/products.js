import api from "@/service/api";

export default {
    state: () => ({
        data: [],
        categories: [],
        selectedProduct: {},
        selectedCategory: {}
    }),
    mutations: {
        setProducts(state, data) {
            state.data = data
        },
        setCategories(state, data) {
            state.categories = data
        },
        setSelectedProduct(state, data) {
            state.selectedProduct = data
        },
        setSelectedCategory(state, data) {
            state.selectedCategory = data
        }
    },
    actions: {
        async getProducts({commit, rootState}) {
            await api.GET('/ShopItems', rootState.token)
                .then(({data}) => commit('setProducts', data))
                .catch(err => console.log(err))
        },
        async getSelectedProduct({commit, rootState}, id) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                let product = {}
                await api.GET(`/ShopItems/${id}`, rootState.token)
                    .then(({data}) => (product = data))
                    .catch(err => console.log(err))
                await api.GET(`/ShopItems/${id}?culture=ar`)
                    .then(({data}) => {
                        product = {
                            ...product,
                            titleAr: data.title,
                            descriptionAr: data.description
                        }
                        commit('setSelectedProduct', product)
                        resolve()
                    })
                    .catch(() => reject())
            })
        },
        async getSelectedCategory({commit, rootState}, id) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                let category = {}
                await api.GET(`/Categories/${id}`, rootState.token)
                    .then(({data}) => (category = data))
                    .catch(err => console.log(err))
                await api.GET(`/Categories/${id}?culture=ar`)
                    .then(({data}) => {
                        category = {
                            ...category,
                            titleAr: data.title,
                        }
                        commit('setSelectedCategory', category)
                        resolve()
                    })
                    .catch(() => reject())
            })
        },
        async getCategories({commit, rootState}) {
            await api.GET('/Categories', rootState.token)
                .then(({data}) => commit('setCategories', data))
                .catch(err => console.log(err))
        },
        async postProduct({dispatch, rootState, commit}, {data, dataAr, formdata}) {
            commit('setLoading')
            let id = ''
            try {
                await api.POST('/shopitems', data, rootState.token).then(({data}) => (id = data))
                await api.POST(`/shopitems/${id}/localization?culture=ar`, dataAr, rootState.token)
                await dispatch('patchPhotoProduct', {formdata, id})
                await dispatch('getProducts')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async postCategory({dispatch, rootState, commit}, {formdata, dataAr, data}) {
            commit('setLoading')
            let id = ''
            try {
                await api.POST('/categories', data, rootState.token).then(({data}) => (id = data))
                await api.POST(`/categories/${id}/localization?culture=ar`, dataAr, rootState.token)
                await dispatch('patchPhotoCategory', {formdata, id})
                await dispatch('getCategories')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async putProduct({dispatch, rootState, commit}, {data, formdata,dataAr, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/shopitems/${id}/localization?culture=en`, data, rootState.token)
                await api.PUT(`/shopitems/${id}/localization?culture=ar`, dataAr, rootState.token)
                if (formdata) {
                    await dispatch('patchPhotoProduct', {id, formdata})
                }
                await dispatch('getProducts')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async putCategory({dispatch, rootState, commit}, {data, formdata, dataAr, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/categories/${id}`, data, rootState.token)
                await api.PUT(`/categories/${id}?culture=ar`, dataAr, rootState.token)
                if (formdata) {
                    await dispatch('patchPhotoCategory', {id, formdata})
                }
                await dispatch('getCategories')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async patchPhotoProduct({rootState}, {formdata, id}) {
            return api.PATCH(`/shopitems/${id}/Icon`, formdata, rootState.token, true)
        },
        async patchPhotoCategory({rootState}, {formdata, id}) {
            return api.PATCH(`/categories/${id}/Icon`, formdata, rootState.token, true)
        },
        async deleteCategory({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/categories/${id}`, rootState.token)
                await dispatch('getCategories')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteProduct({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/ShopItems/${id}`, rootState.token)
                await dispatch('getProducts')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        }
    },
    getters: {
        getSelectedProduct: state => state.selectedProduct,
        getSelectedCategory: state => state.selectedCategory,
    }
}
