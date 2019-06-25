// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row v-if="pybossa.userProgressInPercent < 100">
      <b-col md="4">
        <b-form-group :key="key" v-for="(question, key) in questions" :label="question.question" label-size="lg">
        
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
        
        <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ task.id }}</b-badge></p>
        <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from <b-badge variant="primary">{{ pybossa.userProgress.total }}</b-badge></p>
          
        <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
      </b-col>
      <b-col md="8" class="mt-4 mt-md-0">
        <audio v-if="taskInfo.audio_url" :src="taskInfo.audio_url" controls></audio>
        <div v-else-if="taskInfo.embed" v-html="taskInfo.embed"></div>
        <b-alert v-else :show="true" variant="danger">Audio media not available</b-alert>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
      </b-col>
    </b-row>`,

    data: {
      questions: [
        {
          question: 'What kind of music do you hear?',
          answers: [
            'Rock',
            'Jazz',
            'Electro',
            'Hip-Hop'
          ]
        },
        {
          question: 'What is your tempo estimation?',
          answers: [
            '< 50bpm',
            'Between 50 and 100bpm',
            'Between 100 and 200bpm',
            '> 200bpm'
          ]
        }
      ],
      answers: [],
      showAlert: false
    },

    methods: {
      submit () {
        if (this.isFormValid()) {
          this.pybossa.saveTask(this.answers)
          this.showAlert = false
          this.answers = []
          this.questions.forEach(() => this.answers.push(null))
        } else {
          this.showAlert = true
        }
      },
      isFormValid () {
        return this.answers.length === this.questions.length && !this.answers.some(el => typeof el === 'undefined' || el == null)
      }
    },

    computed: {
      task () {
        return this.pybossa.task
      },
      taskInfo () {
        return this.task.info
      }
    },

    created () {
      this.questions.forEach(() => this.answers.push(null))
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
