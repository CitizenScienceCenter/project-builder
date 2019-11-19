<template>
<div>

  <app-content-section>
    <div class="content-subsection">
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 col-xlarge-4 scroll-effect">

            <h2 class="heading centered">Project Title</h2>

            <form @submit.prevent="onSubmit">

              <div class="form-field form-field-block">
                <label>Title</label>
                <input v-model="currentTitle" autocomplete="new-password" />
                <span v-if="validated && validFeedback" class="message success">{{validFeedback}}</span>
                <span v-if="!validated && invalidFeedback" class="message error">{{invalidFeedback}}</span>
              </div>

              <div class="button-group right-aligned">
                <button type="submit" class="button button-primary">Create</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  </app-content-section>


  <!--
  <b-row align-h="center" class="m-5">
    <h2>Give us a good title for your new project</h2>
  </b-row>
  <b-row>
    <b-col md="6" offset-md="3" align-h="center">
      <b-form @submit.prevent="onSubmit" ref="form">
        <b-form-group
                id="fieldset-title"
                label="project title"
                description="Please write a good one!"
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
  -->

</div>
</template>

<script>


import ContentSection from '@/components/shared/ContentSection.vue';

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NameBuilder',
  components: {
    'app-content-section': ContentSection
  },
  data: () => {
    return {
      maxNbCharacters: 25,
      currentTitle: '',
      titleFirstInteraction: true
    }
  },
  props: {
  },
  created () {
    this.currentTitle = this.title
  },
  methods: {
    ...mapMutations('project/builder', [
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
      return this.currentTitle.length === 0 ? 'You must set a title for your project' : 'The title length should not exceed ' + this.maxNbCharacters + ' characters'
    },
    ...mapState('project/builder', {
      title: state => state.title
    },
      'config', ['projectId'])
  },
  watch: {
    currentTitle () {
      this.titleFirstInteraction = false
    }
  }
}
</script>

<style>

</style>
