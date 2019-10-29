<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <NameBuilder v-if="currentStep === 'name'"></NameBuilder>
    <InformationBuilder v-if="currentStep === 'information'"></InformationBuilder>
    <StoryBuilder v-if="currentStep === 'story'"></StoryBuilder>
    <SummaryBuilder v-if="currentStep === 'end'"></SummaryBuilder>
  </div>
</template>

<script>
import NameBuilder from '@/components/Activity/Builder/NameBuilder'
import InformationBuilder from '@/components/Activity/Builder/InformationBuilder'
import StoryBuilder from '@/components/Activity/Builder/StoryBuilder'

import { mapState, mapActions, mapMutations } from 'vuex'
import SummaryBuilder from '@/components/Activity/Builder/SummaryBuilder'

export default {
  name: 'ActivityBuilder',
  components: {
    SummaryBuilder,
    StoryBuilder,
    InformationBuilder,
    NameBuilder
  },
  data () {
    return {

    }
  },
  props: {
    pid: {
      required: true
    }
  },
  methods: {
    ...mapActions('task/builder', {
      resetTaskBuilder: 'reset'
    }),
    ...mapMutations('activity/builder', [
      'setCurrentStep', 'setStep'
    ]),
    ...mapMutations('task', [
      'setTaskPresenter'
    ]),
    ...mapActions('activity', [
      'createActivity', 'uploadAvatar'
    ]),
    ...mapMutations('notification', [
      'showError'
    ])
  },
  computed: {
    ...mapState('activity/builder', [
      'currentStep', 'steps', 'title', 'shortDescription', 'story', 'picture', 'croppedPicture'
    ]),
    items () {
      return [
        {
          text: 'Name',
          to: { name: 'activity.builder.name' },
          active: this.currentStep === 'name'
        },
        {
          text: 'Information',
          to: { name: 'activity.builder.information' },
          active: this.currentStep === 'information',
          disabled: this.currentStep === 'name'
        },
        {
          text: 'Story',
          to: { name: 'activity.builder.story' },
          active: this.currentStep === 'story',
          disabled: true
        }
      ]
    }
  },
  watch: {
    steps (newVal, oldVal) {
      if (this.currentStep === 'name' && newVal['name'] === true) {

        this.$router.push({ name: 'activity.builder.information' })

      } else if (this.currentStep === 'information' && newVal['information'] === true) {

        this.$router.push({ name: 'activity.builder.story' })

      } else if (this.currentStep === 'story' && newVal['story'] === true) {

        const image = this.croppedPicture

        this.createActivity({
          name: this.title,
          shortDescription: this.shortDescription,
          longDescription: JSON.stringify({
            whatWhy: this.story.whatWhy,
            how: this.story.how,
            who: this.story.who,
            keepTrack: this.story.keepTrack
          })
        }).then(activity => {

          if (activity) {

            // if it fails, a message will say to the user that he can update it again later...
            if (image.length > 0) {
              this.uploadAvatar({ activity, image })
            }

            this.resetTaskBuilder()
            this.setTaskPresenter('')
            this.$router.push({name: 'activity.builder.end'})
          } else {
            this.setCurrentStep(this.steps.name)
            this.setStep({ step: 'name', value: false })
          }

        })

      } else if (this.currentStep !== 'end') {
        this.$router.push({ name: 'activity.builder.name' })
      }
    }
  }
}
</script>

<style scoped>

</style>
