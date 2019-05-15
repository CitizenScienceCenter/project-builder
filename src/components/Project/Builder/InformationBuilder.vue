<template>
  <div>
    <b-form ref="form" @submit.prevent="onSubmit">
      <b-row class="mt-4">
        <b-col md="9">
          <b-link :to="{ name: 'project.builder.name' }">Go back</b-link>
          <h3 class="mt-3">{{ title }} in a few words</h3>
          <b-form-group
                  id="fieldset-description"
                  label="Project short description"
                  label-for="Description"
                  :valid-feedback="validFeedback"
                  :invalid-feedback="invalidFeedback"
                  :state="validated"
          >
            <b-form-textarea
                    size="lg"
                    v-model="currentShortDescription"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col md="3" align-self="end">
          <p>Only 120 characters so we can tweet it.</p>
          <p>TIP: Take your time, this will be your business card.</p>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col md="9">
          <h3 class="mt-3">Choose a nice picture</h3>
          <vue-cropper ref="cropper" v-show="pictureSelected" :src="selectedPicture" :data="cropData" :autoCrop="true" :view-mode="2"></vue-cropper>
          <b-form-file @change="setImage" accept=".jpg, .png, .gif"></b-form-file>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <b-button type="submit" variant="success">Next Step</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueCropper from 'vue-cropperjs'

export default {
  name: 'InformationBuilder',
  components: {
    VueCropper
  },
  data: () => {
    return {
      maxNbCharacters: 120,
      currentShortDescription: '',
      selectedPicture: '',
      pictureSelected: false
    }
  },
  mounted () {
    this.currentShortDescription = this.shortDescription

    if (this.picture.length > 0) {
      this.selectedPicture = this.picture
      this.pictureSelected = true

      this.$refs.cropper.replace(this.picture)
    }
  },
  methods: {
    onSubmit () {
      if (this.validated) {
        this.$store.commit('project/builder/setShortDescription', this.currentShortDescription)
        this.$store.commit('project/builder/setStep', { step: 'information', value: true })

        this.$store.commit('project/builder/setPicture', this.selectedPicture)
        this.$store.commit('project/builder/setCroppedPicture', this.$refs.cropper.getCroppedCanvas().toDataURL())
        this.$store.commit('project/builder/setCropData', this.$refs.cropper.getData(true))
      }
    },

    setImage (event) {
      const file = event.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedPicture = e.target.result
          this.$refs.cropper.replace(this.selectedPicture)
          this.pictureSelected = true
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    }
  },
  computed: {
    ...mapState('project/builder', {
      title: state => state.title,
      shortDescription: state => state.shortDescription,
      picture: state => state.picture,
      croppedPicture: state => state.croppedPicture,
      cropData: state => state.cropData
    }),

    /**
     * Returns true if the short description is validated
     * @return {boolean}
     */
    validated () {
      return this.currentShortDescription.length > 0 && this.currentShortDescription.length <= this.maxNbCharacters
    },
    /**
     * Returns a valid feedback message that will be displayed in the form
     * @return {string}
     */
    validFeedback () {
      return this.maxNbCharacters - this.currentShortDescription.length + ' characters left'
    },
    /**
     * Returns an invalid feedback message that will be displayed in the form
     * @return {string}
     */
    invalidFeedback () {
      return this.currentShortDescription.length === 0 ? 'You must set a description for your project' : 'The description length should not exceed ' + this.maxNbCharacters + ' characters'
    }
  }
}
</script>

<style scoped>

</style>
