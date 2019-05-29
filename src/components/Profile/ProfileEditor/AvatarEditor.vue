<template>
  <b-row>
    <b-col>
      <vue-cropper ref="cropper" v-show="pictureSelected" :src="selectedPicture" :autoCrop="true" :view-mode="2" :aspectRatio="+1"></vue-cropper>
      <b-form-file @change="setImage" accept=".jpg, .png, .gif"></b-form-file>
      <b-btn v-if="pictureSelected" variant="success" class="float-right mt-2" @click="onSubmit">Save avatar</b-btn>
      <LoadingSpinner id="user/updateAvatar" class="mt-2"></LoadingSpinner>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueCropper from 'vue-cropperjs'
import LoadingSpinner from '@/components/Helper/LoadingSpinner'

export default {
  name: 'AvatarEditor',
  data: () => {
    return {
      pictureSelected: false,
      selectedPicture: ''
    }
  },
  components: {
    LoadingSpinner,
    VueCropper
  },
  computed: {
    ...mapState('user', {
      profile: state => state.infos
    })
  },
  methods: {
    ...mapActions('user', [
      'updateAvatar'
    ]),

    setImage (event) {
      const file = event.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedPicture = e.target.result
          this.$refs.cropper.replace(this.selectedPicture)
          this.pictureSelected = true
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    onSubmit () {
      this.updateAvatar({
        user: this.profile,
        avatar: this.$refs.cropper.getCroppedCanvas().toDataURL()
      }).then(response => {
        if (response) {
          this.$refs.cropper.reset()
          this.pictureSelected = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
