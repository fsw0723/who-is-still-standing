<template>
    <div class="mx-3">
        <div>
            <mu-radio label="百科知识问答1" name="group" nativeValue="百科知识问答1" v-model="inputFile" class="demo-radio"/> <br/>
            <mu-radio label="测试" name="group" nativeValue="test" v-model="inputFile"  class="demo-radio"/> <br/>
        </div>
        <textarea class="w-100" rows="20" v-model="message" placeholder="Input question and answers here"></textarea>
        <button type="button" class="w-100 btn btn-primary btn-lg mt-3" v-on:click="start">Start</button>
        <!--<input type="file" @change="handleUpload"/>-->
    </div>
</template>

<script>
    import QuestionModel from '../models/question';
    import FileReader from 'filereader';
    import axios from 'axios';


    export default {
        name: 'start',
        data() {
            return {
                message: null,
                inputFile: null
            }
        },
        methods: {
            handleUpload: function(e){
                var files =  e.target.files;
                var reader = new window.FileReader();
                reader.addEventListener('load', function(){
                    console.log(reader.result);
                });
                reader.readAsText(files[0]);
            },
            start: function() {
                let vm = this;
                if (vm.message) {
                    vm.processQuestions();
                } else if (this.inputFile) {
                    axios.get(`/static/${vm.inputFile}.txt`).then(response => {
                        vm.message = response.data;
                        vm.processQuestions();
                    }, response => {
                        // error callback
                    });
                }
            },
            processQuestions: function() {
                let vm = this;
                let messages = vm.message.split('\n');
                let i = 0;
                let questions = [];
                while (i < messages.length) {
                    console.log(i);
                    questions.push(new QuestionModel(messages[i], messages[i + 1]));
                    i += 2;
                    if (i === messages.length) {
                        console.log('start');
                        this.$emit('start', questions);
                    }
                }
            },
        }
    }
</script>

<style>

</style>