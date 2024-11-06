// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('console');

const config ={
  testDir: './tests',

  timeout: 30 * 1000,
  expect:{
    timeout: 5000
  },

  reporter:'html',
  projects :[
    {
      name :'safari',
      use:{
        browserName : 'webkit',
        headless : true ,
        screenshot : 'off',
        // trace : 'retain-on-failure' ,           
         trace : 'on' ,
      }
    } ,
    {
      name :'chrome',
      use:{
        browserName : 'chromium',
        headless : false ,
       screenshot : 'on',
        // trace : 'retain-on-failure' ,           
        trace : 'on' ,
      }
    },
    {
      name :'Firefox',
      use:{
        browserName : 'firefox',
        headless : false ,
       screenshot : 'on',
        // trace : 'retain-on-failure' ,           
        trace : 'on' ,
      }
    }
  ]

  ,

};

module.exports = config;