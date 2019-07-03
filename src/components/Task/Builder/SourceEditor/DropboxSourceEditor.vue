<template>
  <b-row>

    <b-col md="9">
      <div class="mt-3 mb-3" id="dropbox-button"></div>

      <!-- Content list displayed with 3 cols -->
      <b-row>
        <b-col md="4" sm="6" cols="12" class="mt-4" :key="file.id" v-for="file in files">
          <b-form-checkbox v-model="selectedFiles" :value="file" class="w-100">
            <b-img fluid-grow class="shadow" :src="file.link"></b-img>
            <div>
              <b-link :href="file.link" target="_blank">{{ file.name }}</b-link>
            </div>
          </b-form-checkbox>
        </b-col>
      </b-row>

      <b-btn ref="btn-submit" v-if="selectedFiles.length > 0" @click="onSubmit" class="mt-4" variant="success" size="md">Continue</b-btn>
    </b-col>

    <b-col md="3">
      <p>You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use.</p>
    </b-col>

  </b-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DropboxSourceEditor',
  data: () => {
    return {
      files: [],
      selectedFiles: []
    }
  },
  mounted () {
    const dropbox = window.Dropbox
    const button = dropbox.createChooseButton({
      success: (files) => {
        this.selectedFiles = files
        this.files = files
        console.log(files)
      },
      extensions: this.materialExtensions[this.task.material],
      // sizeLimit: 1024,
      linkType: 'direct',
      multiselect: true
      // folderselect: true
    })
    document.getElementById('dropbox-button').appendChild(button)

    if (Array.isArray(this.task.sourceContent)) {
      this.files = this.task.sourceContent
      this.selectedFiles = this.task.sourceContent
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskSource', 'setTaskSourceContent', 'setStep'
    ]),

    onSubmit () {
      this.setTaskSource(this.sources.dropbox)
      this.setTaskSourceContent(this.selectedFiles)
      this.setStep({ step: 'source', value: true })
    }

  },
  computed: {
    ...mapState('task/builder', [
      'task', 'materialExtensions', 'sources', 'materials'
    ])
  }
}
</script>

<style scoped>

</style>
