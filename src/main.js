import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router.js';
import store from '@/store/index.js';

import components from '@/components/UI/index.js';

import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBihOg5gJxj6sTMnjUg7EU6H0srH7bN6hQ",
    authDomain: "site-eda.firebaseapp.com",
    projectId: "site-eda",
    storageBucket: "site-eda.appspot.com",
    messagingSenderId: "39077627020",
    appId: "1:39077627020:web:af789fbb4cd7872048e7a9",
    databaseURL: 'https://site-eda-default-rtdb.europe-west1.firebasedatabase.app/',
};

const fbApp = initializeApp(firebaseConfig);
const database = getDatabase(fbApp);
const storage = getStorage(fbApp);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

components.forEach(component => {
    app.component(component.name, component);
});
