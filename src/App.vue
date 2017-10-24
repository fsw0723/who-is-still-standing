<template>
    <div id="app">
        <div v-if="mode">
            <Game :mode="mode"/>
        </div>
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
    import Game from './components/Game.vue';

    export default {
        name: 'app',
        components: {
            Game
        },
        data () {
            return {
                mode: null
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
