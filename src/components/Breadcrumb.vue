<template>
    <div class="app-breadcrumb">
        <ul ref="navlist">
            <li v-for="(item,index) in items" :key="'bc-'+index" :class="{'has-arrow':index !== 0}">
                <span class="arrow" v-if="index !== 0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M381.48,273,187.13,467.31a24,24,0,0,1-33.94,0l-22.67-22.66a24,24,0,0,1,0-33.9L284.51,256l-154-154.75a24,24,0,0,1,0-33.9l22.67-22.66a24,24,0,0,1,33.94,0L381.48,239A24,24,0,0,1,381.48,273Z"/></svg>
                </span>

                <router-link v-if="item.to" :to="item.to" :class="{'active':item.active,'disabled':item.disabled}">{{ item.text }}</router-link>
                <a v-else :class="{'active':item.active,'disabled':item.disabled}">{{ item.text }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props: {
            items: Array
        }
    }
</script>

<style lang="scss">

@import '../styles/theme.scss';
@import '../styles/shared/variables.scss';

.app-breadcrumb {
    padding: $spacing-1 0;
    overflow-x: auto;
    background: linear-gradient(120deg, rgba($color-gradient-start, 0.025), rgba($color-gradient-end, 0.025) );

    ul {
        display: table;
        white-space: nowrap;
        box-sizing: border-box;
        font-size: 0;
        margin: auto;
        padding: 0 calc( #{$grid-margin-mobile} + #{$grid-gutter-mobile} / 2);

        li {
            white-space: nowrap;
            display: inline-block;
            font-size: 0;

            &:last-child {
                margin-right: 0;
            }


            &.has-arrow {
                position: relative;
                padding-left: 40px;
            }
            .arrow {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 40px;
                height: 40px;
                svg {
                    position: absolute;
                    top: calc( 40px /2 - 8px );
                    left: calc( 40px /2 - 8px );
                    width: 16px;
                    height: 16px;
                    fill: $color-black-tint-80;
                }
            }

            a {
                white-space: nowrap;
                display: block;
                font-size: $font-size-small;
                color: $color-black-tint-50;
                line-height: 40px;

                &:active {
                    color: $color-black;
                }
                @media (hover: hover) {
                    &:hover {
                        color: $color-black;
                    }
                }

                &.active {
                    color: $color-black;
                }

                &.disabled {
                    opacity: 0.25;
                    pointer-events: none;
                }
            }
        }
    }
}





@media only screen and (min-width: $viewport-tablet-portrait) {

    .app-breadcrumb {
        ul {
            li {
                &:last-child {
                    margin-right: 0;
                }

                &.has-arrow {
                    padding-left: 48px;
                }
                .arrow {
                    width: 48px;
                    height: 48px;
                    svg {
                        top: calc( 48px /2 - 8px );
                        left: calc( 48px /2 - 8px );
                    }
                }

                a {
                    line-height: 48px;
                }
            }
        }
    }

}



@media only screen and (min-width: $viewport-large) {

    .app-breadcrumb {
        ul {
            li {
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

}


</style>
