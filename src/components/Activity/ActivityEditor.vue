<template>
  <div>
    <b-row class="mt-4 mb-4">

      <b-col md="7">
        <b-form ref="activity-form" @submit.prevent="onSubmit">

          <b-form-group
                  label="Activity data"
                  label-size="lg"
                  label-class="font-weight-bold mb-3"
          >

            <b-form-group
              label="Activity name"
              :valid-feedback="validFeedback('name')"
              :invalid-feedback="invalidFeedback('name')"
              :state="validated('name')">
              <b-input placeholder="Name" v-model="form.name"></b-input>
            </b-form-group>

            <b-form-group
              label="Activity short description"
              :valid-feedback="validFeedback('shortDescription')"
              :invalid-feedback="invalidFeedback('shortDescription')"
              :state="validated('shortDescription')">
              <b-textarea placeholder="Short description" v-model="form.shortDescription"></b-textarea>
            </b-form-group>

            <b-form-group label="Activity category">
              <b-select v-model="form.category" :options="selectCategories"></b-select>
            </b-form-group>

            <b-form-checkbox v-model="form.allowAnonymousContributors">
              Allow anonymous contributors
            </b-form-checkbox>

          </b-form-group>

          <!-- WhatWhy, How, Who, Keep Track -->
          <b-form-group
            label-size="lg"
            label-class="mb-3"
            label="Activity long description"
          >

            <b-form-group
              label="What & Why"
              :valid-feedback="validFeedback('whatWhy')"
              :invalid-feedback="invalidFeedback('whatWhy')"
              :state="validated('whatWhy')">
              <b-textarea v-model="form.whatWhy"></b-textarea>
            </b-form-group>

            <b-form-group
              label="How"
              :valid-feedback="validFeedback('how')"
              :invalid-feedback="invalidFeedback('how')"
              :state="validated('how')">
              <b-textarea v-model="form.how"></b-textarea>
            </b-form-group>

            <b-form-group
              label="Who"
              :valid-feedback="validFeedback('who')"
              :invalid-feedback="invalidFeedback('who')"
              :state="validated('who')">
              <b-textarea v-model="form.who"></b-textarea>
            </b-form-group>

            <b-form-group
              label="Keep Track"
              :valid-feedback="validFeedback('keepTrack')"
              :invalid-feedback="invalidFeedback('keepTrack')"
              :state="validated('keepTrack')">
              <b-textarea v-model="form.keepTrack"></b-textarea>
            </b-form-group>

          </b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary" class="">Update activity data</b-button>
          </div>

        </b-form>
      </b-col>

      <!-- Avatar update -->
      <b-col md="5" class="mt-md-0 mt-5">
        <b-form ref="picture-form" @submit.prevent="onPictureSubmit">
          <b-form-group :description="'Authorized formats: .jpg, .png, .gif, .svg. Maximum file size: ' + maxPictureSizeInMb + 'MB.'"
                        :state="pictureSizeInMb <= maxPictureSizeInMb"
                        invalid-feedback="The picture is too big"
          >
            <vue-cropper v-show="(('info' in activity) && ('thumbnail_url' in activity.info)) || picture" ref="cropper" :view-mode="2" :autoCropArea="1" :aspectRatio="4/3"></vue-cropper>
            <b-form-file @change="setImage" accept=".jpg, .png, .gif, .svg" placeholder="Choose a picture..." drop-placeholder="Drop picture here..."></b-form-file>
          </b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary">Update activity avatar</b-button>
          </div>
        </b-form>
      </b-col>

    </b-row>

    <!-- Delete activity -->
    <b-row class="mt-5 mb-4">
      <b-col>
        <b-alert :show="true" variant="danger" class="text-center">
          <b>Danger Zone!</b> If you delete the activity and its tasks, it will be gone forever!<br>
          <b-button v-b-modal.modal-delete-activity variant="danger" class="mt-3">Delete Activity</b-button>
        </b-alert>
        <b-modal  @ok="onDeleteActivitySubmit" id="modal-delete-activity" title="Delete the activity">
          Are you sure you want to delete this activity and all its tasks and associated task runs?
        </b-modal>
      </b-col>
    </b-row>

  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import VueCropper from 'vue-cropperjs'
import slug from 'slug'
import { getFormErrorsAsString, uuid } from '@/helper'

export default {
  name: 'ActivityEditor',
  components: {
    VueCropper
  },
  mounted () {
    if (Object.keys(this.activity).length > 0) {
      this.initForm(this.activity)
    }
    this.getCategories()
  },
  watch: {
    activity (activity) {
      if (Object.keys(activity).length > 0) {
        this.initForm(activity)
      }
    }
  },
  data: () => {
    return {
      form: {
        name: '',
        shortDescription: '',
        category: '',
        whatWhy: '',
        how: '',
        who: '',
        keepTrack: '',
        allowAnonymousContributors: true
      },

      picture: '',
      croppedPicture: '',
      pictureSize: 0,
      maxPictureSizeInMb: 2,

      validation: {
        name: {
          maxLength: 25
        },
        shortDescription: {
          maxLength: 120
        },
        whatWhy: {
          maxLength: 400
        },
        how: {
          maxLength: 400
        },
        who: {
          maxLength: 400
        },
        keepTrack: {
          maxLength: 400
        }
      }
    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivity',
      'deleteActivity',
      'uploadAvatar',
      'updateActivity',
      'getCategories'
    ]),
    ...mapMutations('notification', [
      'showSuccess', 'showError', 'showInfo'
    ]),

    initForm (activity) {
      this.form.name = activity.name
      this.form.shortDescription = activity.description
      this.form.category = activity.category_id
      this.form.allowAnonymousContributors = activity.allow_anonymous_contributors

      this.form = { ...this.form, ...JSON.parse(activity.long_description) }

      if ('info' in activity && 'thumbnail_url' in activity.info) {
        // uuid used to avoid cache loading which make CORS issues
        this.picture = activity.info.thumbnail_url + '?id=' + uuid()
        this.$refs.cropper.replace(this.picture)
      }
    },

    /**
     * Update the activity data
     */
    onSubmit () {
      if (this.isFormValid()) {

        this.updateActivity({
          activity: this.activity,
          form: {
            name: this.form.name,
            short_name: slug(this.form.name, { lower: true, replacement: '_' }),
            description: this.form.shortDescription,
            category_id: this.form.category,
            long_description: JSON.stringify({
              whatWhy: this.form.whatWhy,
              how: this.form.how,
              who: this.form.who,
              keepTrack: this.form.keepTrack
            }),
            allow_anonymous_contributors: this.form.allowAnonymousContributors
          }
        }).then(response => {
          if ('form' in response && 'errors' in response.form) {
            this.showError({
              title: 'Error',
              content: getFormErrorsAsString(response.form.errors)
            })
          } else {
            this.showSuccess({
              title: 'Success',
              content: 'Activity data updated'
            })
            this.getActivity(this.activity.id) // reload the activity
          }
        })
      } else {
        this.showError({
          title: 'Incomplete form',
          content: 'All the fields must be validated to update the activity data'
        })
      }

    },

    /**
     * Update the activity avatar
     */
    onPictureSubmit () {
      // check if a picture is selected
      if (this.picture) {
        // check if the size of the picture is correct
        if (this.pictureSizeInMb <= this.maxPictureSizeInMb) {
          this.croppedPicture = this.$refs.cropper.getCroppedCanvas().toDataURL()

          this.uploadAvatar({
            activity: this.activity,
            image: this.croppedPicture
          }).then(response => {
            if (response) {
              this.showSuccess({
                title: 'Success',
                content: 'Activity picture updated'
              })
              this.getActivity(this.activity.id)
              this.$refs.cropper.replace(this.croppedPicture)
            }
          })
        } else {
          this.showError({
            title: 'Picture too big',
            content: 'Your picture must be less than ' + this.maxPictureSizeInMb + 'MB'
          })
        }
      } else {
        this.showError({
          title: 'Picture not selected',
          content: 'You must select a picture to upload it'
        })
      }
    },

    /**
     * Delete the current activity
     */
    onDeleteActivitySubmit () {
      this.deleteActivity(this.activity).then(response => {
        if (response) {
          this.$router.push({ name: 'profile' })
        }
      })
    },

    /**
     * Called each time a new picture is selected
     * @param event
     */
    setImage (event) {
      const file = event.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      this.pictureSize = file.size

      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.picture = e.target.result
          this.$refs.cropper.replace(this.picture)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    /**
     * Check if the activity data form is valid
     * @returns {boolean}
     */
    isFormValid () {
      const formKeys = Object.keys(this.form).filter(el => el !== 'category' && el !== 'allowAnonymousContributors')
      let isValidated = true

      for (let field of formKeys) {
        if (!this.validated(field)) {
          isValidated = false
        }
      }
      return isValidated
    },

    validated (field) {
      return this.$data['form'][field].length > 0 && this.$data['form'][field].length <= this.validation[field].maxLength
    },
    validFeedback (field) {
      return this.validation[field].maxLength - this.$data['form'][field].length + ' characters left'
    },
    invalidFeedback (field) {
      return this.$data['form'][field].length === 0 ? 'This field is mandatory' : 'This field should not exceed ' + this.validation[field].maxLength + ' characters'
    }
  },
  computed: {
    ...mapState('activity', {
      activity: state => state.selectedActivity,
      categories: state => state.categories
    }),

    selectCategories () {
      return this.categories.map(category => {
        return {
          value: category.id,
          text: category.name
        }
      })
    },

    pictureSizeInMb () {
      return this.pictureSize / 1000000
    }
  }
}
</script>

<style scoped>

</style>
