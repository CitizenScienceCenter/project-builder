<template>
    <div class="scroll-effect">
        <div class="margin-bottom" v-show="loadedProjects.length >= 2">
            <div class="margin-bottom">
                <div class="row row-wrapping row-centered">
                    <div class="col col-wrapping col-large-5" :key="loadedProject[0].id" v-for="loadedProject in loadedProjects">
                        <ProjectTeaser :project="loadedProject[0]" :media="loadedProject[1]"></ProjectTeaser>
                    </div>
                </div>
            </div>
            <div class="row row-centered" v-if="showMore">
                <div class="button-group centered">
                    <button @click="loadMore" class="button button-secondary">Show more Projects</button>
                </div>
            </div>
        </div>
        <Loader v-show="loadedProjects.length < 2"></Loader>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import ProjectTeaser from "@/components/Project/ProjectTeaser";
    import Loader from "@/components/shared/Loader";

    export default {
        name: "ProjectListing",
        components: {
            Loader,
            ProjectTeaser
        },
        props: {
            limit: Number,
            showMore: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                allProjects: [],
                projectsToLoad: 0,
                loadedProjects: [],
                loadOffset: 0,
                loadLimit: this.limit
            }
        },
        created() {
            this.loadMore();
        },
        methods: {
            ...mapActions('c3s/project', [
                'getProject',
                'getProjects',
                'getProjectMedia'
                // 'getCategories',
                // 'getProjectsWithCategory'
            ]),

            loadProjects( limit, offset ) {
                this.$store.dispatch('c3s/project/getProjects', [undefined,limit,offset]).then((res) => {
                    // get all the projects only for the 'all' tab
                    //this.getProjectActivities(this.projectId).then((p) => {
                    if (res.status === 200) {
                        //this.projects = p.body.data;
                        // init the tab 'all' to the first page
                        //this.categoryAllPageChange(1)
                        this.allProjects = this.allProjects.concat( res.body.data );
                        this.projectsToLoad = this.allProjects.length;
                        this.loadMediaForProject(this.loadOffset);
                        this.loadOffset = this.projectsToLoad;
                    }
                })
            },
            loadMore() {
                this.loadProjects( this.loadLimit, this.loadOffset );
            },
            loadMediaForProject(index) {
                if( index < this.projectsToLoad ) {

                    this.getProjectMedia( this.allProjects[index].id ).then(media => {

                        let projectMedia;
                        if( media.body.length ) {
                            projectMedia = media.body[0];
                        }

                        this.loadedProjects.push( [ this.allProjects[index], projectMedia ] );

                        // load next
                        if( this.loadedProjects.length < this.allProjects.length ) {
                            this.loadMediaForProject(index+1);
                        }
                    });
                }
            }
        }
    }
</script>

<style>

</style>
