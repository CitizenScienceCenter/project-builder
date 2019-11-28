// eslint-disable-next-line no-unused-vars
const component =
{
  template: `
      <!-- This template use https://bootstrap-vue.js.org/ -->

      <b-row v-if="pybossa.task">
        
        <!-- Form zone -->
        <b-col md="6" class="mt-4 mt-md-0 order-2 order-md-1">
        
          <!-- Questions with answers -->
          <b-form-group :key="key" v-for="(question, key) in task.content" :label="question.question" label-size="lg">
          
            <b-form-radio-group 
              v-model="answers[key]"
              buttons
              button-variant="outline-primary"
              :options="question.answers">
            </b-form-radio-group>
            
          </b-form-group>
          
          <!-- Submit button -->
          <b-btn @click="submit" variant="success">Submit</b-btn>
          
          <!-- Form validation errors -->
          <b-alert variant="danger" v-model="showAlert" class="mt-2" dismissible>
            You must complete the form to submit
          </b-alert>
        </b-col>
        
        <!-- Image -->
        <b-col md="6" class="order-1 order-md-2">
          <div class="text-center">
            <div v-if="pybossa.taskLoaded">
              <b-img v-if="media" fluid-grow :src="media[0].path" class="shadow" style="min-height: 120px; background-color: grey" alt="Image loading..."></b-img>
            </div>
            <b-spinner v-else style="width: 4rem; height: 4rem;" variant="primary" label="Image loading..."></b-spinner>
          </div>
        </b-col>
      </b-row>
      
      <!-- Task end message -->
      <b-row v-else>
        <b-col>
          <b-jumbotron header="This is the end!" lead="Thanks you for your participation"></b-jumbotron>
        </b-col>
      </b-row>`,

  data: () => { return {"questions":[{"question":"DEF1","answers":["DEF1","DEF1"]}],"answers":[],"showAlert":false}},

  methods: {
	submit: function submit() {
      var _this = this;

      if (this.isFormValid()) {
        this.pybossa.saveTask(this.answers);
        this.showAlert = false;
        this.answers = [];
        this.questions.forEach(function () {
          return _this.answers.push(null);
        });
      } else {
        this.showAlert = true;
      }
    },
	isFormValid: function isFormValid() {
      return this.answers.length === this.questions.length && !this.answers.some(function (el) {
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

  watch: {
  },

  created: function created() {
    var _this2 = this;

    this.questions.forEach(function () {
      return _this2.answers.push(null);
    });
  },

  mounted: function mounted() {
    this.pybossa.run();
  },

  props: {"pybossa":{"required":true}}

}

export default component
