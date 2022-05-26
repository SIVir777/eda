import Main from '@/pages/Main.vue';
import About from '@/pages/About.vue';
import Basket from '@/pages/Basket.vue';
// import {createRouter, createWebHistory} from "vue-router";
import {createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/basket',
        component: Basket,
    },
    {
        path: '/about',
        component: About,
    },
];

const router = createRouter({
    routes,
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
});

export default router;