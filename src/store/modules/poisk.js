

export const poisk = {
    state: () => ({
        isActivePoisk: false,
    }),
    getters: {

    },
    mutations: {
        setIsActivePoisk(state, isActivePoisk) {
            state.isActivePoisk = isActivePoisk;
        },
    },
    actions: {

    },
    namespaced: true,
};