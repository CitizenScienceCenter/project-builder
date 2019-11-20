<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-8 col-xlarge-6 scroll-effect">
              <h2 class="heading centered">Setup</h2>
              <p class="button-group centered">You just created your project {{ selectedProject.name }}.</p>
              <p class="button-group centered">Want to keep going? Set it up right now!</p>
              <div class="margin-bottom">
                <div class="button-group centered">
                  <router-link class="button button-primary" :to="{ name: 'task.builder.material', params: { pid: selectedProject.id } }">Set up</router-link>
                </div>
              </div>

              <p class="button-group centered">
                You can always leave it for later and visit your <router-link :to="{ name: 'project', params: { pid: selectedProject.id } }">projects's page</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </app-content-section>

    <!--
    <b-row>
      <b-col>
        <h2 class="mt-3 mb-3">Congratulations</h2>
        <p>You just created your project {{ selectedProject.name }}.</p>
        <p>Want to keep going? Set it up right now!</p>
        <b-btn variant="success" class="mt-3 mb-3" :to="{ name: 'task.builder.material', params: { pid: selectedProject.id } }">Come on!</b-btn><br>
        <i>You can always leave it for later and visit your <b-link :to="{ name: 'project', params: { pid: selectedProject.id } }">project's page</b-link></i>
      </b-col>
    </b-row>
    -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';

export default {
  name: 'SummaryBuilder',
  components: {
    'app-content-section': ContentSection
  },
  computed: {
    ...mapState('c3s/project', {
      'selectedProject': state => state.project
    })
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
