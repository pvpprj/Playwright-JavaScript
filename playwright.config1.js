//  npx playwright test tests/AppClientPO.spec.js --config playwright.config1.js --project=chrome
// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('console');
const { permission } = require('process');

const config ={
  testDir: './tests',
  retries:1,
  workers : 3,

  timeout: 20 * 1000,
  expect:{
    timeout: 5000
  },

  reporter:'html',
  projects :[
    {
      name :'safari',
      use:{
        browserName : 'webkit',
        headless : false ,
        screenshot : 'off',
        // trace : 'retain-on-failure' ,           
         trace : 'on' ,
         ...devices['iPhone 11']
      }
    } ,
    {
      name :'chrome',
      use:{
        browserName : 'chromium',
        headless : false ,
       screenshot : 'on',
        // trace : 'retain-on-failure' ,           
        // viewport :{width:720 , height:720},
        trace : 'on' ,
        ignoreHttpsErrors :true,
        permission : ['geolocation'],
        video : 'retain-on-failure'
      }
    }
  ]

  ,

};

module.exports = config;