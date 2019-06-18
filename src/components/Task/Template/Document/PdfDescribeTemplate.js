// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
      <b-row v-if="pybossa.userProgressInPercent < 100">
        <b-col md="4">
          <h2>{{ question }}</h2>
    
           <b-textarea v-model="description" placeholder="You description..."  rows="10"></b-textarea>
           <b-button @click="answer(description)" variant="primary" class="mt-2">Submit</b-button>
          
          <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ pybossa.task.id }}</b-badge></p>
          <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from</p>
          
          <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
        </b-col>
        <b-col md="8" class="mt-4 mt-md-0">
           <pdf
              v-if="pybossa.task.info && pybossa.task.info.pdf_url && pybossa.task.info.page.length > 0"
              style="border: 1px solid black"
              class="w-100"
              :src="pybossa.task.info.pdf_url"
              :page="parseInt(pybossa.task.info.page)"></pdf>
          <b-alert v-else :show="true" variant="danger">Pdf not available</b-alert>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
        </b-col>
      </b-row>`,

    /* All template data */
    data: {
      question: '',
      description: ''
    },

    methods: {
      answer (answer) {
        this.pybossa.saveTask(answer)
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
