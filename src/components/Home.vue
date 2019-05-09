<template>
  <div>
    <!--<b-jumbotron header="Pybossa">
      <p>Some text...</p>
    </b-jumbotron>-->

    <b-row class="mt-4">
      <b-col cols="12" md="6">
        <b-card bg-variant="light" text-variant="dark">
          <b-card-text>
            Find a project that fascinate you, and help researchers analyse their data
          </b-card-text>
          <b-button href="#" variant="outline-primary">Find a project</b-button>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" class="mt-4 mt-sm-0">
        <b-card bg-variant="light" text-variant="dark">
          <b-card-text>
            Create a Project and get other volunteers to help you analyse your data.
          </b-card-text>
          <b-button href="#" variant="outline-primary">Create a project</b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="justify-content-center mt-4">
      <h2 class="text-center p-2">Featured projects</h2>
      <b-col cols="12">
        <b-row align-v="center" class="justify-content-center">
          <b-col class="mt-3" :key="project.id" cols="4" v-for="project in projects">
            <b-card
              :title="project.name"
              :img-src="thumbnail(project)"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">

              <b-card-text>
                {{ project.long_description }}
              </b-card-text>

              <b-button href="#" variant="primary">Go to project</b-button>
            </b-card>
          </b-col>
        </b-row>

      </b-col>

    </b-row>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('project/all')
  },
  computed: {
    ...mapState({
      projects: state => state.project.all
    }),
    ...mapGetters('project', {
      thumbnail: 'thumbnail'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
