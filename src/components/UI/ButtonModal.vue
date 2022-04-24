<template>
    <button class="btn-modal">
        <slot></slot>
    </button>
</template>

<script>

export default {
    name: 'button-modal'
}
</script>

<style scoped>

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

</style>
