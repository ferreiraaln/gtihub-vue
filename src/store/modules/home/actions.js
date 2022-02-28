import axios from "axios"

const actions = {

    getInitialUsers({ commit }, params) {
        if (params) {
             axios.get(params).then((response) => {
                commit('SET_PROFILE', response.data.items)
            });
        } else {
            commit('SET_PROFILE', [])
        }
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