<template>
  <div>
    <b-form @submit.prevent="onSubmit">
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
          <vue-cropper ref="cropper" :data="cropData" :view-mode="2" v-show="pictureUrl !== ''" :src="pictureUrl"></vue-cropper>
          <b-form-file v-model="selectedPicture" accept=".jpg, .png, .gif"></b-form-file>
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
      selectedPicture: ''
    }
  },
  mounted () {
    this.currentShortDescription = this.shortDescription
    this.selectedPicture = this.picture
  },
  methods: {
    onSubmit () {
      if (this.validated) {
        this.$store.commit('project/builder/setShortDescription', this.currentShortDescription)
        this.$store.commit('project/builder/setStep', { step: 'information', value: true })

        this.$store.commit('project/builder/setPicture', this.selectedPicture)
        this.$store.commit('project/builder/setCroppedPicture', this.$refs.cropper.getCroppedCanvas().toDataURL())
        this.$store.commit('project/builder/setCropData', this.$refs.cropper.getData())
      }
    }
  },
  computed: {
    ...mapState('project/builder', {
      title: state => state.title,
      shortDescription: state => state.shortDescription,
      picture: state => state.picture,
      cropData: state => state.cropData
    }),

    pictureUrl () {
      return typeof this.selectedPicture === 'object' ? URL.createObjectURL(this.selectedPicture) : ''
    },

    validated () {
      return this.currentShortDescription.length > 0 && this.currentShortDescription.length <= this.maxNbCharacters
    },
    validFeedback () {
      return this.maxNbCharacters - this.currentShortDescription.length + ' characters left'
    },
    invalidFeedback () {
      return this.currentShortDescription.length === 0 ? 'You must set a description for your project' : 'The description length should not exceed ' + this.maxNbCharacters + ' characters'
    }
  },
  watch: {
    selectedPicture (newVal, oldVal) {
      if (newVal !== '') {
        if (typeof FileReader === 'function') {
          const reader = new FileReader()
          reader.onload = (event) => {
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result)
          }
          reader.readAsDataURL(newVal)
        } else {
          alert('Sorry, FileReader API not supported')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
