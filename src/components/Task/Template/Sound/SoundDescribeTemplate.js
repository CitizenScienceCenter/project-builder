// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row v-if="pybossa.userProgressInPercent < 100">
      <b-col md="6">
        <h2>{{ question }}</h2>
  
        <b-button :key="index" v-for="(description, index) in descriptions" @click="answer(description)" variant="primary" class="m-3">{{ description }}</b-button>
  
        <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ pybossa.task.id }}</b-badge></p>
        <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from</p>
        
        <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
      </b-col>
      <b-col md="6" class="mt-4 mt-md-0">
        <audio v-if="pybossa.task.info && pybossa.task.info.audio_url" :src="pybossa.task.info.audio_url" controls></audio>
        <div v-else-if="pybossa.task.info && pybossa.task.info.embed" v-html="pybossa.task.info.embed"></div>
        <b-alert v-else :show="true" variant="danger">Audio media not available</b-alert>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
      </b-col>
    </b-row>`,

    data: {
      question: 'What kind of music do you hear ?',
      descriptions: [
        'Rock',
        'Jazz',
        'Electro',
        'Hip-Hop'
      ]
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
