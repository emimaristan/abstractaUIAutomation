

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputSearch () {
        return $('#cb1-edit');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    async searchFor (search) {
        await this.inputSearch.setValue(search);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('/');
    }
}

module.exports = new MainPage();
