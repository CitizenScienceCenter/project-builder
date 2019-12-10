<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">

              <div class="margin-bottom">
                <div class="button-group centered">
                  <button class="button button-secondary button-icon button-secondary-naked" @click="goBack">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M159.69,239l136-136a23.9,23.9,0,0,1,33.9,0l22.6,22.6a23.9,23.9,0,0,1,0,33.9L255.89,256l96.4,96.4a23.9,23.9,0,0,1,0,33.9L329.69,409a23.9,23.9,0,0,1-33.9,0l-136-136a23.93,23.93,0,0,1-.1-34Z"/></svg>
                    Go Back
                  </button>
                </div>
              </div>

              <h2 class="heading centered">Job</h2>

              <p>Choose any of the options.</p>
              <!--
              <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link> (not for beginners!)</p>
              -->

              <div class="margin-bottom">
                <div class="button-group">

                  <div v-for="job in materialJobs[task.material]" :key="job">

                    <button class="button button-icon button-toggle button-toggle-fullwidth"
                            v-if="job === jobs.describe"
                            :class="{ 'selected': selectedJob === jobs.describe }"
                            @click="onJobSelected(job)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M290.74,93.24l128,128-278,278L26.63,511.85A24,24,0,0,1,.14,485.34l12.7-114.22Zm207.2-19.06L437.83,14.07a48,48,0,0,0-67.91,0L313.37,70.62l128,128,56.55-56.55A48,48,0,0,0,497.94,74.18Z"/></svg>
                      Describe
                    </button>

                    <button class="button button-icon button-toggle button-toggle-fullwidth"
                            v-if="job === jobs.classify"
                            :class="{ 'selected': selectedJob === jobs.classify }"
                            @click="onJobSelected(job)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M488,0H24C2.71,0-8,25.87,7.06,41L192,225.94V432a24,24,0,0,0,10.24,19.66l80,56C298,518.69,320,507.49,320,488v-262L505,41C520,25.9,509.34,0,488,0Z"/></svg>
                      Classify
                    </button>

                    <button class="button button-icon button-toggle button-toggle-fullwidth"
                            v-if="job === jobs.count"
                            :class="{ 'selected': selectedJob === jobs.count }"
                            @click="onJobSelected(job)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432,0H80C54.4,0,32,22.4,32,48V464c0,25.6,22.4,48,48,48H432c25.6,0,48-22.4,48-48V48C480,22.4,457.6,0,432,0ZM160,435.2c0,6.4-6.4,12.8-12.8,12.8H108.8c-6.4,0-12.8-6.4-12.8-12.8V396.8c0-6.4,6.4-12.8,12.8-12.8h38.4c6.4,0,12.8,6.4,12.8,12.8Zm0-128c0,6.4-6.4,12.8-12.8,12.8H108.8c-6.4,0-12.8-6.4-12.8-12.8V268.8c0-6.4,6.4-12.8,12.8-12.8h38.4c6.4,0,12.8,6.4,12.8,12.8Zm128,128c0,6.4-6.4,12.8-12.8,12.8H236.8c-6.4,0-12.8-6.4-12.8-12.8V396.8c0-6.4,6.4-12.8,12.8-12.8h38.4c6.4,0,12.8,6.4,12.8,12.8v38.4Zm0-128c0,6.4-6.4,12.8-12.8,12.8H236.8c-6.4,0-12.8-6.4-12.8-12.8V268.8c0-6.4,6.4-12.8,12.8-12.8h38.4c6.4,0,12.8,6.4,12.8,12.8v38.4Zm128,128c0,6.4-6.4,12.8-12.8,12.8H364.8c-6.4,0-12.8-6.4-12.8-12.8V268.8c0-6.4,6.4-12.8,12.8-12.8h38.4c6.4,0,12.8,6.4,12.8,12.8V435.2Zm0-256c0,6.4-6.4,12.8-12.8,12.8H108.8c-6.4,0-12.8-6.4-12.8-12.8V76.8c0-6.4,6.4-12.8,12.8-12.8H403.2c6.4,0,12.8,6.4,12.8,12.8Z"/></svg>
                      Count
                    </button>

                  </div>

                </div>
              </div>

              <div class="button-group right-aligned">
                <button class="button button-primary" :disabled="!selectedJob" @click="onSubmit">Next</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </app-content-section>



    <!-- Job type selection title -->


    <!--
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">What will you do with all the files?</h2>
        <b-link @click="goBack">Go back</b-link>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col md="9">
        <b-row>

          <b-col md="4" v-for="job in materialJobs[task.material]" :key="job">

            <b-card ref="card-describe" :class="{ 'material-selected': selectedJob === jobs.describe }" v-if="job === jobs.describe" @click="onJobSelected(job)" class="text-center material mt-2 mt-md-0">
              <i class="fas fa-edit fa-4x"></i>
              <div class="m-2">Describe</div>
            </b-card>

            <b-card ref="card-classify" :class="{ 'material-selected': selectedJob === jobs.classify }" v-if="job === jobs.classify" @click="onJobSelected(job)" class="text-center material mt-2 mt-md-0">
              <i class="fas fa-filter fa-4x"></i><br>
              <div class="m-2">Classify</div>
            </b-card>

            <b-card ref="card-count" :class="{ 'material-selected': selectedJob === jobs.count }" v-if="job === jobs.count" @click="onJobSelected(job)" class="text-center material mt-2 mt-md-0">
              <i class="fas fa-calculator fa-4x"></i><br>
              <div class="m-2">Count</div>
            </b-card>
          </b-col>

        </b-row>
      </b-col>

      <b-col md="3" class="text-muted">
        <p>Choose any of the options.</p>
        <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link> (not for beginners!)</p>
      </b-col>

    </b-row>

    <b-row class="mt-4 mb-4">
      <b-col>
        <b-btn ref="btn-submit-job" v-if="selectedJob" @click="onSubmit" variant="success" size="lg">Yup!</b-btn>
      </b-col>
    </b-row>
    -->

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';

export default {
  name: 'JobSelector',
  components: {
    'app-content-section': ContentSection
  },
  created () {
    this.selectedJob = this.task.job
  },
  data: () => {
    return {
      selectedJob: null
    }
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'jobs', 'materialJobs'
    ]),
    /*
    ...mapState('project', [
      'selectedProject'
    ]),
    */
    ...mapState('c3s/project', {
      selectedProject: state => state.project
    })
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskJob', 'setCurrentStep', 'setStep', 'setTaskTemplate'
    ]),

    onJobSelected (jobType) {
      this.selectedJob = jobType
    },
    onSubmit () {
      if (this.task.job !== this.selectedJob) {
        // reset the template if it was already set
        this.setTaskTemplate(null)
      }
      this.setTaskJob(this.selectedJob)
      this.setStep({ step: 'job', value: true })
    },
    goBack () {
      // invalidate job step and go to material selection
      //this.setStep({ step: 'material', value: false })
      this.$router.push({ name: 'task.builder.material', params: { pid: this.selectedProject.id } })
    }
  }
}
</script>

<style lang="scss">

  /*
  @import '~bootstrap/scss/bootstrap.scss';

  .material {
    &:hover {
      cursor: pointer;
      transition: all 0.3s;
      background-color: $primary;
      color: $white;
    }
  }

  .material-selected {
    background-color: $primary;
    color: $white;
  }
  */

  @import '../../../styles/theme.scss';
  @import '../../../styles/shared/variables.scss';

  .button-group {
    .button-toggle-fullwidth {
      text-align: left;
      display: block;
      width: calc( 100% - 2* #{$spacing-1});
    }

    .info {
      font-size: $font-size-small;
      color: $color-black-tint-50;
      margin: $spacing-1;
      margin-bottom: $spacing-3;

      &:last-child {
        margin-bottom: $spacing-1;
      }
    }
  }

</style>
