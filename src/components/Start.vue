<template>
    <div>
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
        <button v-on:click="start">Start</button>
    </div>
</template>

<script>
    export default {
        name: 'start',
        data() {
            return {
                message: null
            }
        },
        methods: {
            start: function() {
                this.$emit('start');
            }
        }
    }
</script>

<style>

</style>