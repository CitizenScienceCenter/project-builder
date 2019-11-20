<template>
  <div>
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { buildTemplateFromModel } from '@/helper'

import GeoCodingTemplate from '@/components/Task/Template/GeoCoding/GeoCodingTemplate'

export default {
  name: 'MaterialBuilder',
  created () {
    this.selectedMaterial = this.task.material
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
      if (Object.values(this.materials).some(m => m === this.selectedMaterial)) {
        // reset all the builder variables when a new material is selected
        if (this.task.material !== this.selectedMaterial) {
          this.reset()
        }
        this.setTaskMaterial(this.selectedMaterial)
        this.setStep({ step: 'material', value: true })
      }
    }
  },
  computed: {
    ...mapState('task/builder', [
      'materials',
      'task'
    ]),
    ...mapState('c3s/project', {
      'selectedProject': state => state.project
    })
  },
  props: {
    pid: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

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
</style>
