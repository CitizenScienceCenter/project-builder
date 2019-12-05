<template>
    <div>
        <div class="project">

            <div class="project-info">

                <h3>{{ project.name }}</h3>
                <p>{{ project.info.shortDescription }}</p>

                <div class="button-group">
                    <router-link class="button button-primary" :to="{ name: 'project', params: { pid: project.id } }">Go to Project</router-link>
                </div>

            </div>

            <div class="overlay"></div>

            <div v-if="media" class="project-bg-image" :style="{
                backgroundImage: 'url('+encodeURI(media.path)+')'
            }"></div>
            <div v-else class="project-bg-image"></div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "ProjectTeaser",
        props: {
            project: Object,
            media: Object
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .project {

        position: relative;
        border-radius: $border-radius;
        box-shadow: 0px 4px 8px -4px rgba($color-black,0.2);
        overflow: hidden;
        cursor: pointer;

        .project-info {
            position: relative;
            z-index: 2;
            color: white;
            height: 100%;
            padding: $spacing-3 $spacing-2;

            h3 {
                font-size: $font-size-medium;
                font-weight: 700;
                line-height: 1.25;
                text-align: left;
                margin-bottom: $spacing-2;
                text-transform: uppercase;
            }

            p {
                width: 75%;
                font-size: $font-size-small;
                margin-bottom: $spacing-2;
            }


            min-height: 240px;

            .button-group {
                position: absolute;
                bottom: $spacing-3;
                left: $spacing-2;
            }

        }
        .overlay {
            background: linear-gradient(120deg, $color-gradient-start, $color-gradient-end );
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0.8;
        }
        .project-bg-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/static/img/cover.jpg');
            background-size: cover;
            background-position: 50% 50%;
        }


    }

    @media only screen and (min-width: $viewport-large) {


        .project {

            .project-info {

                min-height: 280px;

                p {
                    width: 50%;
                }
            }
            .overlay {
            }
            .project-bg-image {
            }


        }

    }


</style>
