<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">


              <h2 class="heading centered">Select Data Type</h2>

              <p class="reduced-bottom-margin">Select the type of files that you will use for your project.</p>
              <p>
                You can use images, sounds, videos and PDFs files.
                The geo-coding template is also available and will allow you to get answers about places with a map.
              </p>

              <div class="margin-bottom">
                <div class="button-group">

                  <button class="button button-icon button-toggle button-toggle-fullwidth"
                          :class="{ 'selected': selectedMaterial === materials.image }"
                          @click="onMaterialSelected(materials.image)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M426.67,398.22v14.22A42.67,42.67,0,0,1,384,455.11H42.67A42.66,42.66,0,0,1,0,412.44V184.89a42.66,42.66,0,0,1,42.67-42.67H56.89V327.11A71.19,71.19,0,0,0,128,398.22ZM512,327.11V99.56a42.66,42.66,0,0,0-42.67-42.67H128A42.67,42.67,0,0,0,85.33,99.56V327.11A42.67,42.67,0,0,0,128,369.78H469.33A42.66,42.66,0,0,0,512,327.11ZM227.56,142.22a42.67,42.67,0,1,1-42.67-42.66A42.67,42.67,0,0,1,227.56,142.22Zm-85.34,128,49.35-49.34a10.65,10.65,0,0,1,15.08,0L241.78,256,362.24,135.54a10.67,10.67,0,0,1,15.08,0l77.79,77.79v99.56H142.22Z"/></svg>
                    Images
                  </button>
                  <div class="info">This task allows you to present images to an user in order for him to either describe them, classify them or count them.</div>


                  <button class="button button-icon button-toggle button-toggle-fullwidth" disabled
                          :class="{ 'selected': selectedMaterial === materials.sound }"
                          @click="onMaterialSelected(materials.sound)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.38,1.51,150.41,96A32,32,0,0,0,128,126.51V387.92A139.16,139.16,0,0,0,96,384c-53,0-96,28.66-96,64s43,64,96,64,96-28.66,96-64V214.32l256-75V323.93A138.62,138.62,0,0,0,416,320c-53,0-96,28.66-96,64s43,64,96,64,96-28.65,96-64V32A32,32,0,0,0,470.38,1.51Z"/></svg>
                    Sounds
                  </button>
                  <div class="info">Coming Soon ... This task allows you to present sounds to an user in order for him to either describe them or classify them.</div>

                  <button class="button button-icon button-toggle button-toggle-fullwidth" disabled
                          :class="{ 'selected': selectedMaterial === materials.video }"
                          @click="onMaterialSelected(materials.video)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M456.41,214.66l-352-208.1C75.81-10.34,32,6.06,32,47.86V464c0,37.5,40.7,60.1,72.4,41.3l352-208c31.4-18.5,31.5-64.1,0-82.6Z"/></svg>
                    Videos
                  </button>
                  <div class="info">Coming Soon ... This task allows you to present videos to an user in order for him to either describe them or classify them.</div>

                  <!--
                  <button class="button button-icon button-toggle button-toggle-fullwidth"
                          :class="{ 'selected': selectedMaterial === materials.pdf }"
                          @click="onMaterialSelected(materials.pdf)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M245.9,256.1c-5-16-4.9-46.9-2-46.9C252.3,209.2,251.5,246.1,245.9,256.1Zm-1.7,47.2c-7.7,20.2-17.3,43.3-28.4,62.7,18.3-7,39-17.2,62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8ZM150.1,428.1c0,.8,13.2-5.4,34.9-40.2C178.3,394.2,155.9,412.4,150.1,428.1ZM312,160H448V488a23.94,23.94,0,0,1-24,24H88a23.94,23.94,0,0,1-24-24V24A23.94,23.94,0,0,1,88,0H288V136A24.07,24.07,0,0,0,312,160Zm-8,171.8c-20-12.2-33.3-29-42.7-53.8,4.5-18.5,11.6-46.6,6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5,18.3-.4,44.1,8.1,77-11.6,27.6-28.7,64.6-40.8,85.8-.1,0-.1.1-.2.1-27.1,13.9-73.6,44.5-54.5,68,5.6,6.9,16,10,21.5,10,17.9,0,35.7-18,61.1-61.8,25.8-8.5,54.1-19.1,79-23.2,21.7,11.8,47.1,19.5,64,19.5,29.2,0,31.2-32,19.7-43.4C363.7,325.4,323.3,329.3,304,331.8ZM441,105,343,7a24,24,0,0,0-17-7h-6V128H448v-6.1A23.92,23.92,0,0,0,441,105ZM366.9,360.3c4.1-2.7-2.5-11.9-42.8-9C361.2,367.1,366.9,360.3,366.9,360.3Z"/></svg>
                    PDFs
                  </button>
                  <div class="info">This task allows you to present pdf documents to an user in order for him to describe or translate them.</div>

                  <button class="button button-icon button-toggle button-toggle-fullwidth"
                          :class="{ 'selected': selectedMaterial === materials.tweet }"
                          @click="onMaterialSelected(materials.tweet)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37,151.72c.33,4.54.33,9.09.33,13.64,0,138.72-105.59,298.56-298.56,298.56A296.51,296.51,0,0,1,0,416.81a215.83,215.83,0,0,0,25.34,1.3,210.15,210.15,0,0,0,130.27-44.83A105.12,105.12,0,0,1,57.5,300.51a132.94,132.94,0,0,0,19.82,1.62,111.09,111.09,0,0,0,27.61-3.57,105,105,0,0,1-84.14-103v-1.29a105.67,105.67,0,0,0,47.43,13.31A105.07,105.07,0,0,1,35.74,67.25,298.28,298.28,0,0,0,252.1,177.06a118.78,118.78,0,0,1-2.6-24,105,105,0,0,1,181.6-71.8,206.58,206.58,0,0,0,66.6-25.34,104.61,104.61,0,0,1-46.13,57.83A210.61,210.61,0,0,0,512,97.46a225.62,225.62,0,0,1-52.63,54.26Z"/></svg>
                    Tweets
                  </button>
                  <div class="info">This task allows you to present some tweets to an user in order for him to describe or classify them.</div>

                  <button class="button button-icon button-toggle button-toggle-fullwidth"
                          :class="{ 'selected': selectedMaterial === 'geo' }"
                          @click="onMaterialSelected('geo')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,28.44a112,112,0,0,0-112,112c0,50,73.2,141.16,101.24,174.24a14,14,0,0,0,21.52,0C294.8,281.6,368,190.45,368,140.44A112,112,0,0,0,256,28.44Zm0,149.34a37.34,37.34,0,1,1,37.33-37.34A37.33,37.33,0,0,1,256,177.78ZM17.88,220.4A28.46,28.46,0,0,0,0,246.81V469.32a14.22,14.22,0,0,0,19.5,13.2l122.72-55.85V219.48a269.16,269.16,0,0,1-18.89-41.26ZM256,348.15a42.45,42.45,0,0,1-32.45-15.07c-17.48-20.63-36.07-44.11-52.88-68.2V426.66l170.66,56.89V264.89c-16.81,24.08-35.39,47.57-52.88,68.19A42.45,42.45,0,0,1,256,348.15ZM492.5,171.7,369.78,227.56v256l124.34-49.74A28.43,28.43,0,0,0,512,407.41V184.91a14.22,14.22,0,0,0-19.5-13.21Z"/></svg>
                    Geo Coding
                  </button>
                  <div class="info">This task allows you to present places on a map to an user. The user can answer your question by placing a marker on the map that will give you some coordinates.</div>
                  -->

                </div>
              </div>

              <div class="button-group right-aligned">
                <button class="button button-primary" :disabled="!selectedMaterial" @click="onSubmit">Next</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </app-content-section>


    <!--
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Select the items that you'll work with</h2>
        <b-link :to="{ name: 'project', params: { pid: this.selectedProject.id } }">Go back to the project</b-link>
      </b-col>
    </b-row>
    <b-row class="mt-4">

      <b-col md="9">

        <b-row>

          <b-col md="4">
            <b-card ref="card-image"
                    :class="{ 'material-selected': selectedMaterial === materials.image }"
                    @click="onMaterialSelected(materials.image)"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present images to an user in order for him to either describe them, classify them or count them'"
            >
              <i class="fas fa-images fa-4x"></i><br>
              <div class="m-2">Images</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-sound"
                    :class="{ 'material-selected': selectedMaterial === materials.sound }"
                    @click="onMaterialSelected(materials.sound)"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present sounds to an user in order for him to either describe them or classify them'"
            >
              <i class="fas fa-music fa-4x"></i><br>
              <div class="m-2">Sounds</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-video"
                    :class="{ 'material-selected': selectedMaterial === materials.video }"
                    @click="onMaterialSelected(materials.video)"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present videos to an user in order for him to either describe them or classify them'"
            >
              <i class="fas fa-play fa-4x"></i><br>
              <div class="m-2">Videos</div>
            </b-card>
          </b-col>

        </b-row>

        <b-row class="mt-md-4">

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-pdf"
                    :class="{ 'material-selected': selectedMaterial === materials.pdf }"
                    @click="onMaterialSelected(materials.pdf)"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present pdf documents to an user in order for him to describe or translate them'"
            >
              <i class="fas fa-file-pdf fa-4x"></i><br>
              <div class="m-2">PDFs</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-tweet"
                    :class="{ 'material-selected': selectedMaterial === materials.tweet }"
                    @click="onMaterialSelected(materials.tweet)"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present some tweets to an user in order for him to describe or classify them'"
            >
              <i class="fab fa-twitter fa-4x"></i><br>
              <div class="m-2">Tweets</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0" v-b-tooltip.hover title="It will redirect you to the template editor and set the default geo-coding template (expert path)">
            <b-card ref="card-geo-coding"
                    @click="selectGeoCoding"
                    class="text-center material"
                    v-b-popover.hover.bottom="'This task allows you to present places on a map to an user. The user can answer your question by placing a marker on the map that will give you some coordinates.'"
            >
              <i class="fas fa-map-marked-alt fa-4x"></i><br>
              <div class="m-2">Geo-coding</div>
            </b-card>
          </b-col>

        </b-row>

      </b-col>

      <b-col md="3" class="text-muted">
        <p>Select the type of files that you will use for your project.</p>
        <p>
          You can use images, sounds, videos and PDFs files.
          The geo-coding template is also available and will allow you to get answers about places with a map.
        </p>
        <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { pid: this.selectedProject.id } }">expert path</b-link> (not for beginners)</p>
      </b-col>

    </b-row>

    <b-row class="mt-4 mb-4">
      <b-col>
        <b-btn ref="btn-submit-material" v-if="selectedMaterial" @click="onSubmit" variant="success" size="lg">Done</b-btn>
      </b-col>
    </b-row>
    -->

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { buildTemplateFromModel } from '@/helper'

import ContentSection from '@/components/shared/ContentSection.vue';

import GeoCodingTemplate from '@/components/Task/Template/GeoCoding/GeoCodingTemplate'

export default {
  name: 'MaterialBuilder',
  created () {
    this.selectedMaterial = this.task.material
  },
  components: {
    'app-content-section': ContentSection
  },
  data: () => {
    return {
      selectedMaterial: null
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskMaterial',
      'setStep'
    ]),
    ...mapMutations('task', [
      'setTaskTemplate'
    ]),
    ...mapActions('task/builder', [
      'reset'
    ]),
    ...mapActions('task', [
      'saveTaskPresenter'
    ]),

    selectGeoCoding () {
      const template = buildTemplateFromModel(GeoCodingTemplate, {})
      this.saveTaskPresenter({
        project: this.selectedProject,
        template: template
      }).then(() => {
        this.$router.push({ name: 'project.task.presenter.editor', params: { pid: this.selectedProject.id } })
      })
    },

    onMaterialSelected (materialType) {
      this.selectedMaterial = materialType
    },

    onSubmit () {

      if( this.selectedMaterial === 'geo' ) {
        this.selectGeoCoding();
      }
      else {
        if (Object.values(this.materials).some(m => m === this.selectedMaterial)) {
          // reset all the builder variables when a new material is selected
          if (this.task.material !== this.selectedMaterial) {
            this.reset()
          }
          this.setTaskMaterial(this.selectedMaterial)
          this.setStep({ step: 'material', value: true })
        }
      }

    }
  },
  computed: {
    ...mapState('task/builder', [
      'materials',
      'task'
    ]),
    ...mapState('c3s/project', {
      selectedProject: state => state.project
    })
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


@import '../../../styles/undoBootstrap.scss';
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
