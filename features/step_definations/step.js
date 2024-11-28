const { When,Given , Then } = require('@cucumber/cucumber');
const {PoManager} = require('../../pageobjects/PoManager');
const {expect}= require('@playwright/test');
const {playwright}= require('@playwright/test');


Given('I log in to the Ecommerce application with {string} and {string}', async function (username, password) {
    
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    this.poManager = new PoManager(page);
    const products = page.locator(".card-body");
    console.log("Start test,,,,,,,,,,,,,,");
    
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
  });

  When('I add {string} to the cart and verify product is displayed in the cart with {string}',async function (productsName,username) {
    this.dashboardPage = this.poManager.getDashboardPage();
    // const dashboardPage = new Dashboardpage(page,productsName);

       await dashboardPage.searchProductAddCart(productsName);  // await page.pause()
    await dashboardPage.navigateToCart(productsName);
    await dashboardPage.checkoutproduct(username);
   
  });

//   Then('I verify {string} is displayed in the cart', async function (string) {
//     const dashboardPage = this.poManager.getDashboardPage();

//     await dashboardPage.checkoutproduct(data.username);
  
// });

const FinalorderId="";
const orderId="";

  When('I enter valid details and place the order',async function () {
   const dashboardPage = this.poManager.getDashboardPage();

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await dashboardPage.placeOrderProduct();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();  //take orderId
    console.log("orderId = "+orderId);
    const FinalorderId = orderId.substring(3,orderId.length-2);
    console.log("FinalorderId = "+FinalorderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();

  });

  Then('I verify the order is present in the Order History',async function () {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    

    const rows = await page.locator("tbody tr");

    for(let i=0;i<await rows.count();i++)
        {
          const rowOrderId =await rows.nth(i).locator("th").textContent();
             if(FinalorderId.includes(rowOrderId)){
                await rows.nth(i).locator("button").first().click();   // tbody tr button.btn-primary
                break;
            }
        }

        const orderIdDetails =  await page.locator(".col-text").textContent();
        expect(FinalorderId.includes(orderIdDetails)).toBeTruthy();
           
  });