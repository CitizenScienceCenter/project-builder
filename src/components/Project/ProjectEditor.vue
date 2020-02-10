<template>
  <div>

    <h2 class="heading centered">Edit Project</h2>

    <div class="content-subsection">
      <form @submit.prevent="onSubmit">

        <div class="form-field form-field-block">
          <label>Project Name</label>
          <input type="text" v-model="form.name" autocomplete="new-password" />
          <span v-if="validated('name') && validFeedback('name')" class="message success">{{validFeedback('name')}}</span>
          <span v-if="!validated('name') && invalidFeedback('name')" class="message error">{{invalidFeedback('name')}}</span>
        </div>

        <div class="form-field form-field-block">
          <label>Short Description</label>
          <growing-textarea v-model="form.shortDescription" placeholder="Please write a short description ..."></growing-textarea>
          <span v-if="validated('shortDescription') && validFeedback('shortDescription')" class="message success">{{validFeedback('shortDescription')}}</span>
          <span v-if="!validated('shortDescription') && invalidFeedback('shortDescription')" class="message error">{{invalidFeedback('shortDescription')}}</span>
        </div>

        <h3 class="subheading centered">Project Information</h3>

        <div class="form-field form-field-block">
          <label>Project Purpose</label>
          <growing-textarea v-model="form.whatWhy" placeholder="What is the purpose of your project."></growing-textarea>
          <span v-if="validated('whatWhy') && validFeedback('whatWhy')" class="message success">{{validFeedback('whatWhy')}}</span>
          <span v-if="!validated('whatWhy') && invalidFeedback('whatWhy')" class="message error">{{invalidFeedback('whatWhy')}}</span>
        </div>

        <div class="form-field form-field-block">
          <label>Usage of Results</label>
          <growing-textarea v-model="form.how" placeholder="How you will use the contribution results."></growing-textarea>
          <span v-if="validated('how') && validFeedback('how')" class="message success">{{validFeedback('how')}}</span>
          <span v-if="!validated('how') && invalidFeedback('how')" class="message error">{{invalidFeedback('how')}}</span>
        </div>

        <div class="form-field form-field-block">
          <label>Who should contribute</label>
          <growing-textarea v-model="form.who" placeholder="Explain who should contribute to this project."></growing-textarea>
          <span v-if="validated('who') && validFeedback('who')" class="message success">{{validFeedback('who')}}</span>
          <span v-if="!validated('who') && invalidFeedback('who')" class="message error">{{invalidFeedback('who')}}</span>
        </div>

        <div class="form-field form-field-block">
          <label>Contact Information</label>
          <growing-textarea v-model="form.keepTrack" placeholder="Your Email, Phone, Address, ..."></growing-textarea>
          <span v-if="validated('keepTrack') && validFeedback('keepTrack')" class="message success">{{validFeedback('keepTrack')}}</span>
          <span v-if="!validated('keepTrack') && invalidFeedback('keepTrack')" class="message error">{{invalidFeedback('keepTrack')}}</span>
        </div>

        <div class="button-group right-aligned">
          <submit-button :submissionInfo="infoSaved" infoMessage="Saved" :disabled="
                        !validated('name') ||
                        !validated('shortDescription') ||
                        !validated('whatWhy') ||
                        !validated('how') ||
                        !validated('who') ||
                        !validated('keepTrack')
                        ">
            Save
          </submit-button>
          <!--
          <button type="submit" class="button button-primary" :disabled="
                        !validated('name') ||
                        !validated('shortDescription') ||
                        !validated('whatWhy') ||
                        !validated('how') ||
                        !validated('who') ||
                        !validated('keepTrack')
                        ">Save</button>
                        -->
        </div>

      </form>
    </div>

    <div class="content-subsection">
      <form @submit.prevent="onPictureSubmit">

        <h3 class="subheading centered">Project Image</h3>

        <div class="form-field form-field-block">
          <label>Image</label>
          <input type="file" accept=".jpg, .png, .gif, .svg" placeholder="Select a picture ..." @change="setImage" />
          <span class="message error" v-if="pictureSizeInMb > maxPictureSizeInMb">The picture is too big in file size.</span>
          <span class="message info">Authorized formats: .jpg, .png, .gif, .svg. <br>The picture must not exceed {{ maxPictureSizeInMb }} MB.</span>
        </div>

        <div v-if="pictureSizeInMb <= maxPictureSizeInMb && picture" class="margin-bottom">
          <img :src="picture"/>
        </div>

        <div class="button-group right-aligned">
          <submit-button :submissionInfo="imageUploaded" infoMessage="changed" :disabled="!selectedFile">
            Change
          </submit-button>
        </div>

      </form>
    </div>

    <div class="content-subsection">

        <h3 class="subheading centered">Delete Project</h3>

        <div class="form-field form-message form-message-error">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336,432a80,80,0,1,1-80-80A80.09,80.09,0,0,1,336,432ZM185.26,25.2l13.6,272a24,24,0,0,0,24,22.8h66.34a24,24,0,0,0,24-22.8l13.6-272a24,24,0,0,0-24-25.2H209.23A24,24,0,0,0,185.26,25.2Z"/></svg>
          </div>
          <span class="text">If you delete the project and its tasks, it will be gone forever!</span>
        </div>


          <template v-if="!deleteProjectConfirmation">
            <div class="button-group centered">
              <button @click="onDeleteprojectSubmit" class="button button-secondary">Delete the Project</button>
            </div>
          </template>

          <template v-else>
            <p class="centered reduced-bottom-margin">
              Are you sure?
            </p>
            <div class="button-group centered">
              <button @click="deleteProject" class="button button-secondary">Delete Project</button>
              <button @click="deleteProjectConfirmation = false" class="button button-secondary button-secondary-naked">Cancel</button>
            </div>
          </template>


    </div>


    <!--

    <br>
    <br>
    <br>

    <b-row class="mt-4 mb-4">

      <b-col md="7">
        <b-form ref="project-form" @submit.prevent="onSubmit">

          <b-form-group
                  label="Project Information"
                  label-size="lg"
                  label-class="font-weight-bold mb-3"
          >

            <b-form-group
              label="Project Name"
              :valid-feedback="validFeedback('name')"
              :invalid-feedback="invalidFeedback('name')"
              :state="validated('name')">
              <b-input placeholder="Name" v-model="form.name"></b-input>
            </b-form-group>

            <b-form-group
              label="Project Tagline"
              :valid-feedback="validFeedback('shortDescription')"
              :invalid-feedback="invalidFeedback('shortDescription')"
              :state="validated('shortDescription')">
              <b-textarea placeholder="Short description" v-model="form.shortDescription"></b-textarea>
            </b-form-group>

            <b-form-checkbox v-model="form.allowAnonymousContributors">
              Allow anonymous contributors
            </b-form-checkbox>

          </b-form-group>


          <b-form-group
            label-size="lg"
            label-class="mb-3"
            label="Project Description"
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
            <b-button type="submit" variant="primary" class="">Update Project Info</b-button>
          </div>

        </b-form>
      </b-col>


      <b-col md="5" class="mt-md-0 mt-5">
        <b-form ref="picture-form" @submit.prevent="onPictureSubmit">
          <b-form-group :description="'Authorized formats: .jpg, .png, .gif, .svg. Maximum file size: ' + maxPictureSizeInMb + 'MB.'"
                        :state="pictureSizeInMb <= maxPictureSizeInMb"
                        invalid-feedback="The picture is too big"
          >


            <vue-cropper v-show="(('info' in project) && ('thumbnail_url' in project.info)) || picture" ref="cropper" :view-mode="2" :autoCropArea="1" :aspectRatio="4/3"></vue-cropper>


            <img :src="picture"/>


            <b-form-file @change="setImage" accept=".jpg, .png, .gif, .svg" placeholder="Choose a picture..." drop-placeholder="Drop picture here..."></b-form-file>
          </b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary">Update Project Avatar</b-button>
          </div>
        </b-form>
      </b-col>

    </b-row>

    <b-row class="mt-5 mb-4">
      <b-col>
        <b-alert :show="true" variant="danger" class="text-center">
          <b>Danger Zone!</b> If you delete the project and its tasks, it will be gone forever!<br>
          <b-button v-b-modal.modal-delete-project variant="danger" class="mt-3">Delete Project</b-button>
        </b-alert>
        <b-modal  @ok="onDeleteprojectSubmit" id="modal-delete-project" title="Delete the project">
          Are you sure you want to delete this project and all its tasks and associated submissions?
        </b-modal>
      </b-col>
    </b-row>
    -->

  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import slug from 'slug'
import { getFormErrorsAsString, uuid } from '@/helper'
import GrowingTextarea from "@/components/shared/GrowingTextarea";
import SubmitButton from "@/components/shared/SubmitButton";

export default {
  name: 'ProjectEditor',
  components: {
    SubmitButton,
    GrowingTextarea
  },
  mounted () {
    if (Object.keys(this.project).length > 0) {
      this.initForm(this.project)
    }
  },
  watch: {
    project (project) {
      if (Object.keys(project).length > 0) {
        this.initForm(project)
      }
    }
  },
  data: () => {
    return {
      form: {
        name: '',
        shortDescription: '',
        whatWhy: '',
        how: '',
        who: '',
        keepTrack: '',
        allowAnonymousContributors: true
      },
      selectedFile: undefined,
      picture: '',
      croppedPicture: '',
      pictureSize: 0,
      pictureName: '',
      pictureType: '',
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
      },

      infoSaved: false,
      imageUploaded: false,

      deleteProjectConfirmation: false
    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject',
      'deleteProject',
      'updateProject'
    ]),
    ...mapActions('c3s/media', [
      'uploadMedia',
      'deleteMedium'
    ]),
    ...mapMutations('notification', [
      'showSuccess', 'showError', 'showInfo'
    ]),

    initForm (project) {
      this.form.name = project.name
      this.form.shortDescription = project.info.shortDescription
      this.form.allowAnonymousContributors = project.anonymous_allowed

      this.form = { ...this.form, ...JSON.parse(project.description) }
    },

    /**
     * Update the project data
     */
    onSubmit () {
      if (this.isFormValid()) {

        let newProjectData = {};
        newProjectData['name'] = this.form.name;
        newProjectData['info'] = Object.assign( {}, this.project.info );
        newProjectData['info']['shortDescription'] = this.form.shortDescription;
        newProjectData['description'] = {};
        newProjectData['description']['whatWhy'] = this.form.whatWhy;
        newProjectData['description']['how'] = this.form.how;
        newProjectData['description']['who'] = this.form.who;
        newProjectData['description']['keepTrack'] = this.form.keepTrack;
        newProjectData['description'] = JSON.stringify( newProjectData['description'] );

        this.$store.dispatch('c3s/project/updateProject', [this.project.id, newProjectData]).then( res => {
          this.infoSaved = true;
          let self = this;
          setTimeout( function() {
            self.infoSaved = false;
          }, 1000);
        });

        /*
        this.updateProject({
          project: this.project,
          form: {
            name: this.form.name,
            description: this.form.shortDescription,
            long_description: JSON.stringify({
              whatWhy: this.form.whatWhy,
              how: this.form.how,
              who: this.form.who,
              keepTrack: this.form.keepTrack
            }),
            anonymous_allowed: this.form.allowAnonymousContributors
          }
        }).then(response => {
          console.log('update response');
          console.log( response );
          if ('form' in response && 'errors' in response.form) {
            this.showError({
              title: 'Error',
              content: getFormErrorsAsString(response.form.errors)
            })
          } else {
            this.showSuccess({
              title: 'Success',
              content: 'project data updated'
            })
            this.getProject(this.project.id) // reload the project
          }
        })
      } else {
        this.showError({
          title: 'Incomplete form',
          content: 'All the fields must be validated to update the project data'
        })

         */
      }
    },

    /**
     * Update the project avatar
     */
    onPictureSubmit () {
      // check if a picture is selected
      if (this.selectedFile) {
        // check if the size of the picture is correct
        if (this.pictureSizeInMb <= this.maxPictureSizeInMb) {

          this.$store.dispatch('c3s/media/uploadMedia',[
            this.project.id,
            'project',
            this.selectedFile
          ]).then(response => {
            if (response) {

              /*
              this.showSuccess({
                title: 'Success',
                content: 'Project picture updated'
              })
              */

              this.imageUploaded = true;
              let self = this;
              setTimeout( function() {
                self.imageUploaded = false;
              }, 1000);

              this.selectedFile = undefined

              this.$emit('refreshMedia');

              //this.getProjectMedia(this.project.id)
            }
          })

        }
        else {
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
     * Delete the current project
     */
    onDeleteprojectSubmit () {
      this.deleteProjectConfirmation = true;
    },
    deleteProject() {
      console.log('delete project')
      this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'active':false}]).then((res) => {
        this.$router.push('/');
      });
    },

    /**
     * Called each time a new picture is selected
     * @param event
     */
    setImage (event) {
      const file = event.target.files[0]
      this.selectedFile = file

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      this.pictureName = file.name
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.picture = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    /**
     * Check if the project data form is valid
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
    ...mapState('c3s/project', {
      project: state => state.project
    },
    ),

    pictureSizeInMb () {
      return this.selectedFile ? this.selectedFile.size / 1000000 : 0
    }
  }
}
</script>

<style>

</style>
