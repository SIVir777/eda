<template>
    <div class="tovar">
        <h3 class="title-tovar">{{tovar.title}}</h3>
        <div>
            <img :src="tovar.img" alt="еда" class="img-tovar">
        </div>
        <div class="podpis-tovar"><strong>Цена:</strong> {{tovar.kolvo}} - {{tovar.cena}}р.</div>
        <div class="podpis-tovar"><strong>Калорийность:</strong> {{tovar.kal}} Ккал</div>
        <div class="button-parent">
            <button v-if="!isAuth" class="button-tovar">Заказать</button>
            <button v-if="isAuth && thatBasket" @click="removeProductBasketT" class="button-tovar">Убрать</button>
            <button v-if="!isAdmin && isAuth && !thatBasket" @click="addKorzina" class="button-tovar">Заказать</button>
            <button v-if="isAdmin" @click="removeTovar" class="button-tovar">Удалить</button>
        </div>
    </div> 
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
    props: {
        tovar: {
            type: Object,
            reauired: true,
        },
        thatBasket: Boolean,
    },
    methods: {
        removeTovar() {
            this.setRemoveId(this.tovar.id);
            this.removeProduct();
        },
        ...mapMutations({
            setProducts: 'product/setProducts',
            setRemoveId: 'product/setRemoveId',
            setZakazId: 'basket/setZakazId',
            setRemoveIdBas: 'basket/setRemoveIdBas',
        }),
        ...mapActions({
            removeProduct: 'product/removeProduct',
            addBasketProduct: 'basket/addBasketProduct',
            removeProductBasket: 'basket/removeProductBasket',
        }),
        addKorzina() {
            this.setZakazId(this.tovar.id);
            this.addBasketProduct();
        },
        removeProductBasketT() {
            this.setRemoveIdBas(this.tovar.idBasket);
            this.removeProductBasket();
        },
    },
    computed: {
        ...mapState({
            isAdmin: state => state.adminData.isAdmin,
            products: state => state.product.products,
            isAuth: state => state.auth.isAuth,
            zakazId: state => state.basket.zakazId,
        }),
    },
};
</script>

<style scoped>

.img-tovar {
    width: 300px;
}

.tovar {
    width: 300px;
    padding: 15px;
    background: #DCE6FC; 
    border-radius: 10px;
    margin: 15px;
}

.title-tovar {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 5px;
}

.podpis-tovar {
    font-family: 'Roboto';
    font-size: 18px;
}

.button-tovar {
    font-size: 20px;
    background: #FFA089;
    color: #fff;
    border: 1px solid #FF7538;
    padding: 3px 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 130px;
    transition: all 0.3s ease;
}

.button-parent {
    margin-top: 15px;
    text-align: center;
}

.button-tovar:hover {
    background: #FF6347;
}
</style>