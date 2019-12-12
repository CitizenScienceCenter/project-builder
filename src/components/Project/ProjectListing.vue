<template>
    <div>
        <template v-if="allProjects !== undefined">
            <template v-if="allProjects.length > 0">
                <div class="margin-bottom" v-show="loadedProjects.length > 0">
                    <div class="margin-bottom">
                        <div class="row row-wrapping row-centered">
                            <div class="col col-wrapping col-large-5" :key="loadedProject[0].id" v-for="loadedProject in loadedProjects">
                                <ProjectTeaser :project="loadedProject[0]" :media="loadedProject[1]"></ProjectTeaser>
                            </div>
                        </div>
                    </div>
                    <div class="row row-centered" v-if="showMore && !allLoaded">
                        <div class="button-group centered">
                            <button @click="loadMore" class="button button-secondary">Show more Projects</button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="centered">No projects</p>
            </template>
        </template>
        <Loader v-else></Loader>
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
            },
            search: Object
        },
        data() {
            return {
                allProjects: undefined,
                projectsToLoad: 0,
                loadedProjects: [],
                loadOffset: 0,
                loadLimit: this.limit,
                allLoaded: false
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

            loadProjects( search, limit, offset ) {
                this.$store.dispatch('c3s/project/getProjects', [search,limit,offset]).then((res) => {
                    // get all the projects only for the 'all' tab
                    //this.getProjectActivities(this.projectId).then((p) => {
                    if (res.status === 200) {
                        console.log( res);
                        //this.projects = p.body.data;
                        // init the tab 'all' to the first page
                        //this.categoryAllPageChange(1)
                        if( this.allProjects === undefined ) {
                            this.allProjects = [];
                        }
                        if( res.body.data.length < limit ) {
                            this.allLoaded = true;
                        }
                        this.allProjects = this.allProjects.concat( res.body.data );
                        this.projectsToLoad = this.allProjects.length;
                        this.loadMediaForProject(this.loadOffset);
                        this.loadOffset = this.projectsToLoad;
                    }
                })
            },
            loadMore() {
                this.loadProjects( this.search, this.loadLimit, this.loadOffset );
            },
            loadMediaForProject(index) {
                if( index < this.projectsToLoad ) {

                    this.getProjectMedia( this.allProjects[index].id ).then(media => {

                        let projectMedia;
                        if( media.body.length ) {
                            media.body.sort( function(a,b){
                                let a_time = new Date(a.created_at).getTime();
                                let b_time = new Date(b.created_at).getTime();
                                return b_time - a_time;
                            });
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
