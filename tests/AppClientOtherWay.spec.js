const {test,expect}= require('@playwright/test');


test('Page context Playwright Test',async ({page})=>
{
    const email ="pvpprjc@gmail.com";
    const productsName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Qwer@12345");
    await page.getByRole("button",{name: "login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().textContent();

    await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"})
    .getByRole("button",{name:"Add To Cart"}).click();     //  select product as ADIDAS ORIGINAL 

    await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
    await page.getByRole("button",{name: "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
   
    await page.getByRole("button",{name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();  // click on Place Order
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();  //take orderId
    console.log("orderId = "+orderId);
    const FinalorderId = orderId.substring(3,orderId.length-2);
    console.log("FinalorderId = "+FinalorderId);
    // Order details 
    await page.getByRole("button",{name: "ORDERS"}).click();
    await expect(page.getByText(FinalorderId)).toBeVisible();
    await page.locator(".table-bordered").filter({hasText: FinalorderId}).
         getByRole("button",{name:"View"}).nth(0).click();
    await expect(page.getByText(FinalorderId)).toBeVisible();

    await page.getByText("View Orders").click();
    await page.getByRole("button",{name: "Go Back to Shop"}).click();

    await page.getByText("Showing").waitFor();


    // await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"})
    // .getByRole("button",{name:"Add To Cart"}).click();     //  select product as ADIDAS ORIGINAL 

    // await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click();

     
    
    // // await expect(page.locator('[scope="row"]')).toHaveText(FinalorderId);

    // await page.locator("tbody").waitFor();
    // const rows = await page.locator("tbody tr");

    // for(let i=0;i<await rows.count();i++)
    //     {
    //       const rowOrderId =await rows.nth(i).locator("th").textContent();
    //          if(FinalorderId.includes(rowOrderId)){
    //             await rows.nth(i).locator("button").first().click();   // tbody tr button.btn-primary
    //             break;
    //         }
    //     }

    //     const orderIdDetails =  await page.locator(".col-text").textContent();
    //     expect(FinalorderId.includes(orderIdDetails)).toBeTruthy();
        



  //  await page.pause();
    

});