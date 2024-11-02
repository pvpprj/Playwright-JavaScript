const { expect } = require("@playwright/test");

class Dashboardpage{

    constructor(page, productsName){
          this.page = page;
          this.products = page.locator(".card-body");
          this.productText = page.locator(".card-body b");
          this.cart = page.locator("[routerlink*='cart']");
          this.checkout = page.locator("text=Checkout");
          this.dropDown = page.locator(".ta-results");
       //  this.userId = page.locator(".user__name [type='text']").first();
         this.placeorder = page.locator(".action__submit")
         this.myCardProductList = page.locator("div li");
         this.productConfirm = page.locator("h3:has-text('"+productsName+"')");
         this.countryName = page.locator("[placeholder*=Country]");
        this.userExpected = page.locator(".user__name [type='text']");
        this.messageTY = page.locator(".hero-primary");
        this.orderIDExpected = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderClick = page.locator("button[routerlink='/dashboard/myorders']");

    }

   async searchProductAddCart(productsName){
        // await page.locator(".card-body b").first().textContent();
        await this.productText.first().textContent();
       const titles = await this.productText.allTextContents();
       console.log(titles);
       const count = await this.products.count();
       console.log("Count = "+count);
      
       for(let i=0;i<count;i++)
        {
          if(await this.products.nth(i).locator("b").textContent()===productsName)
            {
             await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

  async navigateToCart(productsName){
    
        await this.cart.click();
       await this.myCardProductList.first().waitFor();
        const bool =this.productConfirm.isVisible();
        //expect(bool).toBeTruthy();
        expect(bool).toBeTruthy();
    }

  async checkoutproduct(username){
        await this.checkout.click();
        await this.countryName.pressSequentially("ind");
        await this.dropDown.waitFor();
        const optiotionCount = await this.dropDown.locator("button").count();

        for(let i=0;i<optiotionCount;i++)
            {
                const text = await this.dropDown.locator("button").nth(i).textContent();
                    if(text === " India")
                    {
                        await this.dropDown.locator("button").nth(i).click();   
                        break;
                    }
            }

          //  expect(userId).toHaveText(username);
            expect(this.userExpected.first()).toHaveText(username);

    }

    async placeOrderProduct() {
        await this.placeorder.click();
        await expect(this.messageTY).toHaveText(" Thankyou for the order. ");
              
   }


    
}
module.exports = {Dashboardpage};