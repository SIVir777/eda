import {getDatabase, ref as ref, push, set, onValue, update, remove} from 'firebase/database';
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';

class Product {
    constructor (title, kolvo, cena, kal, id) {
        this.title = title;
        this.kolvo = kolvo;
        this.cena = cena;
        this.kal = kal;
        this.img = '';
        this.id = id;
    };

};

import { createConditionalExpression } from '@vue/compiler-core';

export const product = {
    state: () => ({
        modalCreateProduct: false, 
        products: [],
        imgSrc: '',

        img: null,
        keyProduct: '',
        urlImg: '',
        removeId: '',

        title: '',
        kolvo: '',
        cena: '',
        kal: '',
        img: '',
        id: '',

        isLoading: false,
    }),
    getters: {

    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setImgSrc(state, imgSrc) {
            state.imgSrc = imgSrc;
        },

        setTitle(state, title) {
            state.title = title;
        },
        setKolvo(state, kolvo) {
            state.kolvo = kolvo;
        },
        setCena(state, cena) {
            state.cena = cena;
        },
        setKal(state, kal) {
            state.kal = kal;
        },
        setId(state, id) {
            state.id = id;
        },

        setImg(state, img) {
            state.img = img;
        },
        setKeyProduct(state, keyProduct) {
            state.keyProduct = keyProduct;
        },
        setUrlImg(state, urlImg) {
            state.urlImg = urlImg;
        },
        setRemoveId(state, removeId) {
            state.removeId = removeId;
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
    },
    actions: {
        async createProduct({state, commit}) {
            try {
                commit('setId', Date.now());
                const newProduct = new Product(
                    state.title, state.kolvo, state.cena, state.kal, state.id
                );
                const db = getDatabase();
                const productListRef = ref(db, '/products');
                const newProductRef = push(productListRef);
                commit('setKeyProduct', newProductRef.key);
                await set(newProductRef, newProduct);

                const imgExt = state.img.name.slice(state.img.name.lastIndexOf('.'));
                const storage = getStorage();
                const storageRef = ref_storage(storage, `products/${state.keyProduct}${imgExt}`);
                await uploadBytes(storageRef, state.img).then(snapshot => {
                    
                });

                await getDownloadURL(ref_storage(storage, `products/${state.keyProduct}${imgExt}`)).then( url => {
                    commit('setUrlImg', url);
                });
                
                const updates = {};
                updates['/products/' + state.keyProduct + '/img'] = state.urlImg;
                updates['/products/' + state.keyProduct + '/id'] = state.keyProduct;
                update(ref(db), updates);                
            } catch (error) {
                console.log(error);
                throw (error);
            };
        },
        async getProducts({state, commit}) {
            try {
                commit('setIsLoading', true);
                const db = getDatabase();
                const productsRef = ref(db, 'products/');
                onValue(productsRef, data => {
                    const productsDb = data.val();
                    commit('setProducts', []);
                    for (let key in productsDb ) {
                        commit('setProducts', [...state.products, productsDb[key]]);
                    };
                    commit('setIsLoading', false);
                });
                
            } catch(e) {
                console.log(e);
                throw(e);
            }
        },
        async removeProduct({state, commit}) {
            try {
                const db = getDatabase();
                const productRef = ref(db, 'products/' + state.removeId);
                let tovar;
                onValue(productRef, data => {
                    tovar = data.val();
                });
                const imgSsilka = tovar.img;
                const metka1 = imgSsilka.indexOf('/products%2F') + 12;
                const metka2 = imgSsilka.indexOf('?');
                const indexfile = imgSsilka.slice(metka1, metka2);
                remove(productRef);
                const storage = getStorage();
                const fileRef = ref_storage(storage, '/products/' + indexfile );
                deleteObject(fileRef);
            } catch(e) {
                console.log(e);
                throw(e); 
            };
        },
    },
    namespaced: true,
};