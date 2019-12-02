<template>
  <div>
    <p>The CSV needs to look like this ... <br>(explanation coming here)</p>


    <div class="margin-bottom">
    <form @submit.prevent="onSubmit">

      <div class="form-field form-field-block">
        <label>CSV File</label>
        <input type="file" accept=".csv" placeholder="Select a CSV file ..." @change="setFile" />
      </div>

      <div class="button-group right-aligned">
        <button type="submit" class="button button-primary" :disabled="!csvFile">Submit</button>
      </div>

    </form>
    </div>

    <p class="small">You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use</p>


    <!--
    <br>
    <br>

    <b-row class="mt-4">

      <b-col md="9">
        <b-form ref="form" @submit.prevent="onSubmit" class="mt-4">
          <b-form-group>
            <b-file placeholder="Select a CSV file..." accept=".csv" v-model="csvFile"></b-file>
          </b-form-group>

          <b-button type="submit" variant="success">Send tasks</b-button>
        </b-form>

      </b-col>

      <b-col md="3">
        <p>You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use.</p>
      </b-col>
    </b-row>
    -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import LoadingSpinner from '@/components/Helper/LoadingSpinner'

export default {
  name: 'CsvSourceEditor',
  components: {
  },
  data: () => {
    return {
      csvFile: null
    }
  },
  created () {
  },
  computed: {
    ...mapState('task/builder', [
      'materialExtensions', 'task', 'sources', 'materials', 'loaders'
    ]),
    ...mapGetters('task/builder', [
      'getBucketFilesWithExtensions', 'getBucketFileLink'
    ]),

  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskSource', 'setTaskSourceContent', 'setStep', 'setBucketFiles', 'setBucketName', 'deleteBucketFile'
    ]),

    setFile (event) {
      this.csvFile = event.target.files[0];
    },


    onSubmit () {
      this.setTaskSource(this.sources.csv)
      const pid = this.$route.params.pid
      const self = this
      // Go through CSV and link task content to media
      this.$papa.parse(this.csvFile, {
        complete: function(res) {
          for (let idx in res.data) {
            let row = res.data[idx]
            row['part_of'] = pid
            row['required'] = true
            row['sequence'] = 0
            row['info'] = {}
            row['title'] = self.task.job
            row['content'] = self.task.template
          }
          self.$store.dispatch('c3s/task/importCSV', [pid, res.data]).then(res => {
            console.log(res)

            self.setTaskSourceContent( res.body.data );
            self.setStep({ step: 'source', value: true })
          })
        },
        error: function(err) {
          console.error(err)
        },
        header: true
      })
    }
  }
}
</script>

<style>

</style>
