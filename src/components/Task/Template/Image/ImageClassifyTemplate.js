// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row>
      <b-col md="6">
      
        <b-form-group :key="key" v-for="(question, key) in questions" :label="question.question">
        
          <b-form-radio-group 
            v-model="answers[key]"
            buttons
            button-variant="outline-primary"
            :options="question.answers">
          </b-form-radio-group>
          
        </b-form-group>
        
        <b-btn @click="submit" variant="success">Submit</b-btn>
        <b-alert variant="danger" v-model="showAlert" class="mt-2" dismissible>
          You must complete the form to submit
        </b-alert>
        
        <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ pybossa.task.id }}</b-badge></p>
        <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from</p>
          
        <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
      </b-col>
      <b-col md="6">
        <b-img thumbnail fluid-grow :src="pybossa.task.info.url_b"></b-img>
      </b-col>
    </b-row>`,

    data: {
      questions: [
        {
          question: '',
          answers: [
            ''
          ]
        }
      ],
      answers: [],
      showAlert: false
    },

    methods: {
      submit () {
        if (this.isFormValid()) {
          console.log(this.answers)
          this.showAlert = false
          this.pybossa.saveTask(this.answers)
        } else {
          this.showAlert = true
        }
      },
      isFormValid () {
        return this.answers.length === this.questions.length
      }
    },

    mounted () {
      this.pybossa.run()
    },

    props: {
      /* Injected by the Pybossa App */
      pybossa: {
        required: true
      }
    }
  }

export default component
