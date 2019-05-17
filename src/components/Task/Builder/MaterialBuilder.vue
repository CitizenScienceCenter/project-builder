<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Select the items that you'll work with</h2>
      </b-col>
    </b-row>
    <b-row class="mt-4">

      <b-col md="9">

        <b-row>

          <b-col md="4">
            <b-card @click="onMaterialSelected(materials.image)" class="text-center material">
              <i class="fas fa-images fa-4x"></i><br>
              <div class="m-2">Images</div>
            </b-card>
          </b-col>

          <b-col md="4">
            <b-card @click="onMaterialSelected(materials.sound)" class="text-center material">
              <i class="fas fa-music fa-4x"></i><br>
              <div class="m-2">Sounds</div>
            </b-card>
          </b-col>

          <b-col md="4">
            <b-card @click="onMaterialSelected(materials.video)" class="text-center material">
              <i class="fas fa-play fa-4x"></i><br>
              <div class="m-2">Videos</div>
            </b-card>
          </b-col>

        </b-row>

        <b-row class="mt-4">

          <b-col md="4">
            <b-card @click="onMaterialSelected(materials.pdf)" class="text-center material">
              <i class="fas fa-file-pdf fa-4x"></i><br>
              <div class="m-2">PDFs</div>
            </b-card>
          </b-col>

          <b-col md="4">
            <b-card @click="onMaterialSelected(materials.tweet)" class="text-center material">
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
        <p>Not what you were looking for? Try the <b-link>expert path</b-link> (not for beginners!)</p>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MaterialBuilder',
  methods: {
    ...mapMutations('task/builder', [
      'setTaskMaterial', 'setStep'
    ]),

    onMaterialSelected (materialType) {
      this.setTaskMaterial(materialType)
      this.setStep({ step: 'material', value: true })
    }
  },
  computed: {
    ...mapState('task/builder', [
      'materials'
    ])
  }
}
</script>

<style lang="scss" scoped>

@import '~bootstrap/scss/bootstrap.scss';

.material:hover {
  background-color: $primary;
  color: $white;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
