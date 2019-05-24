<template>
  <b-row>

    <b-col md="9">
      <div class="mt-3 mb-3" id="dropbox-button"></div>

      <b-list-group>
        <b-list-group-item v-for="(link, key) in links" :key="link">
          <div>
            <b-img v-if="task.material === materials.image" thumbnail style="width: 200px" :src="link"></b-img>
            <b-link :href="link" target="_blank">{{ link }}</b-link>
          </div>
          <div class="text-right">
            <b-btn @click="deleteLink(key)" variant="danger">Delete</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>

      <b-btn ref="btn-submit" v-if="links.length > 0" @click="onSubmit" class="mt-4" variant="success" size="md">Continue</b-btn>
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
      links: []
    }
  },
  mounted () {
    const dropbox = window.Dropbox
    const button = dropbox.createChooseButton({
      success: (files) => {
        this.links = files.map(value => {
          return value.link
        })
      },
      extensions: this.materialExtensions[this.task.material],
      // sizeLimit: 1024,
      linkType: 'direct',
      multiselect: true
      // folderselect: true
    })
    document.getElementById('dropbox-button').appendChild(button)

    if (Array.isArray(this.task.sourceContent)) {
      this.links = this.task.sourceContent
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskSource', 'setTaskSourceContent', 'setStep'
    ]),

    onSubmit () {
      this.setTaskSource(this.sources.dropbox)
      this.setTaskSourceContent(this.links)
      this.setStep({ step: 'source', value: true })
    },

    deleteLink (key) {
      this.links.splice(key, 1)
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
