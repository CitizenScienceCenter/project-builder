<template>
  <div>

    <p>The CSV needs to look like this ... <br>(explanation coming here)</p>

    <div class="margin-bottom">
        <div class="button-group centered">
          <button @click="openDropBox" class="button button-secondary button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.39,120.53l-128,81.75,128,81.74-128,81.75L0,283.25,128.29,201.5,0,120.53,128.29,38.79l128.1,81.74ZM127.61,391.47l128-81.75,128,81.75-128,81.74ZM256.39,283.25l128-81.75-128-81.06L383.71,38.79,512,120.53,383.71,202.28,512,283.93,383.71,365.67,256.39,283.25Z"/></svg>
            Choose files from DropBox
          </button>
        </div>
    </div>

    <p class="small">You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use</p>

    <div class="margin-bottom">
      <div class="button-group right-aligned">
        <button @click="onSubmit" class="button button-primary" :disabled="selectedFiles.length <= 0">Continue</button>
      </div>
    </div>


    <ul v-if="files">
      <li :key="file.id" v-for="file in files">
        <a :href="file.link" target="_blank">{{ file.name }}</a>
      </li>
    </ul>

    <!--
    <b-row>

      <b-col md="9">
        <b-btn class="mt-3 mb-3" @click="openDropBox" variant="primary" size="lg"><i class="fab fa-dropbox"></i> Choose files from DropBox</b-btn>

        <b-row>
          <b-col md="4" sm="6" cols="12" class="mt-5" :key="file.id" v-for="file in files" align="center">
            <b-form-checkbox v-model="selectedFiles" :value="file" class="w-100">
              {{ file.name }}
            </b-form-checkbox>
            <div class="mt-2">
              <b-img v-if="task.material === materials.image" fluid-grow class="shadow" :src="file.link"></b-img>
              <audio v-if="task.material === materials.sound" :src="file.link" class="w-100" controls></audio>
              <b-embed v-if="task.material === materials.video" type="video" allowfullscreen controls :src="file.link"></b-embed>
              <b-link v-if="task.material === materials.pdf" :href="file.link" title="Open file" target="_blank">
                <i class="fas fa-file-pdf fa-8x"></i>
              </b-link>
            </div>
          </b-col>
        </b-row>

        <b-btn ref="btn-submit" v-if="selectedFiles.length > 0" @click="onSubmit" class="mt-4" variant="success" size="md">Continue</b-btn>
      </b-col>

      <b-col md="3">
        <p>You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use.</p>
      </b-col>

    </b-row>

    -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DropboxSourceEditor',
  data: () => {
    return {
      selectedFiles: [],
    }
  },
  mounted () {
    if (Array.isArray(this.task.sourceContent)) {
      this.selectedFiles = this.task.sourceContent
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskSource',
      'setTaskSourceContent',
      'setStep',
      'setDropboxFiles'
    ]),

    onSubmit () {
      this.setTaskSource(this.sources.dropbox)
      this.setTaskSourceContent(this.selectedFiles)
      this.setStep({ step: 'source', value: true })
    },

    openDropBox () {
      const dropbox = window.Dropbox
      const options = {
        success: (files) => {
          files.forEach(f => {
            f['info'] = {}
            f['info']['path'] = f.link
          })
          this.selectedFiles = files
          this.setDropboxFiles(files)
          // TODO handle upload here
        },
        extensions: this.materialExtensions[this.task.material],
        linkType: 'direct',
        multiselect: true
        // sizeLimit: 1024,
        // folderselect: true
      }
      dropbox.choose(options)
    }

  },
  computed: {
    ...mapState('task/builder', [
      'task',
      'materialExtensions',
      'sources',
      'materials'
    ]),
    ...mapState('task/builder', {
      files: state => state.dropboxFiles
    })
  },
  watch: {
    files() {
      this.selectedFiles = this.files;
    }
  }
}
</script>

<style scoped>

</style>
