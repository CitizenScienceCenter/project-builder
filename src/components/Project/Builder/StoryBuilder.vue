<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">

              <div class="margin-bottom">
                <router-link class="button button-secondary button-secondary-naked" :to="{ name: 'project.builder.information' }" style="padding:0">Go Back</router-link>
              </div>

              <h2 class="heading centered">We want to know all about your project!</h2>

              <form @submit.prevent="onSubmit">

                <div class="form-field form-field-block">
                  <label>Project Purpose</label>
                  <growing-textarea v-model="currentWhatWhy" placeholder="What is the purpose of your project."></growing-textarea>
                  <span v-if="validated('currentWhatWhy') && validFeedback('currentWhatWhy')" class="message success">{{validFeedback('currentWhatWhy')}}</span>
                  <span v-if="!validated('currentWhatWhy') && invalidFeedback('currentWhatWhy')" class="message error">{{invalidFeedback('currentWhatWhy')}}</span>
                </div>

                <div class="form-field form-field-block">
                  <label>Usage of Results</label>
                  <growing-textarea v-model="currentHow" placeholder="How you will use the contribution results."></growing-textarea>
                  <span v-if="validated('currentHow') && validFeedback('currentHow')" class="message success">{{validFeedback('currentHow')}}</span>
                  <span v-if="!validated('currentHow') && invalidFeedback('currentHow')" class="message error">{{invalidFeedback('currentHow')}}</span>
                </div>

                <div class="form-field form-field-block">
                  <label>Who should contribute</label>
                  <growing-textarea v-model="currentWho" placeholder="Explain who should contribute to this project."></growing-textarea>
                  <span v-if="validated('currentWho') && validFeedback('currentWho')" class="message success">{{validFeedback('currentWho')}}</span>
                  <span v-if="!validated('currentWho') && invalidFeedback('currentWho')" class="message error">{{invalidFeedback('currentWho')}}</span>
                </div>

                <div class="form-field form-field-block">
                  <label>Contact Information</label>
                  <growing-textarea v-model="currentKeepTrack" placeholder="Your Email, Phone, Address, ..."></growing-textarea>
                  <span v-if="validated('currentKeepTrack') && validFeedback('currentKeepTrack')" class="message success">{{validFeedback('currentKeepTrack')}}</span>
                  <span v-if="!validated('currentKeepTrack') && invalidFeedback('currentKeepTrack')" class="message error">{{invalidFeedback('currentKeepTrack')}}</span>
                </div>

                <div class="button-group right-aligned">
                  <button type="submit" class="button button-primary" :disabled="
                    !validated('currentWhatWhy') ||
                    !validated('currentHow') ||
                    !validated('currentWho') ||
                    !validated('currentKeepTrack') ||
                    firstInteraction.currentWhatWhy ||
                    firstInteraction.currentHow ||
                    firstInteraction.currentWho ||
                    firstInteraction.currentKeepTrack
                    ">Next Step</button>
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
          <h3 class="mt-3 mb-3">We want to know all about your project!</h3>

          <b-form-group
                  id="fieldset-what-why"
                  label="WHAT & WHY"
                  label-for="what-why"
                  description="Explain what is the purpose of your project and why you have created it"
                  :valid-feedback="validFeedback('currentWhatWhy')"
                  :invalid-feedback="invalidFeedback('currentWhatWhy')"
                  :state="validated('currentWhatWhy')"
          >
            <b-form-textarea
                    id="what-why"
                    size="lg"
                    v-model="currentWhatWhy"
            >
            </b-form-textarea>
          </b-form-group>

          <b-form-group
                  id="fieldset-how"
                  label="HOW"
                  label-for="how"
                  description="Explain how you will use the contribution results"
                  :valid-feedback="validFeedback('currentHow')"
                  :invalid-feedback="invalidFeedback('currentHow')"
                  :state="validated('currentHow')"
          >
            <b-form-textarea
                    id="how"
                    size="lg"
                    v-model="currentHow"
            >
            </b-form-textarea>
          </b-form-group>

          <b-form-group
                  id="fieldset-who"
                  label="WHO"
                  label-for="who"
                  description="Explain who should contribute to this project"
                  :valid-feedback="validFeedback('currentWho')"
                  :invalid-feedback="invalidFeedback('currentWho')"
                  :state="validated('currentWho')"
          >
            <b-form-textarea
                    id="who"
                    size="lg"
                    v-model="currentWho"
            >
            </b-form-textarea>
          </b-form-group>

          <b-form-group
                  id="fieldset-keep-track"
                  label="KEEP TRACK"
                  label-for="keep-track"
                  description="Give some details about how contributors can contact or follow you (i.e. e-mail, Facebook page, Twitter handle, etc.)"
                  :valid-feedback="validFeedback('currentKeepTrack')"
                  :invalid-feedback="invalidFeedback('currentKeepTrack')"
                  :state="validated('currentKeepTrack')"
          >
            <b-form-textarea
                    id="keep-track"
                    size="lg"
                    v-model="currentKeepTrack"
            >
            </b-form-textarea>
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
import GrowingTextarea from "@/components/shared/GrowingTextarea";

export default {
  name: 'StoryBuilder',
  components: {
    GrowingTextarea,
    'app-content-section': ContentSection
  },
  data: () => {
    return {
      maxNbCharacters: 400,

      currentWhatWhy: '',
      currentHow: '',
      currentWho: '',
      currentKeepTrack: '',

      firstInteraction: {
        currentWhatWhy: true,
        currentHow: true,
        currentWho: true,
        currentKeepTrack: true
      }
    }
  },
  created () {
    this.currentWhatWhy = this.whatWhy
    this.currentHow = this.how
    this.currentWho = this.who
    this.currentKeepTrack = this.keepTrack
  },
  methods: {
    ...mapMutations('project/builder', [
      'setStory',
      'setStep'
    ]),

    onSubmit () {
      const fields = ['currentWhatWhy', 'currentHow', 'currentWho', 'currentKeepTrack']
      let isValid = true

      for (let field of fields) {
        this.firstInteraction[field] = false
        if (!this.validated(field)) {
          isValid = false
        }
      }

      if (!isValid) {
        return false
      }

      this.setStory({
        whatWhy: this.currentWhatWhy,
        how: this.currentHow,
        who: this.currentWho,
        keepTrack: this.currentKeepTrack
      })

      this.setStep({ step: 'story', value: true })
    },

    validated (field) {
      return this.firstInteraction[field] || (this.$data[field].length > 0 && this.$data[field].length <= this.maxNbCharacters)
    },
    validFeedback (field) {
      return this.maxNbCharacters - this.$data[field].length + ' characters left'
    },
    invalidFeedback (field) {
      return this.$data[field].length === 0 ? 'This field is mandatory' : 'This field should not exceed ' + this.maxNbCharacters + ' characters'
    }
  },
  computed: {
    ...mapState('project/builder', {
      whatWhy: state => state.story.whatWhy,
      how: state => state.story.how,
      who: state => state.story.who,
      keepTrack: state => state.story.keepTrack
    })
  },
  watch: {
    currentWhatWhy () {
      this.firstInteraction.currentWhatWhy = false
    },
    currentHow () {
      this.firstInteraction.currentHow = false
    },
    currentWho () {
      this.firstInteraction.currentWho = false
    },
    currentKeepTrack () {
      this.firstInteraction.currentKeepTrack = false
    }
  }
}
</script>

<style scoped>

</style>
