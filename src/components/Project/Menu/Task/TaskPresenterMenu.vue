<template>
  <div>
    <b-row>
      <b-col>
        <b-breadcrumb></b-breadcrumb>
        <b-btn>Back to Tasks</b-btn>
        <h3>Use one of the following available <b>templates</b> for your project</h3>

        <b-row>
          <b-col>

            <div>
              <h4>Basic</h4>
              <p>The most basic template</p>
              <p><b>Skills</b>: HTML and Javascript</p>
              <b-btn variant="outline-primary">Use</b-btn>
            </div>

            <div>
              <h4>Sound Pattern Recognition</h4>
              <p>Re-use the SoundCloud template</p>
              <p><b>Skills</b>: HTML and Javascript</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

            <div>
              <h4>Geo-coding</h4>
              <p>Re-use the Urban Park template</p>
              <p><b>Skills</b>: HTML, Javascript and Geo expertise</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

            <div>
              <h4>epiCollect+</h4>
              <p>Re-use the epiCollect+ template</p>
              <p><b>Skills</b>: HTML and Javascript</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

          </b-col>

          <b-col>

            <div>
              <h4>Image Pattern Recognition</h4>
              <p>Re-use the Flickr Person Finder template</p>
              <p><b>Skills</b>: HTML and Javascript</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

            <div>
              <h4>Video Pattern Recognition</h4>
              <p>Re-use the Vimeo template</p>
              <p><b>Skills</b>: HTML and Javascript</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

            <div>
              <h4>Transcribing documents</h4>
              <p>Re-use the PDF transcription template</p>
              <p><b>Skills</b>: HTML, Javascript and Server side</p>
              <b-btn variant="outline-primary">Use</b-btn>
              <b-btn variant="outline-primary">Download</b-btn>
            </div>

          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TaskPresenterMenu'
}
</script>

<style scoped>

</style>
