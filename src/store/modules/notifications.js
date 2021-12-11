import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: () => ({
        notifications: []
    }),
    mutations: {
        setNotifications(state, data) {
            state.notifications = data
        }
    },
    actions: {
        async getNotifications({commit, rootState}) {
            await api.GET('/Notifications', rootState.token)
                .then(({data}) => {
                    commit('setNotifications', data)
                })
                .catch(console.dir)
        },
        async postNewNotification({dispatch, rootState, commit}, data) {
            commit('setLoading')
            try {
                await api.POST('/Notifications', data, rootState.token)
                await dispatch('getNotifications')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        }
    },
    getters: {
        getNotifications(state) {
            return (searchString) => {
                return state.notifications.map(el => {
                    let {postedTime, body} = el
                    postedTime = new Date(`${postedTime}Z`)
                    postedTime = new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', hour12: true
                    }).format(postedTime).toUpperCase()
                    return {postedTime, body}
                }).filter(el => {
                    return search([el.body], searchString)
                })
            }
        }
    }
}
