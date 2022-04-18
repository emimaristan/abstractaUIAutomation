const Page = require('./page');
const fs = require('fs');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsListPage extends Page {
    /**
     * define selectors using getter methods
     */

    get nextButton () {
        return $("//a[@class='andes-pagination__link ui-search-link' and @title='Siguiente']");
    }

    get productPrices () {
        return $$("//span[@class='price-tag-fraction']");
    }

    get productLinks() {
        return $$("//a[@class='ui-search-item__group__element ui-search-link']");
    }

    get productNames() {
        return $$("//h2[@class='ui-search-item__title']");
    }

    async createListOfProducts () {
        //First page
        let camisetasData = "<h1> Page1 </h1>";
        let productName = await this.productNames;
        let productPrice = await this.productPrices;
        let productLink = await this.productLinks;

        for (let i = 0; i < productName.length; i++) {
            camisetasData += "<h3>Product Name: " + await productName[i].getText() + "</h3>";
            camisetasData += "<h4>Link: " + await productLink[i].getAttribute('href') + "</h4>"; 
            camisetasData += "<h4>Price: $" + await productPrice[i].getText() + "</h4>";
            camisetasData += "<br><br>";
        } 

        //Second page
        await this.nextButton.click();

        productName = await this.productNames;
        productPrice = await this.productPrices;
        productLink = await this.productLinks;

        camisetasData += "<h1> Page2 </h1>";

        for (let i = 0; i < productName.length; i++) {
            camisetasData += "<h3>Product Name: " + await productName[i].getText() + "</h3>";
            camisetasData += "<h4>Link: " + await productLink[i].getAttribute('href') + "</h4>"; 
            camisetasData += "<h4>Price: $" + await productPrice[i].getText() + "</h4>";
            camisetasData += "<br><br>";
        } 

        //Third page
        await this.nextButton.click();

        productName = await this.productNames;
        productPrice = await this.productPrices;
        productLink = await this.productLinks;

        camisetasData += "<h1> Page3 </h1>";
        
        for (let i = 0; i < productName.length; i++) {
            camisetasData += "<h3>Product Name: " + await productName[i].getText() + "</h3>";
            camisetasData += "<h4>Link: " + await productLink[i].getAttribute('href') + "</h4>"; 
            camisetasData += "<h4>Price: $" + await productPrice[i].getText() + "</h4>";
            camisetasData += "<br><br>";
        } 

        this.createFile(camisetasData);
    }


    //Create file function
    async createFile (camisetasData){
        let promiseWriteFile = new Promise((resolve, reject) => {
            fs.writeFile('camisetas.html', camisetasData, (error) => {
                if(error){
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        
        promiseWriteFile
        .then(() => {
            console.log('Successful.');
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }
}

module.exports = new ProductsListPage();
