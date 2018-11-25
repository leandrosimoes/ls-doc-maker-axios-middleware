# Ls Doc Maker Axios Middleware (UNDER CONSTRUCTION)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cadc1cc0e7724c49bc1795ab9b5b162d)](https://app.codacy.com/app/leandrosimoes/ls-doc-maker-axios-middleware?utm_source=github.com&utm_medium=referral&utm_content=leandrosimoes/ls-doc-maker-axios-middleware&utm_campaign=Badge_Grade_Dashboard)
[![npm version](https://badge.fury.io/js/ls-doc-maker-axios-middleware.svg)](https://badge.fury.io/js/ls-doc-maker-axios-middleware)
[![CircleCI](https://circleci.com/gh/leandrosimoes/ls-doc-maker-axios-middleware.svg?style=svg)](https://circleci.com/gh/leandrosimoes/ls-doc-maker-axios-middleware)
[![Build Status](https://travis-ci.org/leandrosimoes/ls-doc-maker-axios-middleware.svg?branch=master)](https://travis-ci.org/leandrosimoes/ls-doc-maker-axios-middleware)

A axios middleware to automatticaly create Ls Doc Maker json from axios requests

## Why?

I create this middleware based on my needs. I just wanted a easy way to build a Ls Doc Maker documetation for another developer so he could follow the documentation to build something for me.

## How to?

```javascript
// First thing is to import all stuff
const axios = require('axios');
const { LsDocMakerAxiosMiddlewareBuildOptions, attatchLsDocMaker, buildLsDocMaker } = require('ls-doc-maker-axios-middleware')

// Then you have to create a axios instance
const myAxiosInstance = axios.create({ ... })

// Then you have to wrap the axios instance with our attach method
let myLsDocMiddlewareInstance = attatchLsDocMaker(myAxiosInstance)

// Now every axios request that you do will generate some log that you will have to save it to json files like that
myLsDocMiddlewareInstance.toJsonFile('The path for your json files')

// But this is not the final documentation yet, first, you have to build the docs like this
const options = new LsDocMakerAxiosMiddlewareBuildOptions(
    ['Array of your generated json paths (same path passed before in toJsonFile method)'],
    'Ouput path for your final doc',
    'Title of your documentation',
    'url-of-your-docs.com',
    'Some observation about your docs',
    true // true or false for clear (delete) or not all json files generated with toJsonFile method after build the final doc
)

// Then build with the options
buildLsDocMaker(options)
```

That's it, now you can get your final json file and use in the my [Ls Doc Maker](https://github.com/leandrosimoes/ls-doc-maker) tool for change whatever you want before publish it

### Contribute

Just open Pull Requests, issues or just mail me: [leandro.simoes@outlook.com](mailto:leandro.simoes@outlook.com)
