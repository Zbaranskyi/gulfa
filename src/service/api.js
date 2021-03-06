import axios from "axios";
const mainRoute = 'https://gulfaweb.azurewebsites.net'


async function makeRequest({type, endpoint, data, params, token, formdata}) {
    return axios({
        baseURL: mainRoute,
        url: endpoint,
        method: type,
        params: params ? params : '',
        data: data ? data : '',
        headers: token ? {
            'Authorization': 'Bearer ' + token,
            'Content-Type': formdata ? 'multipart/form-data' : 'application/json'
        } : ''
    });
}

export default {
    GET: async (endpoint, token) => await makeRequest({type: 'GET', endpoint, token}),
    POST: async (endpoint, data, token, formdata) => await makeRequest({type: 'POST', endpoint, data, token, formdata}),
    PUT: async (endpoint, data, token, params) => await makeRequest({type: 'PUT', endpoint, data, params, token}),
    DELETE: async (endpoint, token) => await makeRequest({type: 'DELETE', endpoint, token}),
    PATCH: async (endpoint, data, token, formdata) => await makeRequest({
        type: 'PATCH',
        endpoint,
        data,
        token,
        formdata
    }),
}
