import axios from "axios"

const actions = {

    getInitialUsers({ commit }, params) {
        return axios.get(params).then((response) => {
            commit('SET_PROFILE', response.data.items)
        });
    },

    getNextUsers({ commit }, params) {
        return axios.get(params).then((response) => {
            if (response.data.items) {
                commit('SET_NEXT_PROFILE', response.data.items)
            }
        });
    }  
}

export default actions