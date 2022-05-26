<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input">
</template>

<script>

export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value);
        },
    },
};
</script>

<style scoped>

.input {
    width: 436px;
    padding: 10px 5px;
    font-size: 17px;
    border-radius: 5px;
    outline: none;
    border: 2px solid #7FC7FF;
}

</style>