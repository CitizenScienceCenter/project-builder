<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Now's the time to select your source</h2>
        <b-link v-if="selectedSource" @click="goBack">Go back: select another source</b-link>

        <b-row class="mt-4" v-if="!selectedSource">
          <b-col md="9">
            <b-row>

              <b-col md="4" v-for="source in materialSources[task.material]" :key="source">

                <b-card ref="card-amazon" v-if="source === sources.amazon" @click="onSourceSelected(source)" class="text-center material">
                  <i class="fab fa-aws fa-4x"></i>
                  <div class="m-2">Amazon S3 bucket</div>
                </b-card>

                <b-card ref="card-dropbox" v-if="source === sources.dropbox" @click="onSourceSelected(source)" class="text-center material">
                  <i class="fab fa-dropbox fa-4x"></i><br>
                  <div class="m-2">Dropbox</div>
                </b-card>

                <b-card ref="card-flickr" v-if="source === sources.flickr" @click="onSourceSelected(source)" class="text-center material">
                  <i class="fab fa-flickr fa-4x"></i><br>
                  <div class="m-2">Flickr</div>
                </b-card>
              </b-col>

            </b-row>
          </b-col>

          <b-col md="3" class="text-muted">
            <p>Choose any of the options.</p>
            <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { id: this.selectedProject.id } }">expert path</b-link> (not for beginners!)</p>
          </b-col>

        </b-row>

        <b-row v-else>
          <b-col>
            <DropboxSourceEditor v-if="selectedSource === sources.dropbox"></DropboxSourceEditor>
            <AmazonSourceEditor v-if="selectedSource === sources.amazon"></AmazonSourceEditor>
            <FlickrSourceEditor v-if="selectedSource === sources.flickr"></FlickrSourceEditor>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import DropboxSourceEditor from '@/components/Task/Builder/SourceEditor/DropboxSourceEditor'
import AmazonSourceEditor from '@/components/Task/Builder/SourceEditor/AmazonSourceEditor'
import FlickrSourceEditor from '@/components/Task/Builder/SourceEditor/FlickrSourceEditor'

export default {
  name: 'SourceBuilder',
  components: {
    FlickrSourceEditor,
    AmazonSourceEditor,
    DropboxSourceEditor
  },
  data: () => {
    return {
      selectedSource: null
    }
  },
  mounted () {
    this.selectedSource = this.task.source
  },
  methods: {
    ...mapMutations('task/builder', [
      'setStep', 'setTaskSource', 'setTaskSourceContent'
    ]),

    onSourceSelected (source) {
      if (this.task.source !== source) {
        this.setTaskSourceContent(null)
      }
      this.selectedSource = source
    },

    goBack () {
      this.selectedSource = null
    }
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'materialSources', 'sources'
    ]),
    ...mapState('project', [
      'selectedProject'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';

  .material {
    &:hover {
      cursor: pointer;
      transition: all 0.3s;
      background-color: $primary;
      color: $white;
    }
  }
</style>
