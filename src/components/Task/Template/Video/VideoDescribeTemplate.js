// eslint-disable-next-line no-unused-vars
const component =
  {
    /* The template can use BoostrapVue components: https://bootstrap-vue.js.org */
    template: `
    <b-row v-if="pybossa.userProgressInPercent < 100">
      <b-col md="4">
        <h2>{{ question }}</h2>
  
        <b-button :key="index" v-for="(description, index) in descriptions" @click="answer(description)" variant="primary" class="m-3">{{ description }}</b-button>
  
        <p class="mt-2">You are working now on task: <b-badge variant="warning">{{ pybossa.task.id }}</b-badge></p>
        <p>You have completed: <b-badge variant="primary">{{ pybossa.userProgress.done }}</b-badge> tasks from</p>
        
        <b-progress :value="pybossa.userProgressInPercent" :max="100"></b-progress>
      </b-col>
      <b-col md="8" class="mt-4 mt-md-0">
        <b-embed v-if="pybossa.task.info && pybossa.task.info.video_url" type="iframe" allowfullscreen :src="pybossa.task.info.video_url"></b-embed>
        <div v-else-if="pybossa.task.info && pybossa.task.info.oembed" v-html="pybossa.task.info.oembed"></div>
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
        'A human',
        'A car',
        'An animal'
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
