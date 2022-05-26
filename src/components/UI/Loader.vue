<template>
    <div class="loader-vid"></div>
</template>

<script>

export default {
    name: 'loader',
};
</script>

<style scoped>

.loader-vid {
    width: 80px;
    height: 80px;
    border: 5px dotted #42AAFF;
    border-radius: 50%;
    animation: krutilka 1.5s infinite linear;
}

@keyframes krutilka {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>
