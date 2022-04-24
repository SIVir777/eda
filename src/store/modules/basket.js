import { getDatabase, ref, push, set, onValue, remove, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export const basket = {
    state: () => ({
        zakazId: '',
        productIn: '',
        productsBasket: [],
        removeIdBas: '',
        user: '',
        isLoadingBasket: false,
        isMassivBasket: false,
    }),
    getters: {

    },
    mutations: {
        setZakazId(state, zakazId) {
            state.zakazId = zakazId;
        },
        setProductIn(state, productIn) {
            state.productIn = productIn;
        },
        setProductsBasket(state, productsBasket) {
            state.productsBasket = productsBasket;
        },
        setRemoveIdBas(state, removeIdBas) {
            state.removeIdBas = removeIdBas;
        },
        setUser(state, user) {
            state.user = user;
        },
        setIsLoadingBasket(state, isLoadingBasket) {
            state.isLoadingBasket = isLoadingBasket;
        },
        setIsMassivBasket(state, isMassivBasket) {
            state.isMassivBasket = isMassivBasket;
        },
    },
    actions: {
        async addBasketProduct({state, commit}) {
            try {
                const db = getDatabase();
                const auth = getAuth();
                const uid = auth.currentUser.uid;
                const productRef = ref(db, 'products/' + state.zakazId);
                onValue(productRef, async data => {
                    const product = data.val();
                    commit('setProductIn', product);
                });
                const idZakazInBasket = Date.now();
                const productInBasket = ref(db, `baskets/${uid}/${idZakazInBasket}`);
                await set(productInBasket, state.productIn);
                const updates = {};
                updates[`/baskets/${uid}/${idZakazInBasket}/idBasket`] = idZakazInBasket;
                update(ref(db), updates);
            } catch(e) {
                console.log(e);
                throw(e);
            };
        },
        async getBasketProduct({state, commit}) {
            try {
                commit('setIsLoadingBasket', true);
                const db = getDatabase();
                const uid = state.user.uid;
                const productsRef = ref(db, 'baskets/' + uid);
                onValue(productsRef, data => {
                    const productsDbBasket = data.val();
                    commit('setProductsBasket', []);
                    for (let key in productsDbBasket) {
                        commit('setProductsBasket', [...state.productsBasket, productsDbBasket[key]]);
                    };
                    commit('setIsLoadingBasket', false);

                    if (state.productsBasket.length !== 0) {
                        commit('setIsMassivBasket', true);
                    } else {
                        commit('setIsMassivBasket', false);
                    };
                });
            } catch(e) {
                console.log(e);
                throw(e);
            };
        },
        async removeProductBasket({state, commit}) {
            try {
                const db = getDatabase();
                const auth = getAuth();
                const uid = auth.currentUser.uid;
                const productRef = ref(db, `baskets/${uid}/${state.removeIdBas}`);
                remove(productRef);
            } catch(e) {
                console.log(e);
            };
        },
    },
    namespaced: true,
};