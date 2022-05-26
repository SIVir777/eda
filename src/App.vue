<template>
    <div @click="documentClick" class="app">
        <navbar :isAuth="isAuth"></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { mapMutations, mapState } from 'vuex';
export default {
    components: {
        Navbar,
    },
    data() {
        return {
            isAuth: false,
        }; 
    },
    methods: {
        ...mapMutations({
            setIsAdmin: 'adminData/setIsAdmin',
            setIsAuth: 'auth/setIsAuth',
            setIsMenu: 'navbar/setIsMenu',
            setIsActivePoisk: 'poisk/setIsActivePoisk',
        }),
        documentClick() {
            this.setIsMenu(false);
            this.setIsActivePoisk(false);
        },
    },
    computed: {
        ...mapState({
            isAuthV: state => state.auth.isAuth,
        }),
    },
    mounted() {
        onAuthStateChanged(getAuth(), user => {
            if (user) {
                this.isAuth = true;
                this.setIsAuth(true);
                if (user.email === 'ilyasivir@gmail.com') {
                    this.setIsAdmin(true);
                };
            } else {
                this.isAuth = false;
                this.setIsAuth(false);
            };
        });
    },
};

</script>


<style>
* {
    padding: 0;
    margin: 0;
}

.container {
    width: 1170px; 
    margin: 0 auto;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
