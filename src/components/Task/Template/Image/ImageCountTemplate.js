// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
      <b-row v-if="pybossa.userProgressInPercent < 100">
        <b-col md="6">
          <h2>{{ question }}</h2>
    
           <b-input v-model="count" type="number"></b-input>
           <b-button @click="answer(count)" variant="primary" class="mt-2">Submit</b-button>
          
          <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ task.id }}</b-badge></p>
          <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from</p>
          
          <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
        </b-col>
        <b-col md="6" class="mt-4 mt-md-0">
          <b-img v-if="taskInfo.url" thumbnail fluid-grow :src="taskInfo.url"></b-img>
          <b-alert v-else :show="true" variant="danger">Picture not available</b-alert>
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
      count: 0
    },

    methods: {
      answer (answer) {
        this.pybossa.saveTask(answer)
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
