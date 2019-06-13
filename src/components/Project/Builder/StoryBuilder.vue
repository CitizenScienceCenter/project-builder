<template>
  <div>
    <b-form ref="form" @submit.prevent="onSubmit">
      <b-row class="mt-4">
        <b-col md="9">
          <b-link :to="{ name: 'project.builder.name' }">Go back</b-link>
          <h3 class="mt-3 mb-3">We want to know all about your project!</h3>
          <b-form-group
                  id="fieldset-what-why"
                  label="WHAT & WHY"
                  label-for="what-why"
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'StoryBuilder',
  data: () => {
    return {
      maxNbCharacters: 400,

      currentWhatWhy: '',
      currentHow: '',
      currentWho: '',
      currentKeepTrack: ''
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
      for (let field of fields) {
        if (!this.validated(field)) {
          return false
        }
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
      return this.$data[field].length > 0 && this.$data[field].length <= this.maxNbCharacters
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
  }
}
</script>

<style scoped>

</style>
