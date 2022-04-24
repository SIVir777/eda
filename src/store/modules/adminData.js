import { getAuth } from 'firebase/auth';

export const adminData = {
    state: () => ({
        isAdmin: false,
    }),
    getters: {

    },
    mutations: {
        setIsAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
    },
    actions: {

    },
    namespaced: true,
};