const e = require("express");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://en.wikipedia.org/wiki/List_of_countries_with_alcohol_prohibition",
    { timeout: 120000 }
  );

  const ul = await getAllSearchedItems(page);

  // const formatItem = await formatItems(items);
  console.log(ul);

  await browser.close();
})();

function getAllSearchedItems(page) {
  const ul = page.evaluate(() => {
    const all = document.querySelectorAll("ul"); //all the searched items for the searched item
    return all;
  });
  return ul;
}

function formatItems(items) {
  if (!items) {
    return null;
  }
  let newItems = [];
  items.forEach((item) => {
    const title = item.querySelector(".product-title").innerText;
    const discount = item.querySelector(".badge.saving")
      ? item.querySelector(".badge.saving").innerText
      : null;
    const brand = item.querySelector(
      "product-card-module_brand-wrapper_Kv3Cy"
    ).innerText;
    const price = document.querySelector(
      ".currency.plus.currency-module_currency_29IIm"
    ).innerText;
    const obj = {
      title: title,
      discount: discount,
      brand: brand,
      price: price,
    };
    newItems.push(obj);
  });
  return newItems;
}
