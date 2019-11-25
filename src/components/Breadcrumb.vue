<template>
    <div class="breadcrumb">
        <ul ref="navlist">
            <li v-for="item in items">
                {{ item }}
                <router-link :to="item.to" active-class="active" :class="{'active':item.active}">{{ item.text }}</router-link>
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

.breadcrumb {
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

            margin-right: $spacing-2;
            &:last-child {
                margin-right: 0;
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
            }
        }
    }
}





@media only screen and (min-width: $viewport-tablet-portrait) {

    .breadcrumb {
        ul {
            li {
                margin-right: $spacing-3;
                &:last-child {
                    margin-right: 0;
                }
                a {
                    line-height: 48px;
                }
            }
        }
    }

}



@media only screen and (min-width: $viewport-large) {

    .breadcrumb {
        ul {
            li {
                margin-right: $spacing-4;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

}


</style>
