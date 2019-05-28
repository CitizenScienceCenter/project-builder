<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <NameBuilder v-if="currentStep === 'name'"></NameBuilder>
    <InformationBuilder v-if="currentStep === 'information'"></InformationBuilder>
    <StoryBuilder v-if="currentStep === 'story'"></StoryBuilder>
    <EndBuilder v-if="currentStep === 'end'"></EndBuilder>
  </div>
</template>

<script>
import NameBuilder from '@/components/Project/Builder/NameBuilder'
import InformationBuilder from '@/components/Project/Builder/InformationBuilder'
import StoryBuilder from '@/components/Project/Builder/StoryBuilder'

import { mapState, mapActions } from 'vuex'
import EndBuilder from '@/components/Project/Builder/EndBuilder'

export default {
  name: 'ProjectBuilder',
  components: {EndBuilder, StoryBuilder, InformationBuilder, NameBuilder},
  data () {
    return {

    }
  },
  methods: {
    ...mapActions('task/builder', {
      resetTaskBuilder: 'reset'
    })
  },
  computed: {
    ...mapState('project/builder', [
      'currentStep', 'steps', 'title', 'shortDescription', 'picture', 'story'
    ]),
    items () {
      return [
        {
          text: 'Name',
          to: { name: 'project.builder.name' },
          active: this.currentStep === 'name'
        },
        {
          text: 'Information',
          to: { name: 'project.builder.information' },
          active: this.currentStep === 'information',
          disabled: this.currentStep === 'name'
        },
        {
          text: 'Story',
          to: { name: 'project.builder.story' },
          active: this.currentStep === 'story',
          disabled: true
        }
      ]
    }
  },
  watch: {
    steps (newVal, oldVal) {
      if (this.currentStep === 'name' && newVal['name'] === true) {

        this.$router.push({ name: 'project.builder.information' })

      } else if (this.currentStep === 'information' && newVal['information'] === true) {

        this.$router.push({ name: 'project.builder.story' })

      } else if (this.currentStep === 'story' && newVal['story'] === true) {

        this.$store.dispatch('project/createProject', {
          name: this.title,
          shortDescription: this.shortDescription,
          longDescription: JSON.stringify({
            whatWhy: this.story.whatWhy,
            how: this.story.how,
            who: this.story.who,
            keepTrack: this.story.keepTrack
          })
        }).then(project => {

          // if project successfully created
          if (project) {
            this.resetTaskBuilder()
            this.$router.push({name: 'project.builder.end'})
          }

        })

      } else if (this.currentStep !== 'end') {
        this.$router.push({ name: 'project.builder.name' })
      }
    }
  }
}
</script>

<style scoped>

</style>
