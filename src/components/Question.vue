<template>
    <div>
        <div class="my-5">
            <h1>{{question.subject}}</h1>
        </div>

        <div v-if="isAnswerShown" class="my-3">
            <h3>Answer: {{question.answer}}</h3>
        </div>
        <button v-if="!isAnswerShown" v-on:click="showAnswer" type="button" class="w-100 btn btn-primary">Show Answer</button>
        <div class="w-100 d-inline-flex p-2 justify-content-center">
            <button v-if="isAnswerShown" v-on:click="correct" type="button" class="btn btn-success mx-2">Correct</button>
            <button v-if="isAnswerShown" v-on:click="wrong" type="button" class="btn btn-danger mx-2">Wrong</button>
        </div>
    </div>
</template>

<script>
    import EventBus from '../event-bus';


    export default {
        name: 'app',
        props: ['question'],
        data () {
            return {
                isAnswerShown: false
            }
        },
        methods: {
            correct: function () {
                this.isAnswerShown = false;
                EventBus.$emit('correct-answer');
            },
            wrong: function () {
                this.isAnswerShown = false;
                EventBus.$emit('wrong-answer');
            },
            showAnswer: function () {
                this.isAnswerShown = true;
            }
        }
    }
</script>

<style lang="scss">
    h1, h2, h3 {
        text-align: center;
    }

</style>
