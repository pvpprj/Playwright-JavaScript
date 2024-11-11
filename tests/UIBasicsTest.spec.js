const {test,expect}= require('@playwright/test');


test('@Web Browser context Playwright Test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log ("Title of Page = "+await page.title());

    const userName = page.locator('input#username');
    const signInBtn = page.locator('#signInBtn');
    const alert = page.locator("[class='alert alert-danger col-md-12'][style*='block']");
    const cardTitles = page.locator(".card-body a");

    await userName.fill("rahul");
    await page.locator('#password').fill("learning");
    await signInBtn.click();
   var ss = await alert.textContent();
   console.log(ss);
   await expect(alert).toContainText('Incorrect');
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signInBtn.click();
   await expect(alert).toContainText('Incorrect');

   console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());

   const allTitles =await cardTitles.allTextContents();
   console.log(allTitles);
    
});

test('@Web UI Control',async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
           
        const userName = page.locator('input#username');
        const signInBtn = page.locator('#signInBtn');
        const documentLink = page.locator('[href*=documents-request]');
          
        const dropDown = page.locator('select.form-control');  // dropdown select
        await dropDown.selectOption("Consultant");
       
        await page.locator(".checkmark").nth(1).click();   // click on radio button
        await page.locator("#okayBtn").click();   // click on OK button

        console.log(await page.locator(".checkmark").nth(1).isChecked());  // to check Radio button selected or not
        await expect(page.locator(".checkmark").nth(1)).toBeChecked();  
       
        await page.locator('#terms').click();   // click on terms checkBox
        await expect(page.locator("#terms")).toBeChecked();  
        await page.locator('#terms').uncheck();
        expect(await page.locator('#terms').isChecked()).toBeFalsy();

        await expect(documentLink).toHaveAttribute("class","blinkingText");

       // await page.pause();
    });

// windw handle ---------
    test('Child Window Handle',async ({browser})=>
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const documentLink = page.locator('[href*=documents-request]');
            const userName = page.locator('input#username');
            const signInBtn = page.locator('#signInBtn');
           
          const [newPage]=await Promise.all(
           [
           context.waitForEvent('page'),     // listen for any new page pending , reject , fulfilled
            documentLink.click(),
           ])  // new Page is open

           // console.log(await newPage.locator(".red").textContent());
           
           const text= await newPage.locator(".red").textContent();
           const aarayText= text.split("@");
           const domain = aarayText[1].split(" ")[0];
           console.log(domain);
           await page.locator('#username').fill(domain);
    //       await page.pause();
           console.log(await page.locator('#username').textContent());
           

        }  );