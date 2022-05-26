<template>
    <div class="container">
        <button v-if="isAdmin" @click="showModal" class="knop-add-tovar">Добавить товар?</button>
    </div>
    <my-modal v-model:show="isModal">
        <div class="content-modal">
            <img @click="closeModalCreate" src="@/img/close.png" alt="close" class="krestik">
            <div class="title-modal">Чтобы зодать товар, необходимо заполнить все поля и добавить картинку</div>
            <my-input :model-value="title" @update:model-value="setTitle" placeholder="Введите название" class="input-modal"></my-input>
            <my-input :model-value="kolvo" @update:model-value="setKolvo" placeholder="Введите количество" class="input-modal"></my-input>
            <my-input :model-value="cena" @update:model-value="setCena" placeholder="Введите цену в рублях" class="input-modal"></my-input>
            <my-input :model-value="kal" @update:model-value="setKal" placeholder="Введите калорийность в Ккал" class="input-modal"></my-input>
            <button @click="upload" class="knop-upload">Загрузить изображение</button>
            <div class="block-text-img">
                <div class="text-img">Размер изображения должен</div>
                <div class="text-img">быть 1920x1080</div>
            </div>
            <input ref="imgInput" @change="changeOneImg" type="file" style="display: none;" accept="image/*">
            <img :src="imgSrc" alt="fotoProducta" v-if="imgSrc" class="img-modal">
            <button-modal :disabled="!imgSrc || !title || !kolvo || !cena || !kal" @click="sendProductAndImg" class="btn-create">Создать товар</button-modal>
        </div>
    </my-modal>

    <poisk
        @search="searchPoisk"
    >
    </poisk>
    <div v-if="!isLoading" class="container">
        <div class="parent-menu">
            <div class="menu-tovarov">
            <tovar 
                v-for="tovar in searchedTovar"
                :tovar="tovar"
                :key="tovar.id"
            >
            </tovar>
            </div>
        </div>
    </div>
    <loader v-if="isLoading" class="position-loader"></loader>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Poisk from '@/components/Poisk.vue';
import Tovar from '@/components/Tovar.vue';
import MyModal from '@/components/MyModal.vue';

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
    components: {
        Navbar, Poisk, Tovar, MyModal,
    },
    data() {
        return {
            search: '',
            isModal: false,
            isDisabled: false,
        };
    },
    methods: {
        searchPoisk(poisk) {
            this.search = poisk;
        },
        showModal() {
            this.isModal = true;
        },
        ...mapMutations({
            setProducts: 'product/setProducts',
            setImg: 'product/setImg',
            setImgSrc: 'product/setImgSrc',
            setTitle: 'product/setTitle',
            setCena: 'product/setCena',
            setKolvo: 'product/setKolvo',
            setKal: 'product/setKal',
            setId: 'product/setId',
            setIsLoading: 'product/setIsLoading',
        }),
        ...mapActions({
            createProduct: 'product/createProduct',
            getProducts: 'product/getProducts',
        }),
        upload() {
            this.$refs.imgInput.click();
        },
        changeOneImg(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.setImgSrc(reader.result);
            };
            this.setImg(file);
        },
        closeModalCreate() {
            this.isModal = false;
        },
        sendProductAndImg() {
            this.createProduct();
        },
    }, 
    computed: {
        searchedTovar() {
            return this.products.filter(tovar => tovar.title.toLowerCase().includes(this.search.toLowerCase()));
        },
        ...mapState({
            products: state => state.product.products,
            img: state => state.product.img,
            imgSrc: state => state.product.imgSrc,
            title: state => state.product.title,
            kolvo: state => state.product.kolvo,
            cena: state => state.product.cena,
            kal: state => state.product.kal,
            id: state => state.product.id,
            isAdmin: state => state.adminData.isAdmin,
            isLoading: state => state.product.isLoading,
        }),
    },
    mounted() {
        this.getProducts();
    },
};

</script>


<style scoped>
.menu-tovarov {
    display: flex;
    flex-wrap: wrap;
    width: 1080px;
    margin: 0 auto;
}

.parent-menu {
    text-align: center;
}

.knop-add-tovar {
    background: #fff;
    font-family: 'Roboto';
    color: #000;
    font-size: 23px;
    border: 2px solid #7FC7FF;
    border-radius: 15px;
    padding: 3px 8px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
}

.knop-add-tovar:hover {
    color: #7FC7FF;
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
    margin-top: -25px;
}

.input-modal {
    margin-top: 15px;
}

.knop-upload {
    background: #7FC7FF;
    font-family: 'Roboto';
    font-size: 18px;
    cursor: pointer;
    border-radius: 7px;
    padding: 5px 3px;
    border: 2px solid #7FC7FF;
    margin-top: 15px;
    color: #000;
}

.img-modal {
    width: 300px;
    margin: 15px 15px 0 0;
}

.btn-create {
    margin-top: 20px;
}

.block-text-img {
    display: inline-block;
    transform: translateY(7px);
    margin-left: 10px;
}

.text-img {
    font-family: 'Roboto';
    font-size: 14px;
    width: 200px;
    color: #909090;
}

.position-loader {
    margin: 0 auto;
    margin-top: 230px;
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
    .menu-tovarov {
        width: 960px;
        justify-content: center;
    }
}

@media screen and (max-width: 991px) {
    .container {
        width: 720px;
    }
    .menu-tovarov {
        width: 720px;
    }
}

@media screen and (max-width: 767px) {
    .container {
        width: 540px;
    }
    .menu-tovarov {
        width: 540px;
    }
}

@media screen and (max-width: 575px) {
    .container {
        width: 90%;
    }
    .menu-tovarov {
        width: 90%;
    }
    .tovar {
        transform: scale(90%);
    }
}

</style>