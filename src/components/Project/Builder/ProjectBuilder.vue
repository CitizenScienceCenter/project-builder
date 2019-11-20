<i18n>
  {
  "en": {

  "page-title": "Create a Project"

  }
  }
</i18n>

<template>
  <div>

    <NameBuilder v-if="currentStep === 'name'"></NameBuilder>
    <InformationBuilder v-if="currentStep === 'information'"></InformationBuilder>
    <StoryBuilder v-if="currentStep === 'story'"></StoryBuilder>
    <SummaryBuilder v-if="currentStep === 'end'"></SummaryBuilder>

    <!--
    <b-breadcrumb :items="items"></b-breadcrumb>
    <NameBuilder v-if="currentStep === 'name'"></NameBuilder>
    <InformationBuilder v-if="currentStep === 'information'"></InformationBuilder>
    <StoryBuilder v-if="currentStep === 'story'"></StoryBuilder>
    <SummaryBuilder v-if="currentStep === 'end'"></SummaryBuilder>
    -->

    <app-footer></app-footer>
  </div>
</template>

<script>

import Footer from '@/components/shared/Footer.vue';

import NameBuilder from '@/components/Project/Builder/NameBuilder'
import InformationBuilder from '@/components/Project/Builder/InformationBuilder'
import StoryBuilder from '@/components/Project/Builder/StoryBuilder'

import { mapState, mapActions, mapMutations } from 'vuex'
import SummaryBuilder from '@/components/Project/Builder/SummaryBuilder'

export default {
  name: 'ProjectBuilder',
  components: {
    SummaryBuilder,
    StoryBuilder,
    InformationBuilder,
    NameBuilder,

    'app-footer': Footer
  },
  metaInfo: function() {
    return {
      title: this.$t('page-title'),
      meta: [
        {
          property: 'og:title',
          content: this.$t('page-title'),
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
  data () {
    return {

    }
  },
  props: {
  },
  methods: {
    ...mapActions('task/builder', {
      resetTaskBuilder: 'reset'
    }),
    ...mapMutations('project/builder', [
      'setCurrentStep', 'setStep'
    ]),
    ...mapMutations('task', [
      'setTaskPresenter'
    ]),
    ...mapActions('project', [
      'uploadAvatar'
    ]),
    ...mapActions('c3s/project', [
      'createProject'
    ]),
    ...mapMutations('notification', [
      'showError'
    ]),
    ...mapMutations('c3s/media', [
      'uploadMedia'
    ])
  },
  computed: {
    ...mapState('project/builder', [
      'currentStep', 'steps', 'title', 'shortDescription', 'story', 'picture', 'pictureName', 'croppedPicture'
    ], 'consts', ['projectId']),
      ...mapState('c3s/project', ['project']),
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
        const imageName = this.pictureName
        this.createProject({
          name: this.title,
          info: {
            shortDescription: this.shortDescription,
          },
          description: JSON.stringify({
            whatWhy: this.story.whatWhy,
            how: this.story.how,
            who: this.story.who,
            keepTrack: this.story.keepTrack
          })
        }).then(project => {

          if (project) {
            // if it fails, a message will say to the user that he can update it again later...
            if (image.length > 0) {
              this.$store.dispatch('c3s/media/uploadMedia',[this.project.id, imageName, image], {root: true}).then(res => {
                console.log(res)
              }).catch(err => {
                console.error(err)
              })
            }

            this.resetTaskBuilder()
            this.setTaskPresenter('')
            this.$router.push({name: 'project.builder.end'})
          } else {
            this.setCurrentStep(this.steps.name)
            this.setStep({ step: 'name', value: false })
          }

        })

      } else if (this.currentStep !== 'end') {
        this.$router.push({ name: 'project.builder.name' })
      }
    }
  }
}
</script>

<style>

</style>
