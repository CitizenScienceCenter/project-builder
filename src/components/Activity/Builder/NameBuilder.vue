<template>
<div>
  <b-row align-h="center" class="m-5">
    <h2>Give us a good title for your new activity</h2>
  </b-row>
  <b-row>
    <b-col md="6" offset-md="3" align-h="center">
      <b-form @submit.prevent="onSubmit" ref="form">
        <b-form-group
                id="fieldset-title"
                label="Activity title"
                description="Please write here a good one!"
                label-for="title"
                :valid-feedback="validFeedback"
                :invalid-feedback="invalidFeedback"
                :state="validated"
        >
          <b-form-input id="title" v-model="currentTitle" placeholder="Title"></b-form-input>
        </b-form-group>
        <b-button variant="success" type="submit">Create!</b-button>
      </b-form>
    </b-col>
  </b-row>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NameBuilder',
  data: () => {
    return {
      maxNbCharacters: 25,
      currentTitle: '',
      titleFirstInteraction: true
    }
  },
  props: {
    pid: {
      required: true
    }
  },
  created () {
    this.currentTitle = this.title
  },
  methods: {
    ...mapMutations('activity/builder', [
      'setTitle',
      'setStep'
    ]),

    onSubmit () {
      this.titleFirstInteraction = false
      if (this.validated) {
        this.setTitle(this.currentTitle)
        this.setStep({ step: 'name', value: true })
      }
    }
  },
  computed: {
    validated () {
      return this.titleFirstInteraction || (this.currentTitle.length > 0 && this.currentTitle.length <= this.maxNbCharacters)
    },
    validFeedback () {
      return this.maxNbCharacters - this.currentTitle.length + ' characters left'
    },
    invalidFeedback () {
      return this.currentTitle.length === 0 ? 'You must set a title for your activity' : 'The title length should not exceed ' + this.maxNbCharacters + ' characters'
    },
    ...mapState('activity/builder', {
      title: state => state.title
    })
  },
  watch: {
    currentTitle () {
      this.titleFirstInteraction = false
    }
  }
}
</script>

<style scoped>

</style>
