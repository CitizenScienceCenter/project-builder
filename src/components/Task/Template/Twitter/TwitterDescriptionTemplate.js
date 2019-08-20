// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row v-if="pybossa.userProgressInPercent < 100">
      <!-- Form zone -->
      <b-col md="6" class="mt-4 mt-md-0 order-2 order-md-1">
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
      
      <!-- Tweet -->
      <b-col md="6" class="order-1 order-md-2">
      
        <h5 v-if="taskInfo.user && taskInfo.user.name">From: {{ taskInfo.user.name }}</h5>
        <p><i>{{ taskInfo.text }}</i></p>
        
        <!-- Display urls if available -->
        <ul v-if="taskInfo.entities && taskInfo.entities.urls">
          <li v-for="link in taskInfo.entities.urls"><a :href="link.url" target="_blank">{{ link.url }}</a></li>
        </ul>
      
        <!-- Display picture if available -->
        <div v-if="taskInfo.entities && taskInfo.entities.media && taskInfo.entities.media.length > 0" class="text-center">
          <div v-if="pybossa.taskLoaded">
            <b-img fluid-grow :src="taskInfo.entities.media[0].media_url_https" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
          </div>
          <b-spinner v-else style="width: 4rem; height: 4rem;" variant="primary" label="Image loading..."></b-spinner>
        </div>
        
      </b-col>
    </b-row>
    
    <b-row v-else>
      <b-col>
        <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
      </b-col>
    </b-row>`,

    data: {
      question: 'Describe the picture',
      descriptions: [
        'Write your picture description here'
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

    computed: {
      task () {
        return this.pybossa.task
      },
      taskInfo () {
        return this.task.info
      }
    },

    created () {
      this.descriptions.forEach(() => this.answers.push(''))
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
