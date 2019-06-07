<template>
  <div>
    <b-card v-b-toggle.csv-collapse @click="closeOtherImporters" ref="card-csv" class="text-center material" :class="{ 'material-selected': isLocalCsvVisible }">
      <i class="fas fa-file-csv fa-4x"></i>
      <div class="m-2">CSV file</div>
    </b-card>
    <b-collapse id="csv-collapse" v-model="isLocalCsvVisible">
      <b-form @submit.prevent="onSubmit" class="mt-4">
        <b-form-group>
          <b-file placeholder="Select a CSV file..." accept=".csv" v-model="csvFile"></b-file>
        </b-form-group>

        <b-button type="submit" variant="success">Send tasks</b-button>
      </b-form>
    </b-collapse>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'LocalCsvImporter',
  data: () => {
    return {
      csvFile: ''
    }
  },
  methods: {
    ...mapMutations('task/importer', [
      'setAmazonS3ImporterVisible',
      'setLocalCsvImporterVisible',
      'setGoogleDocImporterVisible',
      'setOnlineCsvImporterVisible'
    ]),
    ...mapActions('task/importer', [
      'importLocalCsvTasks'
    ]),

    onSubmit () {
      this.importLocalCsvTasks({
        project: this.project,
        file: this.csvFile
      })
    },

    closeOtherImporters () {
      this.setGoogleDocImporterVisible(false)
      this.setOnlineCsvImporterVisible(false)
      this.setAmazonS3ImporterVisible(false)
    }
  },
  computed: {
    ...mapState('task/importer', [
      'isLocalCsvImporterVisible'
    ]),
    ...mapState('project', {
      project: state => state.selectedProject
    }),

    isLocalCsvVisible: {
      get () {
        return this.isLocalCsvImporterVisible
      },
      set (value) {
        this.setLocalCsvImporterVisible(value)
      }
    }
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

  .material-selected {
    background-color: $primary;
    color: $white;
  }
</style>
