
const mutations = {

    SET_PROFILE(state, profile) {
        state.profile = profile;
    },

    SET_NEXT_PROFILE(state, profile) {
        if (profile) {
            state.profile.push(...profile)
        }
    },
}

export default mutations