<template>
  <div class="question">
    <p class="left">{{question[0]}}. &nbsp; {{question[1]}}</p>
    <ul>
        <li class="left"><input type="radio" id="1" value="1" v-model="answer">{{question[2]}}</li>
        <li class="left"><input type="radio" id="2" value="2" v-model="answer">{{question[3]}}</li>
        <li class="left"><input type="radio" id="3" value="3" v-model="answer">{{question[4]}}</li>
        <li class="left" v-if="question[4].length"><input type="radio" id="4" value="4" v-model="answer">{{question[5]}}</li>
    </ul>
    <button class="left" v-on:click="next()">Next</button>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: {}    
  },
  emits: ['correct', 'incorrect'],
  data() {
    return {
      answer: ''
    }
  },
  methods: {
    next() {
      console.log(`Answer ${this.answer}.  Correct Answer: ${this.question[6]}`);
      if (this.answer == this.question[6]) {
        console.log('emitting correct');
        this.$emit('correct');
      } else {
        console.log('emitting incorrect');
        this.$emit('incorrect');
      }

      this.answer = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  text-align: left;
  margin: 0 10px;
  font-size: 24px;
}
a {
  color: #42b983;
}
</style>
