<template>
  <div>
    <h1 class="left">Driver Knowledge Practice Test</h1>
    <h3 class="left">(52 Questions)</h3>
    <button class="left" v-if="questionsLoaded && !started && !done" v-on:click="start()">Start</button>
    <question v-if="started && !done" v-bind:question="questionList[questionNumber]" @correct="increaseScore()" @incorrect="nextQuestion()"/>
    <p v-if="done" class="left">Your got {{correct}} out of {{questionList.length - 1}}</p>
    <button class="left" v-if="started && done" v-on:click="restart()">Try Again</button>
  </div>
</template>

<script>
import Question from './components/Question.vue'
console.log(`process.env.VUE_APP_QUESTION_URL=${process.env.VUE_APP_QUESTION_URL}`);

export default {
  name: 'App',
  data() {
    return {
    started: false,
    correct: 0,
    questionNumber: 0,
    questionList: [],
    done: false,
    questionsUrl: process.env.VUE_APP_QUESTION_URL || 'https://quiz.jonfleming.net/questions',
    }
  },
  components: {
    Question
  },
  computed: {
    questionsLoaded() {
      return this.questionList.length > 0;
    }
  },
  methods: {
    start() {
      this.started = true;
      this.restart();
    },
    restart() {
      this.correct = 0;
      this.questionNumber = 1;
      this.done = false;
    },
    readQuestions() {
      this.axios.get(this.questionsUrl).then(response => {
        this.questionList = response.data[0]});
    },
    increaseScore() {
      console.log('increasing score');
      this.correct++;
      this.nextQuestion();
    },
    nextQuestion() {
      this.questionNumber++;

      if (this.questionNumber == this.questionList.length) {
        this.done = true;
      }
    }
  },
  mounted: function() {
    console.log('Reading Questions');
    this.readQuestions();      
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.left {
  text-align: left;
  float:left;
  font-size: 24px;
}
</style>
