<template>
    <div class="player-section">
        <h3 class="mb-5">
            {{player.name}}
        </h3>
        <h4>
            Score: {{player.score}}
        </h4>

        <div v-if="player.shouldAnswer" class="text-primary my-3">
            Please answer
        </div>
    </div>
</template>

<script>
    export default {
        name: 'player',
        props: ['player'],
        data() {
            return {

            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .player-section {
        text-align: center;
    }

</style>