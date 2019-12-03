<template>
  <section class="project-cover" :style="{ 'background-image': 'url(' + encodeURI(imageUrl) + ')' }">

    <div class="content-wrapper">
      <div class="row">
        <div class="col">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="cover-overlay"></div>
  </section>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    imageUrl: String
  },
  mounted: function() {
      let matches = this.$el.querySelectorAll(".scroll-effect");
      window.setTimeout(function() {
          for( let i=0; i < matches.length; i++ )  {
              matches[i].classList.add("scrolled");
          }
      }, 1);
  }
}
</script>

<style lang="scss">

@import '@/styles/theme.scss';
@import '@/styles/shared/variables.scss';

.project-cover {
  height: 440px;
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;

  .scroll-effect {
    transition: all $transition-duration-super-long $transition-timing-function;
    transform: translateY($scroll-effect-offset);
    opacity: 0;

    &.scroll-effect-delayed-1 {
      transition-delay: 0.25s;
    }
    &.scroll-effect-delayed-2 {
      transition-delay: 0.5s;
    }
    &.scroll-effect-delayed-3 {
      transition-delay: 0.75s;
    }

    &.scrolled {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .button {
    margin: $spacing-1;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;

    padding-bottom: $spacing-4;

    .cover-heading {
      font-size: $font-size-large;
      line-height: 1.25;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: $spacing-1;
    }
    .cover-subheading {
      font-size: $font-size-normal;
      font-weight: 400;
      color: white;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: $spacing-1;
    }

  }

  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    //background: linear-gradient(to bottom right, $color-secondary, $color-primary-secondary-mix );
    background: linear-gradient(120deg, $color-gradient-start, $color-gradient-end );
    opacity: 0.8;
  }

}

@media only screen and (min-width: $viewport-mobile-large) {
  .project-cover {
    height: 480px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-normal;
        margin-bottom: $spacing-2;
      }
    }
  }
}

@media only screen and (min-width: $viewport-tablet-portrait) {
  .project-cover {
    height: 470px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-medium;
      }
    }

  }
}

@media only screen and (min-width: $viewport-large) {
  .project-cover {

    height: 80vh;
    max-height: 470px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xxlarge;
      }
      .cover-subheading {
        font-size: $font-size-large;
      }
    }

  }
}

@media only screen and (min-width: $viewport-xlarge) {
  .project-cover {

    height: 80vh;
    max-height: 600px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xxxlarge;
      }
      .cover-subheading {
        font-size: $font-size-xlarge;
      }
    }
  }
}

</style>
