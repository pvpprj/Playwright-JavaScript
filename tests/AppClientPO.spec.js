const {test,expect}= require('@playwright/test');
const {customtest} = require('../utils/test-base');
// const {LoginPage} = require('../pageobjects/LoginPage');
// const {Dashboardpage} = require('../pageobjects/Dashboardpage');

const {PoManager} = require('../pageobjects/PoManager');
// json -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for(const data of dataset)
{
test(`Client App login for ${data.productsName} `,async ({page})=>
{
  const poManager = new PoManager(page);
    // const username ="pvpprjc@gmail.com";
    // const password ="Qwer@12345";
    // const productsName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");
    console.log("Start test,,,,,,,,,,,,,,");
    
    // const loginpage = new LoginPage(page);
    const loginpage = poManager.getLoginPage();

    await loginpage.goTo();
    await loginpage.validLogin(data.username, data.password);

//     await page.waitForLoadState('networkidle');
//     // await page.locator(".card-body b").first().textContent();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles);
//    const count = await products.count();
//    console.log("Count = "+count);
   
//    for(let i=0;i<count;i++)
//     {
//       if(await products.nth(i).locator("b").textContent()===productsName)
//         {
//             await products.nth(i).locator("text= Add To Cart").click();
//             break;
//         }
//     }
   
    const dashboardPage = poManager.getDashboardPage();
    // const dashboardPage = new Dashboardpage(page,productsName);

       await dashboardPage.searchProductAddCart(data.productsName);  // await page.pause()
    await dashboardPage.navigateToCart(data.productsName);
    await dashboardPage.checkoutproduct(data.username);
    await dashboardPage.placeOrderProduct();

    // await page.locator("div li").first().waitFor();
  //  const bool =await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    // expect(bool).toBeTruthy();
    
    // await page.locator("text=Checkout").click();
    // await page.locator("[placeholder*=Country]").pressSequentially("ind");
    // const dropDown = page.locator(".ta-results");
    // await dropDown.waitFor();
    // const optiotionCount = await dropDown.locator("button").count();

    // for(let i=0;i<optiotionCount;i++)
    // {
    //     const text = await dropDown.locator("button").nth(i).textContent();
    //         if(text === " India")
    //         {
    //             await dropDown.locator("button").nth(i).click();   
    //             break;
    //         }
    // }

    // expect(page.locator(".user__name [type='text']").first()).toHaveText(username);  // to check user email id same as login email ID
    
    // await page.locator(".action__submit").click();   // click on Place Order
    
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();  //take orderId
    console.log("orderId = "+orderId);
    const FinalorderId = orderId.substring(3,orderId.length-2);
    console.log("FinalorderId = "+FinalorderId);

    // Order details 
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    // await expect(page.locator('[scope="row"]')).toHaveText(FinalorderId);

    await page.locator("tbody").waitFor();
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
        



  //  await page.pause();
    

}); 
}



customtest.only(`Client App login`,async ({page,testDataForOrder})=>
  {
    const poManager = new PoManager(page);
    
      const products = page.locator(".card-body");
      console.log("Start test,,,,,,,,,,,,,,");
      const loginpage = poManager.getLoginPage();
  
      await loginpage.goTo();
      await loginpage.validLogin(testDataForOrder.username, testDataForOrder.password);
  
      const dashboardPage = poManager.getDashboardPage();
  
      await dashboardPage.searchProductAddCart(testDataForOrder.productsName);  // await page.pause()
      await dashboardPage.navigateToCart(testDataForOrder.productsName);
      await dashboardPage.checkoutproduct(testDataForOrder.username);
      await dashboardPage.placeOrderProduct();
    });
  
  