

export const navbar = {
    state: () => ({
        isMenu: false,
    }),
    getters: {

    },
    mutations: {
        setIsMenu(state, isMenu) {
            state.isMenu = isMenu;
        },
    },
    actions: {

    },
    namespaced: true,
};