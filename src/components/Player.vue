<template>
    <div>
        <div>
            {{player.score}}
        </div>
        <div>
            {{player.name}}
        </div>

        <div v-if="player.shouldAnswer">Please answer</div>
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

<style>

</style>