import {createStore} from 'vuex';
import { product } from '@/store/modules/product.js';
import { adminData } from '@/store/modules/adminData.js';
import { auth } from '@/store/modules/auth.js';
import { basket } from '@/store/modules/basket.js';
import { sendEmail } from '@/store/modules/sendEmail.js';
import { navbar } from '@/store/modules/navbar.js';
import { poisk } from '@/store/modules/poisk.js';

export default createStore({
    modules: {
        product: product,
        adminData: adminData,
        auth: auth,
        basket: basket,
        sendEmail: sendEmail,
        navbar: navbar,
        poisk: poisk,
    },
});