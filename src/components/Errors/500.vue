<i18n>
{

"en": {

"cover-heading": "Citizen Science Lab",
"cover-subheading": "Start Building Your Projects",
"cover-button-primary": "Create a Project",
"cover-button-secondary": "Browse Projects",

"projects-header": "Featured Projects"

}

}
</i18n>


<template>
  <div>
    <h1 v-if="msg">{{msg}}</h1>
    <h1 v-else>The server failed trying to find your answer</h1>
    <app-footer></app-footer>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SeverError',
  components: {
  },
  data: function() {
    return {
      lang: 'en'
    }
  },
  props: {
    'msg': {
      type: string,
      required: false
    }
  },
  metaInfo: function() {
    return {
      title: this.$t('site-title'),
      titleTemplate: null,
      meta: [
        {
          property: 'og:title',
          content: this.$t('site-title')
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
