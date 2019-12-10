// eslint-disable-next-line no-unused-vars
const component =
  {
    template: `
      <!-- This template use https://bootstrap-vue.js.org/ -->
<div>
    
  <div v-if="pybossa.task" class="row row-centered row-wrapping">
    
      <div class="col col-wrapping col-large-6">
        <img v-if="media && media.length > 0" :src="media[0].path" />
        <Loader v-else></Loader>
      </div>
    
      <div class="col col-wrapping col-large-6">
      
        <h3 class="subheading">{{question}}</h3>
      
        <div class="form-field form-field-block" :key="index" v-for="(description, index) in task.content.descriptions" >
            <label>{{ description }}</label>
            <input type="text" v-model="answers[index]" placeholder="Describe ..." />
            <span class="error" v-if="!isFieldValid(answers[index])"></span>
        </div>
        
        <div class="button-group right-aligned">
            <button @click="submit" class="button button-primary" :disabled="!isFormValid()">Submit</button>
        </div>
      </div>
      
  </div>
  <div v-else class="row row-centered">
      <div class="col col-large-6">
          <p class="centered">
              Thanks you for your participation
          </p>
      </div>
  </div>
  
  <!--
    
      <b-row v-if="pybossa.task">
      
      
        <b-col md="6" class="mt-4 mt-md-0 order-2 order-md-1">
          <h2>{{ question }}</h2>
    
          <b-form-group
              :key="index"
              v-for="(description, index) in task.content.descriptions"
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
          
        </b-col>
        
        
        <b-col md="6" class="order-1 order-md-2">
            <div v-if="media && media.length > 0" class="text-center">
              <div v-if="pybossa.taskLoaded">
                <b-img v-if="media[0].path" fluid-grow :src="media[0].path" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
                <b-img v-else fluid-grow :src="taskInfo.link_raw" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
              </div>
              <b-spinner v-else style="width: 4rem; height: 4rem;" variant="primary" label="Image loading..."></b-spinner>
            </div>
          <b-alert v-else :show="true" variant="danger">Picture not available</b-alert>
        </b-col>
      </b-row>
      
      
      <b-row v-else>
        <b-col>
          <b-jumbotron header="This the end!" lead="Thanks you for your participation"></b-jumbotron>
        </b-col>
      </b-row>
      
      -->
</div>`,

    data: {
      question: 'Describe the picture',
      descriptions: [
        'Write your picture description here'
      ],
      answers: [],
      showAlert: false
    },
      props: {
          /* Injected by the Pybossa App */
          pybossa: {
              required: true
          }
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
      },
        media: function media() {
            return this.pybossa.media;
        }
    },

    created () {
      this.descriptions.forEach(() => this.answers.push(''))
    },

    mounted () {
      this.pybossa.run()
    },


  }

export default component
