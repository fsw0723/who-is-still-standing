<template>
    <div id="app">
        <header>
            <h1>谁是老大</h1>
        </header>
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
    @import './variables';

    $text-color: #484848;

    #app {
        font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $text-color;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 108px 0 48px 0;
    }

    h1, h2, h3 {
        text-align: center;
    }

    header {
        background: #29ABA4;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 12px 24px;
        color: white;
    }

    .mode-selector__item {
        border: 1px solid $border-color;
        border-radius: 8px;
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
