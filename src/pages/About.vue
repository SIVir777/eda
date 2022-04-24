<template>
    <div class="container">
        <h3 class="title-about">Почему стоит заказать:</h3>
        <div>
            <ul class="menu-kruto">
                <li>Быстрая доставка</li>
                <li>Всегда свежая еда</li>
                <li>Умеренные цены</li>
                <li>Высокое качество</li>
                <li>Болшой выбор</li>
            </ul>
        </div>
        <hr>
        <div>
            <img src="@/img/imgpovar.jpg" alt="we-work" class="img-povara">
        </div>
        <hr>
        <div>
            <h3 class="title-about title-o-nas">Немного о нас:</h3>
            <p class="text-o-nas">
                <span class="otstup">Работаем</span> в этой сфере более 5 лет. Участвовали в различных конкурсах
                по кулинарии, выигравали призовые места. Принимали участи в зарубежных
                конкурсах. Наши работники профессионалы своего дела с опытом работы
                более 5 лет. Для нас качество продукции превыше всего: наша еда
                содержит только свежие, настоящие продукты. Приятного вам аппетита.
            </p>
        </div>
    </div>
</template> 
<script>
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Navbar,
    },
};
</script>

<style scoped>
.title-about {
    margin-top: 15px;
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: 400;
}

.menu-kruto {
    font-family: "Roboto";
    margin-top: 5px;
    margin-left: 20px;
    font-size: 21px;
    margin-bottom: 30px;
}

.menu-kruto li {
    margin-bottom: 5px;
}

.img-povara {
    width: 100%;
}

.title-o-nas {
    margin-top: 15px;
}

.text-o-nas {
    font-family: 'Roboto';
    font-size: 21px;
    text-align: justify;
    margin-top: 5px;
    margin-bottom: 57px;
}

.otstup {
    margin-left: 15px;
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
</style>