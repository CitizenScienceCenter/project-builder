<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Select the items that you'll work with</h2>
        <b-link :to="{ name: 'project', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">Go back to the project</b-link>
      </b-col>
    </b-row>
    <b-row class="mt-4">

      <b-col md="9">

        <b-row>

          <b-col md="4">
            <b-card ref="card-image" :class="{ 'material-selected': selectedMaterial === materials.image }" @click="onMaterialSelected(materials.image)" class="text-center material">
              <i class="fas fa-images fa-4x"></i><br>
              <div class="m-2">Images</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-sound" :class="{ 'material-selected': selectedMaterial === materials.sound }" @click="onMaterialSelected(materials.sound)" class="text-center material">
              <i class="fas fa-music fa-4x"></i><br>
              <div class="m-2">Sounds</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-video" :class="{ 'material-selected': selectedMaterial === materials.video }" @click="onMaterialSelected(materials.video)" class="text-center material">
              <i class="fas fa-play fa-4x"></i><br>
              <div class="m-2">Videos</div>
            </b-card>
          </b-col>

        </b-row>

        <b-row class="mt-md-4">

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-pdf" :class="{ 'material-selected': selectedMaterial === materials.pdf }" @click="onMaterialSelected(materials.pdf)" class="text-center material">
              <i class="fas fa-file-pdf fa-4x"></i><br>
              <div class="m-2">PDFs</div>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-2 mt-md-0">
            <b-card ref="card-tweet" :class="{ 'material-selected': selectedMaterial === materials.tweet }" @click="onMaterialSelected(materials.tweet)" class="text-center material">
              <i class="fab fa-twitter fa-4x"></i><br>
              <div class="m-2">Tweets</div>
            </b-card>
          </b-col>

        </b-row>

      </b-col>

      <b-col md="3" class="text-muted">
        <p>Select the type of files that you'll use for your project.</p>
        <p>
          * You can only use images, sounds or videos for now but we're working hard to have the rest of options available very shortly.
          Sorry for the inconvenience!
        </p>
        <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link> (not for beginners!)</p>
      </b-col>

    </b-row>

    <b-row class="mt-4">
      <b-col>
        <b-btn ref="btn-submit-material" v-if="selectedMaterial" @click="onSubmit" variant="success" size="lg">Done</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
      'setTaskMaterial', 'setStep'
    ]),

    onMaterialSelected (materialType) {
      this.selectedMaterial = materialType
    },
    onSubmit () {
      if (Object.values(this.materials).some(m => m === this.selectedMaterial)) {
        this.setTaskMaterial(this.selectedMaterial)
        this.setStep({ step: 'material', value: true })
      }
    }
  },
  computed: {
    ...mapState('task/builder', [
      'materials', 'task'
    ]),
    ...mapState('project', [
      'selectedProject'
    ])
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
