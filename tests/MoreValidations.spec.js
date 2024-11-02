const{test,expect} = require("@playwright/test");


test("Popup validations" ,async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  
    expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    expect(await page.locator("#displayed-text")).toBeHidden();

    //await page.pause();
   page.on('dialog',dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*=lifetime-access]:visible").click();
    const textCheck =  await framePage.locator(".text h2 span").textContent();
    console.log("No = "+textCheck);
    // await page.locator("").click();

})

// Screenshot

test("Screenshot validations" ,async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  
    expect( page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScrrenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'scrrenshot.png'});
    expect( page.locator("#displayed-text")).toBeHidden();

    console.log("-------Pass Screeshot-------");
    // await page.locator("").click();

})


test.only("visual validations" ,async({page}) =>
    {
        await page.goto("https://www.google.com/"); 
        expect(await page.screenshot()).toMatchSnapshot('landing.png');

       
      
        // await page.locator("").click();
    // https://rahulshettyacademy.com/upload-download-test/index.html
    })