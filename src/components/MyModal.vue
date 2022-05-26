<template>
    <div class="modal" v-if="show" @click="hideModal">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'my-modal',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false);
        }
    }
};
</script>

<style scoped>
.modal {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;
}

.modal__content {
    width: 550px;
    background: #fff;
    border-radius: 55px;
}
</style>
