// eslint-disable-next-line no-unused-vars
const component =
  {
    template: `
      <!-- This template use https://bootstrap-vue.js.org/ -->

      <b-row v-if="pybossa.task">
        
        <!-- Form -->
        <b-col md="6" class="mt-4 mt-md-0 order-2 order-md-1">
          
          <h2>{{ question }}</h2>
    
          <b-input v-model="count" type="number"></b-input>
          <b-button @click="answer(count)" variant="primary" class="mt-2">Submit</b-button>
          
        </b-col>
        
        <!-- Image -->
        <b-col md="6" class="order-1 order-md-2">
          <div v-if="media && media.length > 0" class="text-center">
            <div v-if="pybossa.taskLoaded">
              <b-img v-if="media[0].path" fluid-grow :src="media[0].path" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
            </div>
            <b-spinner v-else style="width: 4rem; height: 4rem;" variant="primary" label="Image loading..."></b-spinner>
          </div>
          <b-alert v-else :show="true" variant="danger">Picture not available</b-alert>
        </b-col>
      </b-row>
      
      <!-- Task end message -->
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
      media () {
        return this.pybossa.media
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
