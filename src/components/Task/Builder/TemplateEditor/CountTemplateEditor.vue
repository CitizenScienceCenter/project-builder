<template>
  <div>

    <h3 class="subheading">Question</h3>

    <div class="form-field form-field-block">
      <growing-textarea v-model="question" placeholder="E.g. How many people can you see in the image?"></growing-textarea>
      <span v-if="validated && validFeedback" class="message success">{{validFeedback}}</span>
      <span v-if="!validated && invalidFeedback" class="message error">{{invalidFeedback}}</span>
    </div>

    <div class="button-group right-aligned">
      <button class="button button-primary" @click="onSubmit" :disabled="isFirstInteraction || !validated">Done</button>
    </div>


    <!--

    <br>
    <br>
    <br>

    <h3>Question</h3>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
              :valid-feedback="validFeedback"
              :invalid-feedback="invalidFeedback"
              :state="validated">
        <b-input v-model="question" placeholder="E.g. How many people can you see in the image?"></b-input>
      </b-form-group>
      <b-button type="submit" size="lg" variant="success">I'm good to go</b-button>
    </b-form>
    -->


  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import GrowingTextarea from "@/components/shared/GrowingTextarea";

export default {
  name: 'JobCountEditor',
  components: {GrowingTextarea},
  created () {
    if (typeof this.task.template === 'string') {
      this.question = this.task.template
    }
  },
  data: () => {
    return {
      maxNbCharacters: 75,
      question: '',
      isFirstInteraction: true
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskTemplate', 'setStep'
    ]),
    ...mapMutations('notification', [
      'showError'
    ]),

    onSubmit () {
      this.isFirstInteraction = false

      if (this.validated) {
        this.setTaskTemplate(JSON.parse(JSON.stringify(this.question)))
        this.setStep({ step: 'template', value: true })
      } else {
        this.showError({ title: 'Incomplete form', content: 'You have to provide a correct question' })
      }
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
    ]),

    validFeedback () {
      return this.maxNbCharacters - this.question.length + ' characters left'
    },
    invalidFeedback () {
      return this.question.length > 0 ? 'Too many characters in the question' : 'The question should not be empty'
    },
    validated () {
      return (this.isFirstInteraction || this.question.length > 0) && this.question.length <= this.maxNbCharacters
    }
  },
  watch: {
    question () {
      this.isFirstInteraction = false
    }
  }
}
</script>

<style scoped>

</style>
