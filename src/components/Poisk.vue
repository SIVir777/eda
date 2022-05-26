<template>
    <div class="container">
        <div class="vvod-text">Всегда только свежие продукты</div>
        <div class="input-search" ref="inputFon">
            <button class="knop-input" @click="clickButton">
                <img src="@/img/lupa.png" alt="search" class="search-logo">
            </button>
            <input v-model="search" @input="vvodPoisk" @keyup.enter="clickButton" @click="clickInput" type="text" placeholder="Поиск" class="input">  
        </div> 
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    data() {
        return {
            search: '',
        }
    },
    props: {
        goods: Array,
    },
    methods: {
        clickInput(e) {
            // e.target.parentNode.classList.add('fon-input-toggle');
            this.setIsActivePoisk(true);
            e.stopPropagation();
        }, 
        clickButton(e) {
            this.setIsActivePoisk(false);
            e.stopPropagation();
            // this.$refs.inputFon.classList.remove('fon-input-toggle');
        },
        vvodPoisk() {
            this.$emit('search', this.search);
        },
        ...mapMutations({
            setIsActivePoisk: 'poisk/setIsActivePoisk',
        }),
    },
    computed: {
        ...mapState({
            isActivePoisk: state => state.poisk.isActivePoisk,
        }),
    },
    watch: {
        isActivePoisk(active) {
            if (!active) {
                this.$refs.inputFon.classList.remove('fon-input-toggle');
            } else {
                this.$refs.inputFon.classList.add('fon-input-toggle');
            }
        },
    },
};
</script>

<style scoped>

.vvod-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 25px;
    margin: 7px 0;
}

.input {
    width: 100%;
    font-size: 23px;
    font-family: 'Roboto';
    border-radius: 23px;
    padding: 3px 15px;
    background: #f9f9f9;
    border: none;
    outline: none;
    font-family: 300;
}

.search-logo {
    width: 25px;
}

.knop-input {
    width: 25px;
    background: none;
    border: none;
    cursor: pointer;
}

.input-search {
    display: flex;
    align-items: flex-start;
    background: #f9f9f9;
    align-items: center;
    padding: 5px 17px;
    border-radius: 20px;
}

.fon-input-toggle {
    background: #BAC8DE;
}

</style>
