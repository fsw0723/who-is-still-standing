<template>
    <b-row id="app">
        <b-col cols="2"></b-col>
        <b-col cols="8">
            <div v-if="currentQuestion">
                <div v-if="questions.length === 0">
                    Game ended! Your score is: {{score}}
                </div>
                <div v-else>
                    <button v-if="!pause" v-on:click="pauseTimer">Pause</button>
                    <button v-if="pause" v-on:click="resumeTimer">Resume</button>
                    <div>
                        Score: {{score}}
                    </div>
                    <div>
                        Time Left: {{timeLeft}}
                    </div>
                    <div>Question number: {{questionCount}}</div>
                    <div>
                        {{currentQuestion.subject}}
                    </div>
                    <div v-if="isAnswerShown">
                        {{currentQuestion.answer}}
                    </div>
                    <button v-if="!isAnswerShown" v-on:click="showAnswer">Show Answer</button>
                    <button v-if="isAnswerShown" v-on:click="correct">Correct</button>
                    <button v-if="isAnswerShown" v-on:click="wrong">Wrong</button>
                </div>
            </div>
            <div v-else>
                <Start/>
            </div>
        </b-col>
        <b-col cols="2"></b-col>

    </b-row>
</template>

<script>
    import Question from './Question';

    import Start from './components/Start.vue';

    export default {
        name: 'app',
        components: {
            Start
        },
        data () {
            return {
                questions: [],
                currentQuestion: null,
                isAnswerShown: false,
                score: 0,
                pause: false,
                message: null,
                interval: null,
                timeLeft: 20,
                questionCount: 0
            }
        },
        methods: {
            start: function () {
                let vm = this;
                let messages = this.message.split('\n');
                let i = 0;
                while (i < messages.length) {
                    vm.questions.push(new Question(messages[i], messages[i + 1]));
                    i += 2;
                    if (i === messages.length) {
                        this.newQuestion();
                    }
                }

            },
            newQuestion: function () {
                let vm = this;
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }

                if (this.questions.length > 0) {
                    let index = Math.floor(Math.random() * this.questions.length);
                    this.currentQuestion = this.questions[index];
                    this.isAnswerShown = false;
                    this.timeLeft = 20;
                    this.questionCount ++;
                    vm.interval = setInterval(function() {
                        vm.timeLeft --;
                        if (vm.timeLeft === 0) {
                            vm.questions.splice(index, 1);
                            vm.newQuestion();
                        }
                    }, 1000);
                }
            },
            correct: function () {
                this.score++;
                this.questions.splice(this.questions.indexOf(this.currentQuestion), 1);
                this.newQuestion();
            },
            wrong: function () {
                this.questions.splice(this.questions.indexOf(this.currentQuestion), 1);
                this.newQuestion();
            },
            pauseTimer: function () {
                this.pause = true;
                clearInterval(this.interval);
                this.interval = null;
            },
            resumeTimer: function () {
                this.pause = false;
                let vm = this;
                vm.interval = setInterval(function() {
                    vm.timeLeft --;
                    if (vm.timeLeft === 0) {
                        vm.questions.splice(vm.questions.indexOf(vm.currentQuestion), 1);
                        vm.newQuestion();
                    }
                }, 1000);
            },
            showAnswer: function () {
                this.isAnswerShown = true;
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
