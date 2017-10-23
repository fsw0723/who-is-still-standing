<template>
    <div id="app">
        <b-row v-if="mode">
            <b-col cols="3">
                <Player :player="player1" v-if="mode==='battle'"/>
            </b-col>
            <b-col cols="6">
                <div v-if="currentQuestion">
                    <div v-if="questions.length === 0">
                        Game ended! Your score is: {{score}}
                    </div>
                    <div v-else>
                        <div>
                            Time Left: {{timeLeft}}
                            <button v-if="!pause" v-on:click="pauseTimer" type="button" class="btn btn-danger">Pause</button>
                            <button v-if="pause" v-on:click="resumeTimer" type="button" class="btn btn-success">Resume</button>
                        </div>
                        <b-row align-h="between" class="my-3">
                            <b-col cols="6">Question number: {{questionCount}}</b-col>
                            <b-col cols="4">Score: {{score}}</b-col>
                        </b-row>
                        <Question :question="currentQuestion"/>
                    </div>
                </div>
                <div v-else>
                    <Start @start="start"></Start>
                </div>
            </b-col>
            <b-col cols="3">
                <Player :player="player2" v-if="mode==='battle'"/>
            </b-col>
        </b-row>
        <div v-else class="d-flex justify-content-center mode-selector">
            <div v-on:click="mode='single'" class="mode-selector__item">
                <img src="./assets/one-person.png" class="img-fluid"/>
                Single
            </div>
            <div v-on:click="mode='battle'" class="mode-selector__item">
                <img src="./assets/two-person.png" class="img-fluid"/>
                Battle
            </div>
        </div>

    </div>
</template>

<script>
    import QuestionModel from './models/question';
    import PlayerModel from './models/player';

    import Start from './components/Start.vue';
    import Player from './components/Player.vue';
    import Question from './components/Question.vue';

    import EventBus from './event-bus';

    const QUESTION_TIME = 20;

    export default {
        name: 'app',
        components: {
            Start,
            Player,
            Question
        },
        created() {
            this.player1 = new PlayerModel('王呆子');
            this.player2 = new PlayerModel('方聪明');
        },
        mounted() {
            let vm = this;
            window.onkeyup = function(e) {
                if (vm.currentQuestion && !vm.currentPlayer) {
                    var key = e.keyCode ? e.keyCode : e.which;
                    if (key === 83) {
                        //keyboard press S
                        console.log('current player1');
                        vm.currentPlayer = vm.player1;
                        vm.player1.setShouldAnswer(true);
                    } else if (key === 76) {
                        //keyboard press L
                        console.log('current player2');
                        vm.currentPlayer = vm.player2;
                        vm.player2.setShouldAnswer(true);
                    }
                }
            };

            EventBus.$on('new-question', function() {
                vm.newQuestion();
            });

            EventBus.$on('correct-answer', function() {
                vm.correct();
            });

            EventBus.$on('wrong-answer', function() {
                vm.wrong();
            });
        },
        data () {
            return {
                mode: null,
                questions: [],
                currentQuestion: null,
                score: 0,
                pause: false,
                message: null,
                interval: null,
                timeLeft: QUESTION_TIME,
                questionCount: 0,
                player1: null,
                player2: null,
                currentPlayer: null
            }
        },
        methods: {
            start: function (message) {
                let vm = this;
                let messages = message.split('\n');
                let i = 0;
                while (i < messages.length) {
                    vm.questions.push(new QuestionModel(messages[i], messages[i + 1]));
                    i += 2;
                    if (i === messages.length) {
                        this.newQuestion();
                    }
                }

            },
            newQuestion: function () {
                let vm = this;
                this.resetQuestion();

                if (this.questions.length > 0) {
                    let index = Math.floor(Math.random() * this.questions.length);
                    this.currentQuestion = this.questions[index];
                    this.timeLeft = QUESTION_TIME;
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
                if (this.currentPlayer) {
                    this.currentPlayer.addScore();
                }
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
            resetQuestion: function() {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
                this.currentPlayer = null;
                this.player1.setShouldAnswer(false);
                this.player2.setShouldAnswer(false);

            }
        }
    }
</script>

<style lang="scss">
    $text-color: #777;

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2, h3 {
        text-align: center;
    }

    .mode-selector__item {
        border: 1px solid $text-color;
        background: white;
        width: 160px;
        text-align: center;
        margin: 12px;
        font-size: 20px;
        color: $text-color;
        cursor: pointer;

        &:hover {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            transition: 0.5s ease;
             box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
        }
    }

</style>
