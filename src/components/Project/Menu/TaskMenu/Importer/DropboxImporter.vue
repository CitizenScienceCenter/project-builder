<template>
  <div>
    <b-card v-b-toggle.dropbox-collapse @click="closeOtherImporters" ref="card-dropbox" class="text-center material" :class="{ 'material-selected': isDropboxVisible }">
      <i class="fab fa-dropbox fa-4x"></i>
      <div class="m-2">Dropbox</div>
    </b-card>
    <b-collapse id="dropbox-collapse" v-model="isDropboxVisible">
      <p>Dropbox</p>
    </b-collapse>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'DropboxImporter',
  data: () => {
    return {

    }
  },
  methods: {
    ...mapActions('task/importer', [
      'importFlickrTasks'
    ]),
    ...mapMutations('task/importer', [
      'setAmazonS3ImporterVisible',
      'setGoogleDocImporterVisible',
      'setLocalCsvImporterVisible',
      'setOnlineCsvImporterVisible',
      'setDropboxImporterVisible',
      'setFlickrImporterVisible'
    ]),

    onSubmit () {

    },

    closeOtherImporters () {
      this.setLocalCsvImporterVisible(false)
      this.setOnlineCsvImporterVisible(false)
      this.setGoogleDocImporterVisible(false)
      this.setAmazonS3ImporterVisible(false)
      this.setFlickrImporterVisible(false)
    }
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    ...mapState('task/importer', [
      'isDropboxImporterVisible'
    ]),

    isDropboxVisible: {
      get () {
        return this.isDropboxImporterVisible
      },
      set (value) {
        this.setDropboxImporterVisible(value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  .material {
    &:hover {
      cursor: pointer;
      transition: all 0.3s;
      background-color: $primary;
      color: $white;
    }
  }

  .material-selected {
    background-color: $primary;
    color: $white;
  }
</style>
