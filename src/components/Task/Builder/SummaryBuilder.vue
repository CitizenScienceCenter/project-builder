<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-10 col-xlarge-8 scroll-effect">

              <b-row class="mt-4">
                <b-col md="8">
                  <h2>Are you ready to rock?!</h2>
                </b-col>
                <b-col md="4" class="text-center">
                  <b-btn
                          @click="onSubmit"
                          v-b-tooltip.hover
                          title="It will create a task presenter from your template and import all the tasks"
                          variant="success"
                          size="lg"
                          class="float-md-right">
                    Create
                  </b-btn>
                </b-col>
              </b-row>


              <b-row class="mt-4">
                <b-col md="6">

                  <ul class="list-unstyled">

                    <!-- Material -->
                    <b-media no-body tag="li" vertical-align="center" class="mb-4">
                      <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
                        <i v-if="task.material === materials.image" class="fas fa-images"></i>
                        <i v-if="task.material === materials.sound" class="fas fa-music"></i>
                        <i v-if="task.material === materials.video" class="fas fa-play"></i>
                        <i v-if="task.material === materials.pdf" class="fas fa-file-pdf"></i>
                        <i v-if="task.material === materials.tweet" class="fab fa-twitter"></i>
                      </b-media-aside>

                      <b-media-body>
                        <h4 class="mt-0 mb-0">{{ task.material.toUpperCase() }}</h4>
                        <p class="text-muted m-0">material</p>
                      </b-media-body>
                    </b-media>

                    <!-- Job -->
                    <b-media no-body tag="li" vertical-align="center" class="mb-4">
                      <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
                        <i v-if="task.job === jobs.describe" class="fas fa-edit"></i>
                        <i v-if="task.job === jobs.classify" class="fas fa-filter"></i>
                        <i v-if="task.job === jobs.count" class="fas fa-calculator"></i>
                      </b-media-aside>

                      <b-media-body>
                        <h4 class="mt-0 mb-0">{{ task.job.toUpperCase() }}</h4>
                        <p class="text-muted m-0">job</p>
                      </b-media-body>
                    </b-media>

                    <!-- Template -->
                    <b-media no-body tag="li" vertical-align="center">
                      <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
                        <i class="fas fa-code"></i>
                      </b-media-aside>

                      <b-media-body>
                        <h4 class="mt-0">TEMPLATE</h4>

                        <!-- Describe template -->
                        <ul v-if="task.job === jobs.describe" class="list-unstyled">
                          <li>
                            <b-form-group label="Question">
                              <b-form-input :disabled="true" :value="task.template.question"></b-form-input>
                            </b-form-group>
                            <ul class="list-unstyled ml-4">
                              <li :key="index" v-for="(description, index) in task.template.descriptions">
                                <b-form-group :label="'Description ' + (index + 1)">
                                  <b-form-input :disabled="true" :value="description"></b-form-input>
                                </b-form-group>
                              </li>
                            </ul>
                          </li>
                        </ul>

                        <!-- Classify template -->
                        <ul v-if="task.job === jobs.classify" class="list-unstyled">
                          <li :key="q" v-for="(question, q) in task.template">
                            <b-form-group :label="'Question ' + (q + 1)">
                              <b-form-input :disabled="true" :value="question.question"></b-form-input>
                            </b-form-group>
                            <ul class="list-unstyled ml-4">
                              <li :key="a" v-for="(answer, a) in task.template[q].answers">
                                <b-form-group :label="'Answer ' + (a + 1)">
                                  <b-form-input :disabled="true" :value="answer"></b-form-input>
                                </b-form-group>
                              </li>
                            </ul>
                          </li>
                        </ul>

                        <!-- Count template -->
                        <ul v-if="task.job === jobs.count" class="list-unstyled">
                          <li>
                            <b-form-group label="Question">
                              <b-form-input :disabled="true" :value="task.template"></b-form-input>
                            </b-form-group>
                          </li>
                        </ul>

                      </b-media-body>
                    </b-media>
                  </ul>
                </b-col>

                <!-- Source section -->
                <b-col md="6">
                  <ul class="list-unstyled">
                    <b-media no-body tag="li" vertical-align="center">
                      <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
                        <i v-if="task.source === sources.amazon" class="fab fa-aws"></i>
                        <i v-if="task.source === sources.dropbox" class="fab fa-dropbox"></i>
                        <i v-if="task.source === sources.flickr" class="fab fa-flickr"></i>
                        <i v-if="task.source === sources.twitter" class="fab fa-twitter"></i>
                      </b-media-aside>

                      <b-media-body>
                        <h4 class="mt-0 mb-0">{{ task.source.toUpperCase() }}</h4>
                        <p class="text-muted m-0">importer</p>
                      </b-media-body>
                    </b-media>
                  </ul>

                  <span v-if="task.source !== sources.flickr && task.source !== sources.twitter"><b>{{ task.sourceContent.length }}</b> tasks</span>

                  <ul v-if="task.source !== sources.flickr && task.source !== sources.twitter">
                    <li :key="key" v-for="(file, key) in task.sourceContent">
                      <b-link v-if="task.source === sources.amazon" :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
                      <b-link v-else-if="task.source === sources.dropbox" :href="file.link" target="_blank">{{ file.name }}</b-link>
                      <b-link v-else :href="file" target="_blank">{{ file }}</b-link>
                    </li>
                  </ul>
                  <p v-else-if="task.source === sources.flickr">One album to import (<span class="font-italic">{{ task.sourceContent }}</span>)</p>
                  <p v-else-if="task.source === sources.twitter">{{ task.sourceContent.maxTweets + '' }} tweet(s) to import</p>
                </b-col>
              </b-row>



            </div>
          </div>
        </div>
      </div>
    </app-content-section>


    <!--

    <br><br><br><br>



    <b-row class="mt-4">
      <b-col md="8">
        <h2>Are you ready to rock?!</h2>
      </b-col>
      <b-col md="4" class="text-center">
        <b-btn
                @click="onSubmit"
                v-b-tooltip.hover
                title="It will create a task presenter from your template and import all the tasks"
                variant="success"
                size="lg"
                class="float-md-right">
          Create
        </b-btn>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col md="6">

        <ul class="list-unstyled">


          <b-media no-body tag="li" vertical-align="center" class="mb-4">
            <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
              <i v-if="task.material === materials.image" class="fas fa-images"></i>
              <i v-if="task.material === materials.sound" class="fas fa-music"></i>
              <i v-if="task.material === materials.video" class="fas fa-play"></i>
              <i v-if="task.material === materials.pdf" class="fas fa-file-pdf"></i>
              <i v-if="task.material === materials.tweet" class="fab fa-twitter"></i>
            </b-media-aside>

            <b-media-body>
              <h4 class="mt-0 mb-0">{{ task.material.toUpperCase() }}</h4>
              <p class="text-muted m-0">material</p>
            </b-media-body>
          </b-media>


          <b-media no-body tag="li" vertical-align="center" class="mb-4">
            <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
              <i v-if="task.job === jobs.describe" class="fas fa-edit"></i>
              <i v-if="task.job === jobs.classify" class="fas fa-filter"></i>
              <i v-if="task.job === jobs.count" class="fas fa-calculator"></i>
            </b-media-aside>

            <b-media-body>
              <h4 class="mt-0 mb-0">{{ task.job.toUpperCase() }}</h4>
              <p class="text-muted m-0">job</p>
            </b-media-body>
          </b-media>


          <b-media no-body tag="li" vertical-align="center">
            <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
              <i class="fas fa-code"></i>
            </b-media-aside>

            <b-media-body>
              <h4 class="mt-0">TEMPLATE</h4>


              <ul v-if="task.job === jobs.describe" class="list-unstyled">
                <li>
                  <b-form-group label="Question">
                    <b-form-input :disabled="true" :value="task.template.question"></b-form-input>
                  </b-form-group>
                  <ul class="list-unstyled ml-4">
                    <li :key="index" v-for="(description, index) in task.template.descriptions">
                      <b-form-group :label="'Description ' + (index + 1)">
                        <b-form-input :disabled="true" :value="description"></b-form-input>
                      </b-form-group>
                    </li>
                  </ul>
                </li>
              </ul>


              <ul v-if="task.job === jobs.classify" class="list-unstyled">
                <li :key="q" v-for="(question, q) in task.template">
                  <b-form-group :label="'Question ' + (q + 1)">
                    <b-form-input :disabled="true" :value="question.question"></b-form-input>
                  </b-form-group>
                  <ul class="list-unstyled ml-4">
                    <li :key="a" v-for="(answer, a) in task.template[q].answers">
                      <b-form-group :label="'Answer ' + (a + 1)">
                        <b-form-input :disabled="true" :value="answer"></b-form-input>
                      </b-form-group>
                    </li>
                  </ul>
                </li>
              </ul>


              <ul v-if="task.job === jobs.count" class="list-unstyled">
                <li>
                  <b-form-group label="Question">
                    <b-form-input :disabled="true" :value="task.template"></b-form-input>
                  </b-form-group>
                </li>
              </ul>

            </b-media-body>
          </b-media>
        </ul>
      </b-col>


      <b-col md="6">
        <ul class="list-unstyled">
          <b-media no-body tag="li" vertical-align="center">
            <b-media-aside style="width: 100px; font-size: 50px" class="pr-4 justify-content-end">
              <i v-if="task.source === sources.amazon" class="fab fa-aws"></i>
              <i v-if="task.source === sources.dropbox" class="fab fa-dropbox"></i>
              <i v-if="task.source === sources.flickr" class="fab fa-flickr"></i>
              <i v-if="task.source === sources.twitter" class="fab fa-twitter"></i>
            </b-media-aside>

            <b-media-body>
              <h4 class="mt-0 mb-0">{{ task.source.toUpperCase() }}</h4>
              <p class="text-muted m-0">importer</p>
            </b-media-body>
          </b-media>
        </ul>

        <span v-if="task.source !== sources.flickr && task.source !== sources.twitter"><b>{{ task.sourceContent.length }}</b> tasks</span>

        <ul v-if="task.source !== sources.flickr && task.source !== sources.twitter">
          <li :key="key" v-for="(file, key) in task.sourceContent">
            <b-link v-if="task.source === sources.amazon" :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
            <b-link v-else-if="task.source === sources.dropbox" :href="file.link" target="_blank">{{ file.name }}</b-link>
            <b-link v-else :href="file" target="_blank">{{ file }}</b-link>
          </li>
        </ul>
        <p v-else-if="task.source === sources.flickr">One album to import (<span class="font-italic">{{ task.sourceContent }}</span>)</p>
        <p v-else-if="task.source === sources.twitter">{{ task.sourceContent.maxTweets + '' }} tweet(s) to import</p>
      </b-col>
    </b-row>

    -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import { buildTemplateFromModel } from '@/helper'

import ImageCountTemplate from '@/components/Task/Template/Image/ImageCountTemplate'
import ImageDescribeTemplate from '@/components/Task/Template/Image/ImageDescriptionTemplate'
import ImageClassificationTemplate from '@/components/Task/Template/Image/ImageClassificationTemplate'
import VideoClassificationTemplate from '@/components/Task/Template/Video/VideoClassificationTemplate'
import VideoDescriptionTemplate from '@/components/Task/Template/Video/VideoDescriptionTemplate'
import SoundClassificationTemplate from '@/components/Task/Template/Sound/SoundClassificationTemplate'
import SoundDescriptionTemplate from '@/components/Task/Template/Sound/SoundDescriptionTemplate'
import PdfDescriptionTemplate from '@/components/Task/Template/Document/PdfDescriptionTemplate'
import TwitterClassificationTemplate from '@/components/Task/Template/Twitter/TwitterClassificationTemplate'
import TwitterDescriptionTemplate from '@/components/Task/Template/Twitter/TwitterDescriptionTemplate'


import ContentSection from '@/components/shared/ContentSection.vue';

export default {
  name: 'SummaryBuilder',
  components: {
    'app-content-section': ContentSection
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'materials', 'jobs', 'sources', 'bucket'
    ]),
    ...mapState('c3s/project', {
      'selectedProject': state => state.project
    }),
    ...mapGetters('task/builder', [
      'getBucketFileLink'
    ])
  },
  methods: {
    ...mapActions('task/importer', [
      'importAmazonS3Tasks',
      'importDropboxTasks',
      'importFlickrTasks',
      'importTwitterTasks'
    ]),
    ...mapActions('task/builder', {
      resetTaskBuilder: 'reset'
    }),
    ...mapMutations('notification', [
      'showSuccess', 'showError'
    ]),
    updateTaskPresenter (template) {
      const tmpl = {
        'info': {
        }
      }
      tmpl['info'] = template
      return this.$store.dispatch('c3s/project/updateProject', [this.$route.params.pid, tmpl]).then(response => {
        if (!response) {
          this.showError({
            title: 'Error',
            content: 'Error applying update'
          })
        } else {
          console.log(response)
          return Promise.resolve(true)
        }
      })
    },

    onSubmit () {
      /// -----------------------------------------------------------
      /// Template generation depending on what the user has selected
      /// -----------------------------------------------------------

      // the generated template
      let template = null

      // Image template generation
      if (this.task.material === this.materials.image) {

        if (this.task.job === this.jobs.count) {
          template = buildTemplateFromModel(ImageCountTemplate, {
            question: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(ImageDescribeTemplate, {
            question: this.task.template.question,
            descriptions: this.task.template.descriptions
          })
        } else if (this.task.job === this.jobs.classify) {
          template = buildTemplateFromModel(ImageClassificationTemplate, {
            questions: this.task.template
          })
        }

      }

      // Sound template generation
      if (this.task.material === this.materials.sound) {

        if (this.task.job === this.jobs.classify) {
          template = buildTemplateFromModel(SoundClassificationTemplate, {
            questions: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(SoundDescriptionTemplate, {
            question: this.task.template.question,
            descriptions: this.task.template.descriptions
          })
        }

      }

      // Video template generation
      if (this.task.material === this.materials.video) {

        if (this.task.job === this.jobs.classify) {
          template = buildTemplateFromModel(VideoClassificationTemplate, {
            questions: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(VideoDescriptionTemplate, {
            question: this.task.template.question,
            descriptions: this.task.template.descriptions
          })
        }

      }

      // Pdf template generation
      if (this.task.material === this.materials.pdf) {

        if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(PdfDescriptionTemplate, {
            question: this.task.template.question,
            descriptions: this.task.template.descriptions
          })
        }

      }

      // Tweet template generation
      if (this.task.material === this.materials.tweet) {

        if (this.task.job === this.jobs.classify) {
          template = buildTemplateFromModel(TwitterClassificationTemplate, {
            questions: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(TwitterDescriptionTemplate, {
            question: this.task.template.question,
            descriptions: this.task.template.descriptions
          })
        }

      }
      // store the generated template for the selected project
      const templatePromise = this.updateTaskPresenter({
        template: template
      })



      /// --------------------------------------------------
      /// Tasks importation depending on the selected source
      /// --------------------------------------------------
      let sourcePromise = null

      // Amazon S3
      if (this.task.source === this.sources.amazon) {
        sourcePromise = this.importAmazonS3Tasks({
          project: this.selectedProject,
          bucket: this.bucket.name,
          files: this.task.sourceContent
        })

      }
      // Dropbox
      else if (this.task.source === this.sources.dropbox) {
        sourcePromise = this.importDropboxTasks({
          project: this.selectedProject,
          files: this.task.sourceContent
        })
      }
      // Flickr
      else if (this.task.source === this.sources.flickr) {
        sourcePromise = this.importFlickrTasks({
          project: this.selectedProject,
          albumId: this.task.sourceContent
        })
      }
      // Twitter
      else if (this.task.source === this.sources.twitter) {
        sourcePromise = this.importTwitterTasks({
          project: this.selectedProject,
          source: this.task.sourceContent.source,
          maxTweets: this.task.sourceContent.maxTweets
        })
      }
      // CSV
      else if (this.task.source === this.sources.csv) {
        sourcePromise = Promise.resolve(true)
      }

      /// --------------------------------------------------
      // test if all calls have been done correctly and redirects to the project detail page
      Promise.all([templatePromise, sourcePromise]).then(results => {
        if (results.filter(el => el !== false).length === 2) {
          this.resetTaskBuilder()
          this.$router.push({ name: 'project', params: { id: this.selectedProject.id } })
        } else {
          this.showError({
            title: 'Error during creation',
            content: 'We are not able to submit your template and/or your tasks for the moment.'
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
