<template>
  <div>
    <b-row class="mt-4">

      <!-- Avatar -->
      <b-col md="4">
        <b-img v-if=" 'info' in activity && 'thumbnail_url' in activity.info " :src="activity.info.thumbnail_url" class="shadow" rounded fluid-grow></b-img>
        <b-img v-else blank-color="#777" :blank="true" class="shadow" rounded fluid-grow></b-img>
      </b-col>

      <!-- Header -->
      <b-col md="8" class="mt-4 mt-md-0">
        <h2>{{ activity.name }}</h2>
        <p>{{ activity.description }}</p>

        <!-- Owner actions -->
        <div v-if="isLoggedUserOwnerOfActivity(activity) && !activity.published">
          <b-btn ref="btn-draft-complete-it" :to="{ name: 'task.builder.material', params: { id } }" variant="success" size="lg">Draft, complete it!</b-btn><br>
          <b-btn ref="btn-test-it" :to="{ name: 'activity.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
          <b-btn ref="btn-publish-it" variant="outline-secondary" size="sm" class="mt-2" v-b-modal.publish-activity>Publish it!</b-btn><br>
          <!-- Publish activity modal -->
          <b-modal
                  id="publish-activity"
                  title="Publish your activity"
                  ok-title="Yes, publish it"
                  cancel-title="No, do not publish it!"
                  @ok="publish"
          >
            <b-alert variant="danger" :show="true">
              You are about to publish your activity. This CANNOT be undone! Once your activity has been published, people will be able to contribute to it.
              All the task runs (answers) that may have been created during the test phase will be flushed and your activity will start fresh.
              That means that your activity should be working properly, so please make sure it does. Otherwise you can work on it and publish it once it works fine.
            </b-alert>
          </b-modal>
        </div>

        <div v-else-if="isAnonymousActivity">
          <b-btn ref="btn-contribute" :to="{ name: 'activity.task.presenter' }" variant="success" size="lg">Contribute!</b-btn>
        </div>

      </b-col>

    </b-row>

    <b-row class="mt-5">
      <b-col cols="12">

        <b-tabs content-class="mt-5 mb-5" active-nav-item-class="font-weight-bold" fill>

          <b-tab title="Info" :active="currentTab === tabs.info" @click="setCurrentTab(tabs.info)">
            <ActivityInfoMenu></ActivityInfoMenu>
          </b-tab>

          <!-- Temporary removed -->
          <b-tab v-if="false" :title="'Results (' + results.n_results + ')'" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
            <ActivityResultsMenu></ActivityResultsMenu>
          </b-tab>

          <b-tab ref="tab-tasks" v-if="isLoggedUserOwnerOfActivity(activity)" title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">
            <ActivityTasksMenu></ActivityTasksMenu>
          </b-tab>

          <!-- Temporary removed -->
          <b-tab v-if="false" title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
            <ActivityStatisticsMenu></ActivityStatisticsMenu>
          </b-tab>

          <b-tab ref="tab-settings" v-if="isLoggedUserOwnerOfActivity(activity)" title="Settings" :active="currentTab === tabs.settings" @click="setCurrentTab(tabs.settings)">
            <!-- v-if used to render the component only if the tab is active -->
            <ActivityEditor v-if="currentTab === tabs.settings"></ActivityEditor>
          </b-tab>

        </b-tabs>

      </b-col>
    </b-row>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import ActivityInfoMenu from '@/components/Activity/Menu/ActivityInfoMenu'
import ActivityTasksMenu from '@/components/Activity/Menu/ActivityTaskMenu'
import ActivityStatisticsMenu from '@/components/Activity/Menu/ActivityStatisticMenu'
import ActivityResultsMenu from '@/components/Activity/Menu/ActivityResultMenu'
import ActivityDescription from '@/components/Activity/ActivityDescription'
import TemplateRenderer from '@/components/Task/TemplateRenderer'
import ActivityEditor from '@/components/Activity/ActivityEditor'

export default {
  name: 'Activity',
  components: {
    ActivityEditor,
    TemplateRenderer,
    ActivityDescription,
    ActivityResultsMenu,
    ActivityInfoMenu,
    ActivityTasksMenu,
    ActivityStatisticsMenu
  },
  created () {
    // eager loading: load the activity and finally get stats and results
    // to have a fresh state for all sub components
    this.getActivity(this.id).then(activity => {
      // load some stats
      this.getStatistics(activity)
      this.getResults(activity)
      // checks if the activity is open for anonymous users or not
      this.getNewTask(activity).then(allowed => {
        this.isAnonymousActivity = !!allowed
        // TODO: should go to the home screen?
      })
      if (this.isLoggedUserOwnerOfActivity(activity)) {
        // has to be loaded to know if the activity can be published
        this.getActivityTasks(activity)
      }
    })

  },
  data: () => {
    return {
      isAnonymousActivity: true
    }
  },
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivity',
      'publishActivity',
      'getResults',
      'getStatistics'
    ]),
    ...mapActions('task', [
      'getActivityTasks',
      'getNewTask'
    ]),
    ...mapMutations('activity/menu', [
      'setCurrentTab'
    ]),
    ...mapMutations('notification', [
      'showError'
    ]),

    publish () {
      if (this.taskPresenter.length > 0) {
        if (this.activityTasks.length > 0) {
          this.publishActivity(this.activity)
        } else {
          this.showError({
            title: 'Impossible to publish the activity',
            content: 'You must add at least one task to the activity'
          })
        }
      } else {
        this.showError({
          title: 'Impossible to publish the activity',
          content: 'You must provide a task presenter to publish the activity'
        })
      }
    }
  },
  computed: {
    ...mapState('activity', {
      activity: state => state.selectedActivity,
      results: state => state.selectedActivityResults,
      stats: state => state.selectedActivityStats
    }),
    ...mapState('task', [
      'taskPresenter',
      'activityTasks'
    ]),
    ...mapState('activity/menu', [
      'currentTab', 'tabs'
    ]),
    ...mapGetters('user', [
      'isLoggedUserOwnerOfActivity'
    ])
  }
}
</script>

<style scoped>

</style>
