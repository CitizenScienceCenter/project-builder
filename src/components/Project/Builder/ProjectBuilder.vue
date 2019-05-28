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

import { mapState, mapActions, mapMutations } from 'vuex'
import EndBuilder from '@/components/Project/Builder/EndBuilder'

export default {
  name: 'ProjectBuilder',
  components: {
    EndBuilder,
    StoryBuilder,
    InformationBuilder,
    NameBuilder
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapActions('task/builder', {
      resetTaskBuilder: 'reset'
    }),
    ...mapActions('project', [
      'createProject', 'getProjectUpdateOptions', 'uploadAvatar'
    ]),
    ...mapMutations('notification', [
      'showError'
    ])
  },
  computed: {
    ...mapState('project/builder', [
      'currentStep', 'steps', 'title', 'shortDescription', 'story', 'picture', 'croppedPicture'
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

        const image = this.croppedPicture

        this.createProject({
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

            // upload the project avatar picture
            this.getProjectUpdateOptions(project).then(response => {
              // checks if the csrf token is present to send upload action
              if (response.hasOwnProperty('upload_form') && response.upload_form.hasOwnProperty('csrf')) {
                this.uploadAvatar({ project, image })
              } else {
                this.showError({ title: 'Avatar upload failed', content: 'Impossible to upload your project picture. You can try to upload it later...' })
              }
            })

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
