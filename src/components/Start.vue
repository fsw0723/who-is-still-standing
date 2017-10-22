<template>
    <div class="mx-3">
        <textarea class="w-100" rows="20" v-model="message" placeholder="Input question and answers here"></textarea>
        <button type="button" class="w-100 btn btn-primary btn-lg mt-3" v-on:click="start">Start</button>
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
                let vm = this;
                this.$emit('start', vm.message);
            }
        }
    }
</script>

<style>

</style>