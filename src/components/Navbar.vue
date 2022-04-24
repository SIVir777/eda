<template>
    <div class="navbar">
        <div class="content-navbar">
            <img src="@/img/logo.png" alt="logo" class="logo">
            <ul class="menu">
                <li @click="$router.push('/')">Главное</li>
                <li @click="$router.push('/about')">О нас</li>
                <li @click="$router.push('/basket')">Корзина</li>
            </ul>
            <ul v-if="isMenu" class="menu-tel" @click="menuClickTel">
                <li @click="$router.push('/'), closeMenuTel()">Главное</li>
                <li @click="$router.push('/about'), closeMenuTel()">О нас</li>
                <li @click="$router.push('/basket'), closeMenuTel()">Корзина</li>
            </ul>
            <button v-if="!isAuth" class="btn btn-voyti btn-position" @click="showModalAuth">Войти</button>
            <button v-if="!isAuth" class="btn btn-reg" @click="showModalReg">Зарегистрирваться</button>
            <button v-if="isAuth" class="btn btn-vihod" @click="signOutUser">Выйти</button>
            <div @click="openMenuTel" class="burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <my-modal v-model:show="modalVisibleAuth">
                <div class="content-modal">
                    <img @click="closeModalAuth" src="@/img/close.png" alt="close" class="krestik">
                    <div class="title-modal">Авторизуйтесь под своим e-mail</div>
                    <form @submit="auth">
                        <input v-model="email" type="text" placeholder="Email" class="input-modal">
                        <input v-model="password" type="text" placeholder="Пароль" class="input-modal">
                        <div v-if="errorMessage.value" >{{errorMessage.value}}</div>
                        <button type="submit" class="btn-modal btn-modal-position">Войти</button>
                    </form>
                </div>
            </my-modal>
            <my-modal v-model:show="modalVisibleReg">
                <div class="content-modal">
                    <img @click="closeModalReg" src="@/img/close.png" alt="close" class="krestik">
                    <div class="title-modal">Зарегистрируйтесь, используя</div>
                    <div class="title-modal title-2-modal">свой email</div>
                    <form @submit="reg">
                        <input v-model="email" type="text" placeholder="Email" class="input-modal">
                        <input v-model="password" type="text" placeholder="Пароль" class="input-modal">
                        <button type="submit" class="btn-modal btn-modal-position">Зарегистрироваться</button>
                    </form>
                </div>
            </my-modal>
        </div>
    </div>
</template> 

<script>
import MyModal from '@/components/MyModal.vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, linkWithRedirect } from 'firebase/auth';

import { onAuthStateChanged, signOut, onIdTokenChanged } from 'firebase/auth';
import router from '@/router/router.js';

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    components: {
        MyModal,
    },
    data() {
        return {
            modalVisibleAuth: false,
            modalVisibleReg: false,
            email: '',
            password: '',
            errorMessage: { value: ''},
            authUser: getAuth(),
        };
    },
    props: {
        isAuth: Boolean,
    },
    methods: {
        showModalReg() {
            this.modalVisibleReg = true;
        },
        closeModalReg() {
            this.modalVisibleReg = false;
        },
        showModalAuth() {
            this.modalVisibleAuth = true;
        },
        closeModalAuth() {
            this.modalVisibleAuth = false;
        },
        auth(event) {
            event.preventDefault();
            signInWithEmailAndPassword(getAuth(), this.email, this.password)
                .then( data => {
                    if (data.user.email === 'mishaeda38@gmail.com') {
                        this.setIsAdmin(true);
                    };
                    this.modalVisibleAuth = false;
                })
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case 'auth/invalid-email': 
                            this.errorMessage.value = 'Email введён некоректно';
                        break;
                        case 'auth/user-not-found':
                            this.errorMessage.value = 'С таким email пользователя не существует';
                        break;
                        case 'auth/wrong-password':
                            this.errorMessage.value = 'Пароль введён неверно';
                        break;
                        default: 
                            this.errorMessage.value = 'Email или пароль не корректен';
                        break;
                    };
                });
        },
        reg(event) {
            event.preventDefault();
            this.modalVisibleReg = false;
            createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                .then(data => {
                    
                })
                .catch(error => {
                    console.log(error.message);
                }
            );
        },
        showModalReg() {
            this.modalVisibleReg = true;
        },
        closeModalReg() {
            this.modalVisibleReg = false;
        },
        signOutUser() {
            signOut(getAuth()).then( () => {
                router.push('/about');
            });
            this.setIsAdmin(false);
        },
        sost() {
            if (getAuth().currentUser) {
                console.log(getAuth().currentUser);
            } else {
            };
        },
        ...mapMutations({
            setIsAdmin: 'adminData/setIsAdmin',
            setIsMenu: 'navbar/setIsMenu',
        }),
        openMenuTel(event) {
            event.stopPropagation();
            this.setIsMenu(true);
        },
        menuClickTel(event) {
            event.stopPropagation();
        },
        closeMenuTel() {
            this.setIsMenu(false);
        },
    },
    computed: {
        ...mapState({
            isAdmin: state => state.adminData.isAdmin,
            isMenu: state => state.navbar.isMenu,
        }),
    },
};

</script>

<style scoped>
.navbar {
    background: rgba(220,230,252,0.6);
    height: 60px;
}

.content-navbar {
    margin: 0 auto;
    padding-top: 5px;
    width: 1170px;
    display: flex;
    align-items: flex-start;
    align-items: center;
}

.logo {
    width: 60px;
}

.menu li{
    list-style-type: none;
    margin-left: 45px;
    font-family: 'Roboto';
    font-weight: 400;
    cursor: pointer;
    font-size: 21px;
}

.menu {
    display: flex;
    margin-left: 420px;
}

.btn {
    border: 1px solid #7FC7FF;
    border-radius: 3px;
    background: none;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    cursor: pointer;
    padding: 2px 5px;
    transition: all 0.3s ease;
}

.btn:hover {
    color: #7FC7FF;
}

.btn-position {
    margin-left: auto;
}

.btn-reg {
    margin-left: 10px;
}

.btn-vihod {
    margin-left: auto;
}

.content-modal {
    padding: 30px 50px;
}

.title-modal {
    text-align: center;
    font-family: 'Roboto';
    font-size: 23px;
    margin-top: -30px;
}

.title-2-modal {
    margin: 0;
}

.input-modal {
    width: 436px;
    margin-top: 15px;
    padding: 10px 5px;
    font-size: 17px;
    border-radius: 5px;
    outline: none;
    border: 2px solid #7FC7FF;
}

.btn-modal {
    width: 100%;
    background: #7FC7FF;
    font-family: 'Roboto';
    font-size: 20px;
    border: none;
    padding: 5px 0;
    cursor: pointer;
    border-radius: 5px;
    color: #000;
    transition: background 0.3s ease;
}

.btn-modal:hover {
    background: #61BAFF;
}

.btn-modal-position {
    margin-top: 20px;
}

.krestik {
    cursor: pointer;
    width: 25px;
    transform: translate(1770%, -15%);
}

.burger {
    display: none;
    margin-left: 25px;
    margin-top: -8px;
    cursor: pointer;
}

.burger div{
    height: 3px;
    width: 35px;
    background: #000;
    margin-top: 8px;
}

.menu-tel {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    right: 0;
    padding: 30px 50px 150px 50px;
    z-index: 12;
}

.menu-tel li{
    list-style-type: none;
    color: #fff;
    font-family: 'Roboto';
    font-size: 27px;
    margin-top: 17px;
}

@media screen and (max-width: 1200px) {
    .content-navbar {
        width: 1140px;
    }
}

@media screen and (max-width: 1199px) {
    .content-navbar {
        width: 960px;
    }
    .menu {
        margin-left: 200px;
    }
}

@media screen and (max-width: 991px) {
    .content-navbar {
        width: 720px;
    }
    .menu {
        margin-left: 10px;
    }
}

@media screen and (max-width: 767px) {
    .content-navbar {
        width: 540px;
    }
    .menu {
        display: none;
    }
    .burger {
        display: block;
    }
    .btn-vihod {
        margin-right: 15px;
    }
}

@media screen and (max-width: 575px) {
    .content-navbar {
        width: 90%;
    }
}

@media screen and (max-width: 445px) {
    .btn-reg, .btn-voyti {
        font-size: 14px;
    }
    .btn-reg {
        margin-left: 2px;
        margin-right: 2px;
    }
    .btn-vihod {
        margin-right: 30px;
    }
    .burger {
        margin-left: 5px;
    }
}

</style>