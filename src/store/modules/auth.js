

export const auth = {
    state: () => ({
        isAuth: false,
    }),
    getters: {

    },
    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth;
        },
    },
    actions: {

    },
    namespaced: true,
};