<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">

              <div class="margin-bottom">
                <router-link class="button button-secondary button-secondary-naked" :to="{ name: 'project.builder.name' }" style="padding:0">Go Back</router-link>
              </div>

              <h2 class="heading centered">{{ title }} in a few words</h2>

              <form @submit.prevent="onSubmit">

                <div class="form-field form-field-block">
                  <label>Short Description</label>
                  <growing-textarea v-model="currentShortDescription" placeholder="Please write a short description ..."></growing-textarea>
                  <span v-if="validated && validFeedback" class="message success">{{validFeedback}}</span>
                  <span v-if="!validated && invalidFeedback" class="message error">{{invalidFeedback}}</span>
                </div>

                <h3 class="subheading">Project Picture</h3>

                <div class="form-field form-field-block">
                  <label>Title</label>
                  <input type="file" accept=".jpg, .png, .gif, .svg" placeholder="Select a picture ..." @change="setImage" />
                  <span class="message error" v-if="selectedPictureSizeInMB > maxPictureSizeInMB">The picture is too big in file size.</span>
                  <span class="message info">Authorized formats: .jpg, .png, .gif, .svg. <br>The picture must not exceed {{ maxPictureSizeInMB }} MB.</span>
                </div>

                <div class="margin-bottom" v-if="selectedPicture && selectedPictureSizeInMB <= maxPictureSizeInMB">
                  <img :src="encodedPicture" />
                </div>

                <!-- <vue-cropper ref="cropper" v-show="pictureSelected" :src="selectedPicture" :data="cropData" ></vue-cropper> -->

                <div class="button-group right-aligned">
                  <button type="submit" class="button button-primary" :disabled="descriptionFirstInteraction || !validated || selectedPictureSizeInMB > this.maxPictureSizeInMB">Next Step</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </app-content-section>


    <!--

    <b-row class="mt-4">
      <b-col>
        <b-link :to="{ name: 'project.builder.name' }">Go back</b-link>
      </b-col>
    </b-row>

    <b-form ref="form" @submit.prevent="onSubmit">

      <b-row>

        <b-col md="9">
          <h3 class="mt-3">{{ title }} in a few words</h3>
          <b-form-group
                  id="fieldset-description"
                  label="Short description"
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

        <b-col md="3" align-self="start">
          <p>TIP: Take your time, this will be your business card.</p>
        </b-col>

      </b-row>

      <b-row class="mt-4">
        <b-col md="9">
          <h3 class="mt-3">Choose a picture that represents or is related to your project</h3>

          <vue-cropper ref="cropper" v-show="pictureSelected" :src="selectedPicture" :data="cropData" :autoCrop="true" :view-mode="2" :aspectRatio="4/3"></vue-cropper>

          <b-form-group
                  :state="selectedPictureSizeInMB <= maxPictureSizeInMB"
                  invalid-feedback="The picture is too big"
                  :description="'Authorized formats: .jpg, .png, .gif, .svg. The picture must not exceed ' + maxPictureSizeInMB + ' MB.'"
          >
            <b-form-file @change="setImage" accept=".jpg, .png, .gif, .svg" placeholder="Select a picture..."></b-form-file>
          </b-form-group>

        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col>
          <b-button type="submit" variant="success">Next Step</b-button>
        </b-col>
      </b-row>

    </b-form>

    -->
  </div>
</template>

<script>

import ContentSection from '@/components/shared/ContentSection.vue';

import { mapState, mapMutations } from 'vuex'
import VueCropper from 'vue-cropperjs'
import GrowingTextarea from "@/components/shared/GrowingTextarea";

export default {
  name: 'InformationBuilder',
  components: {
    GrowingTextarea,
    VueCropper,
    'app-content-section': ContentSection
  },
  data: () => {
    return {
      maxNbCharacters: 120,
      currentShortDescription: '',
      descriptionFirstInteraction: true,

      selectedPicture: '',
      encodedPicture: '',
      selectedPictureName: '',
      pictureSelected: false,
      selectedPictureSize: 0,
      maxPictureSizeInMB: 1
    }
  },
  mounted () {
    this.currentShortDescription = this.shortDescription

    if (this.picture.length > 0) {
      this.selectedPicture = this.picture
      this.pictureSelected = true

      //this.$refs.cropper.replace(this.picture)
    }
  },
  methods: {
    ...mapMutations('project/builder', [
      'setShortDescription',
      'setStep',
      'setPicture',
      'setPictureName',
      'setCroppedPicture',
      'setCropData'
    ]),

    ...mapMutations('notification', [
      'showError'
    ]),

    onSubmit () {
      this.descriptionFirstInteraction = false

      if (this.validated && this.selectedPictureSizeInMB <= this.maxPictureSizeInMB) {

        this.setShortDescription(this.currentShortDescription)
        this.setStep({ step: 'information', value: true })

        if (this.selectedPicture) {
          this.setPicture(this.selectedPicture)
          this.setPictureName(this.selectedPictureName)
          this.setCroppedPicture(this.selectedPicture)
        }
      }
    },

    setImage (event) {
      const file = event.target.files[0]
      this.selectedPicture = file
      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      this.selectedPictureSize = file.size

      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.encodedPicture = e.target.result
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
      pictureName: state => state.pictureName,
      croppedPicture: state => state.croppedPicture,
      cropData: state => state.cropData
    }),

    selectedPictureSizeInMB () {
      return this.selectedPictureSize / 1000000
    },

    /**
     * Returns true if the short description is validated
     * @return {boolean}
     */
    validated () {
      return this.descriptionFirstInteraction ||
        (this.currentShortDescription.length > 0 && this.currentShortDescription.length <= this.maxNbCharacters)
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
  },
  watch: {
    currentShortDescription () {
      this.descriptionFirstInteraction = false
    }
  }
}
</script>

<style>

</style>
