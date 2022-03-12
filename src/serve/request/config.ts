let VUE_APP_BASE_URL: string
let VUE_APP_BASE_NAME: string
const TIMEOUT = 10000
//2.process.env.NODE_ENV
if (process.env.NODE_ENV == 'development') {
  //VUE_APP_BASE_URL = '/api'
  //VUE_APP_BASE_URL = '/hxh'
  VUE_APP_BASE_URL ='/dgut'
  VUE_APP_BASE_NAME = 'hxh-dev'
} else if (process.env.NODE_ENV == 'production') {
  VUE_APP_BASE_URL = 'http://152.136.185.210:5000'
  VUE_APP_BASE_NAME = 'hxh-prod'
} else {
  /*  VUE_APP_BASE_URL = 'http://coderwhy.org/test' */
}

export { VUE_APP_BASE_URL, VUE_APP_BASE_NAME, TIMEOUT }
