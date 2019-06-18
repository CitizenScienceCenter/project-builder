<template>
  <div>
    <div class="clearfix">
      <h3 class="float-left">Question</h3>
      <b-btn @click="addQuestion" class="float-right">Add Question</b-btn>
    </div>

    <b-row>
      <b-col>
        <b-tabs content-class="mt-4">
          <b-tab :key="questionKey" v-for="(question, questionKey) in questions" :title="'Question ' + (questionKey + 1)" active>

            <b-form-group
                    :label="'Question ' + (questionKey + 1)"
                    :valid-feedback="validQuestionFeedback(question.question)"
                    :invalid-feedback="invalidQuestionFeedback(question.question)"
                    :state="questionValidated(question.question)">

              <b-input v-model="question.question"></b-input>
              <b-btn @click="deleteQuestion(questionKey)" v-if="questions.length > 1" variant="danger" size="sm" class="float-right mt-1 mb-1">Delete question</b-btn>

            </b-form-group>

            <b-form-group
                    :key="answerKey"
                    v-for="(answer, answerKey) in question.answers"
                    :label="'Answer ' + (answerKey + 1)"
                    :valid-feedback="validAnswerFeedback(answer)"
                    :invalid-feedback="invalidAnswerFeedback(answer)"
                    :state="answerValidated(answer)">

              <b-input v-model="question.answers[answerKey]"></b-input>
              <b-btn @click="deleteAnswer(question, answerKey)" v-if="question.answers.length > 2" variant="danger" size="sm" class="float-right mt-1 mb-1">Delete answer</b-btn>

            </b-form-group>

            <b-btn @click="addAnswer(question)" class="float-right ">Add answer</b-btn>
          </b-tab>
        </b-tabs>

        <b-btn @click="onSubmit" variant="success" size="lg" class="mt-4">I'm good to go</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'JobClassifyEditor',
  created () {
    if (Array.isArray(this.task.template)) {
      // deep clone
      this.questions = JSON.parse(JSON.stringify(this.task.template))
    }
  },
  data: () => {
    return {
      maxNbCharactersQuestions: 75,
      maxNbCharactersAnswers: 15,
      questions: [
        {
          question: '',
          answers: [
            '', ''
          ]
        }
      ]
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskTemplate', 'setStep'
    ]),
    ...mapMutations('notification', [
      'showError'
    ]),

    addQuestion () {
      this.questions.push({
        question: '',
        answers: [
          '', ''
        ]
      })
    },
    deleteQuestion (key) {
      if (this.questions.length > 1) {
        this.questions.splice(key, 1)
      }
    },
    addAnswer (question) {
      question.answers.push('')
    },
    deleteAnswer (question, key) {
      if (question.answers.length > 2) {
        question.answers.splice(key, 1)
      }
    },

    onSubmit () {
      if (this.isFormValid()) {
        // clone the content
        this.setTaskTemplate(JSON.parse(JSON.stringify(this.questions)))
        this.setStep({ step: 'template', value: true })
      } else {
        this.showError({ title: 'Incomplete form', content: 'Some fields are not validated' })
      }
    },

    isFormValid () {
      let countInvalidQuestions = 0
      let countInvalidAnswers = 0

      for (let question of this.questions) {
        if (!this.questionValidated(question.question)) {
          countInvalidQuestions++
        }

        for (let answer of question.answers) {
          if (!this.answerValidated(answer)) {
            countInvalidAnswers++
          }
        }
      }

      return countInvalidQuestions === 0 && countInvalidAnswers === 0
    },

    validQuestionFeedback (question) {
      return this.maxNbCharactersQuestions - question.length + ' characters left'
    },
    invalidQuestionFeedback (question) {
      return question.length > 0 ? 'Too many characters in this question' : 'The question should not be empty'
    },
    questionValidated (question) {
      return question.length > 0 && question.length <= this.maxNbCharactersQuestions
    },

    validAnswerFeedback (answer) {
      return this.maxNbCharactersAnswers - answer.length + ' characters left'
    },
    invalidAnswerFeedback (answer) {
      return answer.length > 0 ? 'Too many characters in this answer' : 'The answer should not be empty'
    },
    answerValidated (answer) {
      return answer.length > 0 && answer.length <= this.maxNbCharactersAnswers
    }
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'jobs'
    ])
  }
}
</script>

<style scoped>

</style>
