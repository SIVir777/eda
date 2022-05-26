<template>
    <div class="container">
        <div v-if="!isAuth" class="warning-auth">
            Чтобы воспользоваться корзиной необходимо авторизоваться!
        </div>
        <div v-if="isAuth">
            <div class="title-basket">Ваши товары:</div>
        </div>
    </div>
    <div v-if="!isLoadingBasket" class="container">
        <div v-if="isAuth" class="menu-tovar-basket">
            <tovar
                v-for="tovar in productsBasket"
                :tovar="tovar"
                :key="tovar.id"
                :thatBasket="true"
            >

            </tovar>
        </div>
        <div v-if="isAuth && isMassivBasket" class="last-element">
            <button @click="openModal" class="btn-zakaz position-btn-zakaz">Заказать</button>
        </div>
        <div v-else-if="isAuth && isLoadingBasket" class="net-tovarov-basket">У вас пока нет выбранных товаров</div>
        <my-modal v-model:show="isModal">
            <div class="content-modal">
                <img @click="closeModal" src="@/img/close.png" alt="close" class="krestik">
                <div class="text-block">
                    <div class="title-modal">Здесь вы можете оставить своё</div>
                    <div class="title-modal">сообщение нам,</div>
                    <div class="title-modal">позже мы с вами свяжемся</div>
                </div>
                <textarea v-model="text" style="height: 150px" placeholder="Оставте своё сообщение" class="textarea"></textarea>
                <div class="center-knop">
                    <button @click="sendEmailB" class="btn-zakaz">Заказать</button>
                </div>
            </div>
        </my-modal>
    </div>
    <div class="container">
        <loader v-if="isLoadingBasket" class="positionLoading"></loader>  
    </div>
</template>

<script>
import Tovar from '@/components/Tovar.vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {mapState, mapActions, mapMutations} from 'vuex';
import MyModal from '@/components/MyModal.vue';

import emailjs from 'emailjs-com';
export default {
    components: {
        Tovar, MyModal,
    },
    data() {
        return {
            isAuth: true,
            cenaOb: 0,
            isModal: false,
            text: '',
        };
    },
    methods: {
        ...mapMutations({
            setUser: 'basket/setUser',
        }),
        ...mapActions({
            getBasketProduct: 'basket/getBasketProduct',
            sendZakaz: 'sendEmail/sendZakaz',
        }),
        sendEmailB() {
            this.productsBasket.forEach(prod => {
                this.cenaOb = Number(this.cenaOb) + Number(prod.cena);
            });
            
            emailjs.send("service_9uhdhy8","template_ffq25zo", {
                email: this.user.email,
                cena: this.cenaOb,
                message: this.text,
            }, 'd-0Rq1dzvZImZGYQR');
            this.isModal = false;
            this.text = '';
        },
        openModal() {
            this.isModal = true;
        },
        closeModal() {
            this.isModal = false;
        }
    },
    mounted() {
        onAuthStateChanged(getAuth(), user => {
            if (user) {
                this.isAuth = true;
                this.setUser(user);
                this.getBasketProduct(); 
            } else {
                this.isAuth = false;
            };
        });
    },
    computed: {
        ...mapState({
            productsBasket: state => state.basket.productsBasket,
            user: state => state.basket.user,
            isLoadingBasket: state => state.basket.isLoadingBasket,
            isMassivBasket: state => state.basket.isMassivBasket,
        }),
    },
};
</script>

<style scoped>
.warning-auth {
    font-family: 'Roboto';
    text-align: center;
    font-size: 25px;
    margin-top: 50px;
}
.title-basket {
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: 400;
    margin-top: 15px;
}

.btn-zakaz {
    background: #FF7A5C;
    border: 2px solid #FF6347;
    border-radius: 5px;
    font-family: 'Roboto';
    padding: 4px 60px;
    font-size: 27px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-zakaz:hover {
    background: #FF6347;
}

.content-modal {
    padding: 30px 50px;
}

.krestik {
    cursor: pointer;
    width: 25px;
    transform: translate(1770%, -15%);
}

.title-modal {
    font-family: 'Roboto', sans-serif;
    font-size: 23px;
    text-align: center;
}

.textarea {
    font-family: 'Roboto';
    width: 436px;
    padding: 10px 5px;
    font-size: 17px;
    border-radius: 5px;
    outline: none;
    border: 2px solid #7FC7FF;
    resize: none;
}

.center-knop {
    text-align: center;
    margin-top: 15px;
}

.text-block {
    margin-top: -27px;
    margin-bottom: 15px;
}

.last-element {
    margin-bottom: 70px;
}

.positionLoading {
    margin: 0 auto;
    margin-top: 230px;
}

.net-tovarov-basket {
    font-family: 'Roboto';
    font-size: 25px;
    margin-top: 50px;
}

.position-btn-zakaz {
    margin-left: 64px;
}

@media screen and (max-width: 1200px) {
    .container {
        width: 1140px;
    }
}

@media screen and (max-width: 1199px) {
    .container {
        width: 960px;
    }
}

@media screen and (max-width: 991px) {
    .container {
        width: 720px;
    }
}

@media screen and (max-width: 767px) {
    .container {
        width: 540px;
    }
}

@media screen and (max-width: 575px) {
    .container {
        width: 90%;
    }
}

@media screen and (max-width: 400px) {
    .tovar {
        transform: scale(90%);
        margin: 0 auto;
    }
    .menu-tovar-basket {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .position-btn-zakaz {
        margin: 0 auto;
    }
    .last-element {
        text-align: center;
    }
    
}

</style>
