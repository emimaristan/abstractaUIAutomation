const { Given, When, Then } = require('@wdio/cucumber-framework');

const MainPage = require('../pageobjects/main.page');
const ProductsListPage = require('../pageobjects/productsList.page');

const pages = {
    main: MainPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
    await browser.maximizeWindow();
});

When(/^I search for (\w+)$/, async (search) => {
    await MainPage.searchFor(search);
});

Then(/^I should see a list of all the related products and create a txt file$/, async () => {
    await expect(browser).toHaveUrl('https://listado.mercadolibre.com.uy/camisetas#D[A:camisetas]');
    await ProductsListPage.createListOfProducts();
});

