// eslint-disable-next-line no-unused-vars
const component = {
  template: `
<div>

  <div v-if="pybossa.task" class="row row-centered row-wrapping">
    
      <div class="col col-wrapping col-large-6">
        <img v-if="media && media.length > 0" :src="media[0].path" />
        <Loader v-else></Loader>
      </div>
    
      <div class="col col-wrapping col-large-6">
      
        <div class="form-field form-field-block" :key="key" v-for="(question, key) in task.content" >
            <h3 class="subheading">{{ question.question }}</h3>
            <div class="options">
              <label v-for="(answer,key2) in question.answers" :key="key2">
                  <input type="radio" :value="answer" v-model="answers[key]">
                  <div class="radio">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Z"/></svg>
                  </div>
                  <span>{{ answer }}</span>
              </label>
            </div>
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
        
          
          <b-form-group :key="key" v-for="(question, key) in task.content" :label="question.question" label-size="lg">
          
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
        </b-col>
        
        
        <b-col md="6" class="order-1 order-md-2">
          <div class="text-center">
            <div v-if="pybossa.taskLoaded">
              <b-img v-if="media && media.length > 0" fluid-grow :src="media[0].path" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
            </div>
            <b-spinner v-else style="width: 4rem; height: 4rem;" variant="primary" label="Image loading..."></b-spinner>
          </div>
        </b-col>
      </b-row>
      
      
      <b-row v-else>
        <b-col>
          <b-jumbotron header="This is the end!" lead="Thanks you for your participation"></b-jumbotron>
        </b-col>
      </b-row>
-->

</div>`,

  data: {
    questions: [{
      question: '',
      answers: [
        ''
      ]
    }],
    answers: [],
    showAlert: false
  },
  methods: {
    submit: function submit() {
      console.log('submit is called');
      var _this = this;

      if (this.isFormValid()) {
        this.pybossa.saveTask(this.answers);
        this.showAlert = false;
        this.answers = [];
        this.questions.forEach(function() {
          return _this.answers.push(null);
        });
      } else {
        this.showAlert = true;
      }
    },
    isFormValid: function isFormValid() {
      return this.answers.length === this.questions.length && !this.answers.some(function(el) {
        return typeof el === 'undefined' || el == null;
      });
    },
  },

  computed: {
    task: function task() {
      return this.pybossa.task;
    },
    media: function media() {
      return this.pybossa.media;
    }
  },

  watch: {},

  created: function created() {
    var _this2 = this;

    this.questions.forEach(function() {
      return _this2.answers.push(null);
    });
  },

  mounted: function mounted() {
    this.pybossa.run();
  },

  props: {
    "pybossa": {
      "required": true
    }
  }

}

export default component
