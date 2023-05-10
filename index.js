import playwright from 'playwright';
async function func() {
    const browser = await playwright['chromium'].launch({ headless: false,});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.gismeteo.ru/weather-novosibirsk-4690/tomorrow/");
    
    let articles =  await page.$$("article");

    let data = [];                 
    for(let article of articles)
    {
        data.push({
            temperature: await article.$eval("span.unit unit_temperature_c", el => el.textContent),
        });
    } 
    console.log(data);
}    
func();  