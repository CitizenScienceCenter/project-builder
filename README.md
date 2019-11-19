# pybossa-client


## Running this branch

You will need:
* [github.com/citizensciencecenter/project-builder](Project Builder)
* [github.com/citizensciencecenter/backend](Backend)
* [github.com/citizensciencecenter/vuex-c3s](Vuex C3S Package)

> Pybossa client

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```


## Dev links

## File Uploading

C3S uses Minio for file uploads and these calls are handlded by the vuex library

1. Use the vuex-c3s library to get a pre signed URL for your file (providing the ID of the object to link it to and the filename)
2. Use the following snippet to upload:
```bash

fetch(pre_signed_url, {
            method: 'PUT',
            body: file
        }).then(() => {
            // Handle file status here
            console.log(file.name + ' was uploaded successfully')
        }).catch((e) => {
            console.error(e)
        })
```

More info for the S3 storage engine Minio can be found [here](https://docs.min.io/docs/upload-files-from-browser-using-pre-signed-urls.html)

### Vue
- routing : https://router.vuejs.org/
- vuex : https://vuex.vuejs.org/
- assets and css : https://vue-loader.vuejs.org/#what-is-vue-loader
- list of components : https://github.com/vuejs/awesome-vue
- bootstrap vue : https://bootstrap-vue.js.org/docs/components/layout

### Testing

- e2e : http://nightwatchjs.org/guide/
- unit : 
    - Vue test helper : https://vue-test-utils.vuejs.org/
    - Assertions : https://www.chaijs.com/api/bdd/
- test runner : http://karma-runner.github.io/0.13/config/configuration-file.html
- karma intellij integration : https://gitlab.mobilethinking.ch/pybossa/client/wikis/Configure-Karma-test-runner-in-PhpStorm-or-WebStorm

### Global config

- eslint rules : https://eslint.org/docs/2.0.0/rules/
