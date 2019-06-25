// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row v-if="pybossa.userProgressInPercent < 100">
      <!-- Form zone -->
      <b-col md="4">
        <h2>{{ question }}</h2>
  
        <b-form-group
            :key="index"
            v-for="(description, index) in descriptions"
            :label="description"
            label-size="lg"
            :state="isFieldValid(answers[index])"
            invalid-feedback="This field is required"
            class="mt-4"
          >
          <b-form-textarea v-model="answers[index]" rows="10"></b-form-textarea>
        </b-form-group>
       
        <b-button @click="submit" variant="primary" class="mt-2">Submit</b-button>
        
        <b-alert variant="danger" v-model="showAlert" class="mt-2" dismissible>
          You must complete the form to submit
        </b-alert>
        
        <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ task.id }}</b-badge></p>
        <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from <b-badge variant="primary">{{ pybossa.userProgress.total }}</b-badge></p>
        
        <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
      </b-col>
      <!-- Media -->
      <b-col md="8" class="mt-4 mt-md-0">
        <b-embed v-if="taskInfo.video_url" type="iframe" allowfullscreen :src="taskInfo.video_url"></b-embed>
        <div v-else-if="taskInfo.oembed" v-html="taskInfo.oembed"></div>
        <b-alert v-else :show="true" variant="danger">Video media not available</b-alert>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
      </b-col>
    </b-row>`,

    data: {
      question: 'What do you see on this video ?',
      descriptions: [
        'Write your description here'
      ],
      answers: [],
      showAlert: false
    },

    methods: {
      submit () {
        if (this.isFormValid()) {
          this.pybossa.saveTask(this.answers)
          this.answers.forEach((el, index, array) => {
            array[index] = ''
          })
          this.showAlert = false
        } else {
          this.showAlert = true
        }
      },
      isFieldValid (field) {
        return field.length > 0
      },
      isFormValid () {
        return !this.answers.some(el => el.length === 0)
      }
    },

    created () {
      this.descriptions.forEach(() => this.answers.push(''))
    },

    mounted () {
      this.pybossa.run()
    },

    computed: {
      task () {
        return this.pybossa.task
      },
      taskInfo () {
        return this.task.info
      }
    },

    props: {
      /* Injected by the Pybossa App */
      pybossa: {
        required: true
      }
    }
  }

export default component
