<template>
    <div id="app">
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
            <textarea v-model="message" placeholder="add multiple lines"></textarea>
            <button v-on:click="start">Start</button>
        </div>
    </div>
</template>

<script>
    import Question from './Question';

    function Timer(callback, delay) {
        var timerId, start, remaining = delay;

        this.pause = function () {
            console.log('pause timer');
            window.clearTimeout(timerId);
            remaining -= new Date() - start;
        };

        this.resume = function () {
            console.log('resume timer');
            start = new Date();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.resume();
    }

    export default {
        name: 'app',
        data () {
            return {
                questions: [],
                currentQuestion: null,
                isAnswerShown: false,
                score: 0,
                pause: false,
                timer: null,
                message: null
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
                if (this.questions.length === 0 && this.timer) {
                    this.timer.pause();
                    this.timer = null;
                } else if (this.questions.length > 0) {
                    let index = Math.floor(Math.random() * this.questions.length);
                    this.currentQuestion = this.questions[index];
                    this.isAnswerShown = false;
                    this.timer = new Timer(function () {
                        vm.questions.splice(index, 1);
                        vm.newQuestion();
                    }, 5000);
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
                this.timer.pause();
            },
            resumeTimer: function () {
                this.pause = false;
                this.timer.resume();
            },
            showAnswer: function () {
                this.isAnswerShown = true;
                this.timer.pause();
                this.timer = null;
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
