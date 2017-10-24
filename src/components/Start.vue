<template>
    <div class="mx-3">
        <textarea class="w-100" rows="20" v-model="message" placeholder="Input question and answers here"></textarea>
        <button type="button" class="w-100 btn btn-primary btn-lg mt-3" v-on:click="start">Start</button>
    </div>
</template>

<script>
    import QuestionModel from '../models/question';

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
                let messages = vm.message.split('\n');
                let i = 0;
                let questions = [];
                while (i < messages.length) {
                    questions.push(new QuestionModel(messages[i], messages[i + 1]));
                    i += 2;
                    if (i === messages.length) {
                        this.$emit('start', questions);
                    }
                }
            }
        }
    }
</script>

<style>

</style>