<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">

              <!--
              <div class="margin-bottom" v-if="!selectedSource && materialSources[task.material].length > 1">
                <div class="button-group centered">
                  <button class="button button-secondary button-secondary-naked" @click="goBack" style="padding:0">Go back: select another source</button>
                </div>
              </div>
              -->

              <h2 class="heading centered">Select Source</h2>


              <div class="margin-bottom" v-if="!selectedSource">
                <div class="button-group">

                  <button class="button button-icon button-toggle button-toggle-fullwidth"
                          v-for="source in materialSources[task.material]" :key="source"
                          @click="onSourceSelected(source)">
                    <template v-if="source === sources.csv">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M144.33,213.62c-.58,18.12,8.48,26.14,8.7,31.24a6.54,6.54,0,0,1-3.28,5L139.51,257a8.56,8.56,0,0,1-4.5,1.54c-.35,0-6.55,1.46-16.39-20.49a62.88,62.88,0,0,1-50.08,23.56c-13,.71-48.32-7.39-46.51-45-1.27-30.62,27.25-49.65,56.75-48,5.68,0,17.28.3,37.59,5v-12.5C118.52,140,104.61,123.57,80.52,126c-1.92,0-15.52-.4-36.67,8.09-5.89,2.71-6.64,2.26-8.6,2.26-5.93,0-3.49-17.19-2.35-19.36,4.17-5.12,28.68-14.68,52.75-14.55A61.51,61.51,0,0,1,130.2,116.3a56.26,56.26,0,0,1,14.14,41.89v55.43ZM75.19,239.53c26-.38,36.93-16,39.43-24.38,2-8,1.64-13.13,1.64-21.92a137.47,137.47,0,0,0-31.64-3.89c-12.12-.92-34.26,4.5-33.4,25.8C50.23,228.58,60.12,240.26,75.19,239.53ZM211.93,258c-6.29.57-9.22-3.89-10.15-8.3L161.94,118a31,31,0,0,1-1.53-6.86,3.68,3.68,0,0,1,3.08-4.2c.2,0-1.7,0,17.8,0,7-.7,9.32,4.82,10,8.3l28.58,112.66,26.53-112.66c.42-2.58,2.35-8.86,10.24-8.2h13.73c1.73-.14,8.88-.4,10.14,8.3l26.73,114.1,29.5-114.1c.38-1.74,2.18-9.1,10.14-8.3H362.7c.68-.1,4.92-.64,4.2,6.87-.34,1.48,2.73-8.53-42.2,135.92-.92,4.4-3.86,8.87-10.14,8.29h-15c-8.75.92-10-7.73-10.14-8.6l-26.53-109.7L236.71,249.36c-.13.87-1.38,9.52-10.14,8.6H211.93Zm218.78,4.5c-4.71,0-27.14-.24-45.89-9.83a10.25,10.25,0,0,1-6.25-9.53v-8.6c0-6.76,5-5.52,7.07-4.71,8,3.25,13.18,5.71,23,7.68,29.32,6,42.22-1.84,45.38-3.58,10.52-6.25,11.35-20.55,4.2-28-8.39-7-12.39-7.3-42.51-16.8-3.71-1-34.95-10.89-35-41.89-.48-22.59,20-44.94,55.62-44.76,10.13,0,37.14,3.3,44.45,12.5a9.66,9.66,0,0,1,1.54,5.63v8.09q0,5.32-3.9,5.32c-6.16-.68-17.11-8.93-39.32-8.6-5.52-.28-31.92.73-30.73,20-.35,15.17,21.29,20.86,23.76,21.51,29.17,8.78,38.92,10.23,50.49,23.66,13.72,17.8,6.32,38.64,3.48,44.36-15.26,30-54.73,27.55-55.4,27.53Zm32.16,83.89c-56,41.37-137.35,63.4-206.79,63.4A375.32,375.32,0,0,1,2.27,313.17C-3,308.46,1.65,302,8,305.6a509.89,509.89,0,0,0,253.5,67.29,503.88,503.88,0,0,0,193.27-39.64c9.42-4,17.42,6.24,8.1,13.11Zm23.35-26.63c-7.17-9.22-47.43-4.31-65.45-2.16-5.43.62-6.35-4.09-1.43-7.57,32.05-22.54,84.7-16.08,90.75-8.51s-1.64,60.33-31.65,85.53c-4.61,3.9-9,1.84-7-3.28C478.23,366.74,493.39,329,486.22,319.73Z"/></svg>
                      CSV File</template>
                    <template v-if="source === sources.amazon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M144.33,213.62c-.58,18.12,8.48,26.14,8.7,31.24a6.54,6.54,0,0,1-3.28,5L139.51,257a8.56,8.56,0,0,1-4.5,1.54c-.35,0-6.55,1.46-16.39-20.49a62.88,62.88,0,0,1-50.08,23.56c-13,.71-48.32-7.39-46.51-45-1.27-30.62,27.25-49.65,56.75-48,5.68,0,17.28.3,37.59,5v-12.5C118.52,140,104.61,123.57,80.52,126c-1.92,0-15.52-.4-36.67,8.09-5.89,2.71-6.64,2.26-8.6,2.26-5.93,0-3.49-17.19-2.35-19.36,4.17-5.12,28.68-14.68,52.75-14.55A61.51,61.51,0,0,1,130.2,116.3a56.26,56.26,0,0,1,14.14,41.89v55.43ZM75.19,239.53c26-.38,36.93-16,39.43-24.38,2-8,1.64-13.13,1.64-21.92a137.47,137.47,0,0,0-31.64-3.89c-12.12-.92-34.26,4.5-33.4,25.8C50.23,228.58,60.12,240.26,75.19,239.53ZM211.93,258c-6.29.57-9.22-3.89-10.15-8.3L161.94,118a31,31,0,0,1-1.53-6.86,3.68,3.68,0,0,1,3.08-4.2c.2,0-1.7,0,17.8,0,7-.7,9.32,4.82,10,8.3l28.58,112.66,26.53-112.66c.42-2.58,2.35-8.86,10.24-8.2h13.73c1.73-.14,8.88-.4,10.14,8.3l26.73,114.1,29.5-114.1c.38-1.74,2.18-9.1,10.14-8.3H362.7c.68-.1,4.92-.64,4.2,6.87-.34,1.48,2.73-8.53-42.2,135.92-.92,4.4-3.86,8.87-10.14,8.29h-15c-8.75.92-10-7.73-10.14-8.6l-26.53-109.7L236.71,249.36c-.13.87-1.38,9.52-10.14,8.6H211.93Zm218.78,4.5c-4.71,0-27.14-.24-45.89-9.83a10.25,10.25,0,0,1-6.25-9.53v-8.6c0-6.76,5-5.52,7.07-4.71,8,3.25,13.18,5.71,23,7.68,29.32,6,42.22-1.84,45.38-3.58,10.52-6.25,11.35-20.55,4.2-28-8.39-7-12.39-7.3-42.51-16.8-3.71-1-34.95-10.89-35-41.89-.48-22.59,20-44.94,55.62-44.76,10.13,0,37.14,3.3,44.45,12.5a9.66,9.66,0,0,1,1.54,5.63v8.09q0,5.32-3.9,5.32c-6.16-.68-17.11-8.93-39.32-8.6-5.52-.28-31.92.73-30.73,20-.35,15.17,21.29,20.86,23.76,21.51,29.17,8.78,38.92,10.23,50.49,23.66,13.72,17.8,6.32,38.64,3.48,44.36-15.26,30-54.73,27.55-55.4,27.53Zm32.16,83.89c-56,41.37-137.35,63.4-206.79,63.4A375.32,375.32,0,0,1,2.27,313.17C-3,308.46,1.65,302,8,305.6a509.89,509.89,0,0,0,253.5,67.29,503.88,503.88,0,0,0,193.27-39.64c9.42-4,17.42,6.24,8.1,13.11Zm23.35-26.63c-7.17-9.22-47.43-4.31-65.45-2.16-5.43.62-6.35-4.09-1.43-7.57,32.05-22.54,84.7-16.08,90.75-8.51s-1.64,60.33-31.65,85.53c-4.61,3.9-9,1.84-7-3.28C478.23,366.74,493.39,329,486.22,319.73Z"/></svg>
                      Amazon S3 bucket
                    </template>
                    <template v-if="source === sources.dropbox">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.39,120.53l-128,81.75,128,81.74-128,81.75L0,283.25,128.29,201.5,0,120.53,128.29,38.79l128.1,81.74ZM127.61,391.47l128-81.75,128,81.75-128,81.74ZM256.39,283.25l128-81.75-128-81.06L383.71,38.79,512,120.53,383.71,202.28,512,283.93,383.71,365.67,256.39,283.25Z"/></svg>
                      Dropbox
                    </template>
                    <template v-if="source === sources.flickr">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432,32H80A48,48,0,0,0,32,80V432a48,48,0,0,0,48,48H432a48,48,0,0,0,48-48V80A48,48,0,0,0,432,32ZM176.5,319A63.5,63.5,0,1,1,240,255.5,63.46,63.46,0,0,1,176.5,319Zm159,0A63.5,63.5,0,1,1,399,255.5,63.46,63.46,0,0,1,335.5,319Z"/></svg>
                      Flickr
                    </template>
                  </button>

                </div>
              </div>


              <template v-else>
                <CsvSourceEditor v-if="selectedSource === sources.csv"></CsvSourceEditor>
                <DropboxSourceEditor v-if="selectedSource === sources.dropbox"></DropboxSourceEditor>
                <AmazonSourceEditor v-if="selectedSource === sources.amazon"></AmazonSourceEditor>
                <FlickrSourceEditor v-if="selectedSource === sources.flickr"></FlickrSourceEditor>
                <TwitterSourceEditor v-if="selectedSource === sources.twitter"></TwitterSourceEditor>
              </template>


            </div>
          </div>
        </div>
      </div>
    </app-content-section>


    <!--
    <br><br><br><br>


    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Now's the time to select your source</h2>
        <b-link v-if="selectedSource && materialSources[task.material].length > 1" @click="goBack">Go back: select another source</b-link>

        <b-row class="mt-4" v-if="!selectedSource">
          <b-col md="9">
            <b-row>

              <b-col md="4" v-for="source in materialSources[task.material]" :key="source">

                <b-card ref="card-amazon" v-if="source === sources.amazon" @click="onSourceSelected(source)" class="text-center material mt-2 mt-md-0">
                  <i class="fab fa-aws fa-4x"></i>
                  <div class="m-2">Amazon S3 bucket</div>
                </b-card>

                <b-card ref="card-dropbox" v-if="source === sources.dropbox" @click="onSourceSelected(source)" class="text-center material mt-2 mt-md-0">
                  <i class="fab fa-dropbox fa-4x"></i><br>
                  <div class="m-2">Dropbox</div>
                </b-card>

                <b-card ref="card-flickr" v-if="source === sources.flickr" @click="onSourceSelected(source)" class="text-center material mt-2 mt-md-0">
                  <i class="fab fa-flickr fa-4x"></i><br>
                  <div class="m-2">Flickr</div>
                </b-card>
              </b-col>

            </b-row>
          </b-col>

          <b-col md="3" class="text-muted">
            <p>Choose any of the options.</p>
            <p>Not what you were looking for? Try the <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link> (not for beginners!)</p>
          </b-col>

        </b-row>

        <b-row v-else>
          <b-col>
            <DropboxSourceEditor v-if="selectedSource === sources.dropbox"></DropboxSourceEditor>
            <AmazonSourceEditor v-if="selectedSource === sources.amazon"></AmazonSourceEditor>
            <FlickrSourceEditor v-if="selectedSource === sources.flickr"></FlickrSourceEditor>
            <TwitterSourceEditor v-if="selectedSource === sources.twitter"></TwitterSourceEditor>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    -->


  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import CsvSourceEditor from '@/components/Task/Builder/SourceEditor/CsvSourceEditor'
import DropboxSourceEditor from '@/components/Task/Builder/SourceEditor/DropboxSourceEditor'
import AmazonSourceEditor from '@/components/Task/Builder/SourceEditor/AmazonSourceEditor'
import FlickrSourceEditor from '@/components/Task/Builder/SourceEditor/FlickrSourceEditor'
import TwitterSourceEditor from '@/components/Task/Builder/SourceEditor/TwitterSourceEditor'

import ContentSection from '@/components/shared/ContentSection.vue';

export default {
  name: 'SourceBuilder',
  components: {
    CsvSourceEditor,
    TwitterSourceEditor,
    FlickrSourceEditor,
    AmazonSourceEditor,
    DropboxSourceEditor,
    'app-content-section': ContentSection
  },
  data: () => {
    return {
      selectedSource: null
    }
  },
  created () {
    //this.selectedSource = this.task.source
    //this.selectedSource = 'csv'
    console.log(this.materialSources)
  },
  methods: {
    ...mapMutations('task/builder', [
      'setStep',
      'setTaskSource',
      'setTaskSourceContent'
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
      'task',
      'materialSources',
      'sources',
      'materials'
    ]),
    ...mapState('project', [
      'selectedProject'
    ])
  }
}
</script>

<style lang="scss">
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
