import axios from "axios"

const actions = {

    getInitialUsers({ commit }, params) {
        return axios.get(params).then((response) => {
            console.log(response.data);
            commit('SET_PROFILE', response.data.items)
        });
    },

    getNextUsers({ commit }, params) {
        return axios.get(params).then((response) => {
            console.log(response.data);
            commit('SET_PROFILE', response.data.items)
        });
    }  
}

export default actions