<template>
  <div class="home">
    <div v-show="show">
      <div v-if='test.length==0' class="many">
        <h2 v-show="step === 1">Welcome to QUIZshow</h2>

        <form @submit.prevent="registerUser" novalidate>

          <!-- <div>
            {{$v.formReg.email.$model}}
          </div> -->

          <div class="registration" v-show="step === 0" >
            <h2 v-show="step === 0">Specify email</h2>

            <input type="email" @blur="$v.formReg.email.$touch()" v-model="formReg.email" placeholder="Email" id='email' autocomplete="off">

            <button type="submit" @click="nextStep()" id="sub" :disabled="disabledBtn">Submit</button>
        </div>
        </form>

        <input class="choise__ques" type="text" @blur='num = $event.target.value' placeholder="How many questions?" v-show="step === 1">
        <button @click='start()' class="start" v-show="step === 1">Start</button>
      </div>
      <div class="box" v-else>
        <div class="user">
          {{$v.formReg.email.$model}}
          <button v-on:click='out()' class="logOut">log out</button>
        </div>
        <div class="row">
          <div class="ques">
            Quesition: {{count+1}}
          </div>
          <div class="corAnswer">
            Correct answers: {{trueAnswer}}
          </div>
        </div>
        <div class="question" v-html="currentTest.question"></div>
        <label v-for='(question,index) of currentTest.incorrect_answers' :key='index' class="answers">
          <input type="radio" name='variant' v-model="variant" :value="question">
          {{question}}
        </label>
        <button @click="next()" class="next">Next question</button>
      </div>
    </div>
    <div v-show='!show'>
      <div>Your correct answers are {{trueAnswer}}</div>
    </div>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        step: 0,
        num: 0,
        show: true,
        count: 0,
        variant: '',
        trueAnswer: 0,
        test: [],
        currentTest: {
          question: '',
          answer: '',
          correct_answer: '',
          incorrect_answers: []
        },
        formReg: {
          email: '',
        }
      }
    },
    computed:{
      disabledBtn(){
        return this.$v.formReg.email.$invalid
      },
    },
    created(){
      if (localStorage.getItem('email')){
        this.formReg.email = localStorage.getItem('email')
        this.step++
      }
    },
    methods: {
      nextStep(){
        this.step++
        localStorage.setItem('email', this.formReg.email)
      },
      out(){
        localStorage.removeItem('email')
        this.step = 0
        this.test = []
        this.formReg.email = ''
      },
      registerUser(){
        console.log('Регистрация прошла успешно');
      },
      shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array
      },
      next() {
        if (this.count < this.num-1) {
          if (this.currentTest.correct_answer == this.variant) this.trueAnswer++
          this.count++
          this.currentTest = this.test[this.count]
          console.log(this.currentTest.correct_answer)
          this.currentTest.incorrect_answers.push(this.currentTest.correct_answer) 
          this.currentTest.incorrect_answers = this.shuffleArray(this.currentTest.incorrect_answers)
          this.variant = ''
        } else {
          this.show = false
        }
      },
      start() {
        axios.get(`https://opentdb.com/api.php?amount=${this.num}&difficulty=medium&type=multiple`)
          .then(response => {
            this.test = response.data.results
            this.currentTest = this.test[0]
            this.currentTest.incorrect_answers.push(this.currentTest.correct_answer) 
            this.currentTest.incorrect_answers = this.shuffleArray(this.currentTest.incorrect_answers)
          })
        },
    },
    validations: {
      formReg: {
        email: {
          required,
          email
        }
      }
    }
  }
</script>
<style lang="scss">
  .home{
    max-width: 450px;
    margin: auto;
    justify-content: center;
    .choise__ques{
      width: 200px;
      height: 25px;
      border-radius: 20px;
      border: 1px solid;
      padding-left: 10px;
      outline: none;
    }
    .user{
      display: flex;
      text-align: center;
      justify-content: center;
      margin-top: 15px;
      font-size: 18px;
      font-weight: bold;
    }
    .logOut{
      margin-left: 15px;
      border: 1px solid;
      border-radius: 10px;
      &:hover{
        background-color: rgb(255, 0, 0);
      }
    }
    .registration{
      margin-bottom: 20px;
      #email{
        width: 200px;
        height: 25px;
        border-radius: 20px;
        border: 1px solid;
        padding-left: 10px;
        outline: none;
      }
      #sub{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 190px;
        margin-top: 10px;
        width: 60px;
        height: 25px;
        border-radius: 10px;
        border: 1px solid;
      }
    }
    .start{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 190px;
      margin-top: 10px;
      width: 60px;
      height: 25px;
      border-radius: 10px;
      border: 1px solid rgb(0, 255, 55);
      &:hover{
        background-color: rgb(0, 255, 55);
        color: #fff;
      }
    }
  }
  .box {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    height: 300px;
    text-align: center;
    background-color: rgb(190, 190, 190);
    margin: auto;
    border-radius: 10px;
    border: 1px solid #000;
    .ques{
      margin-top: 30px;
      margin-left: 10px;
    }
    .corAnswer{
      margin-top: 30px;
      margin-right: 10px;
    }
    .question{
      background-color: rgb(228, 228, 228);
      border-top: 1px solid #000;
      padding-top: 5px;
      font-size: 18px;
      margin-bottom: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
      font-weight: bold;
    }
    .answers{
      margin-left: 15px;
      font-size: 16px;
    }
    .next{      
      margin-top: 15px;
      width: 110px;
      height: 25px;
      margin-left: 170px;
      padding-left: 10px;
      border-radius: 5px;
      border: 1px solid;
      display: block;
    }
  }
  .row {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 20px;  
    justify-content: space-between; 
  }
  label {
    text-align: left;
  }
</style>