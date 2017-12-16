import { browser, by, element } from 'protractor';

describe('add new product functionality', () =>{
    beforeAll(() => {
        browser.manage().deleteAllCookies();
        browser.get('/user/login');
        element(by.css('input[name="email"]')).sendKeys('admin@restaurant.com');
        element(by.css('input[name="password"]')).sendKeys('admin');
        element(by.css('form button')).click();
      });

    beforeEach(() => {
        browser.get('/products/add');
    });

    it('should display error for submitting empty form', () => {
        element(by.css('form button')).click();
        expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
      });

      it('should display error for submitting form with invalid price', () => {
        submitFormWithTestData(true, false, true);
        expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
      });

      it('should display error for submitting form with invalid product name', () => {
        submitFormWithTestData(true, true, false);
        expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
      });

      it('should add new product for submitting form with valid data', () => {
        submitFormWithTestData(true, true, true);
        expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarSuccess');
      });

      function submitFormWithTestData(validPrice: boolean, selectCategory: boolean, validName: boolean): void {
        element(by.css('input[name="product_name"]')).sendKeys(validName ? "newproduct" : "");
        element(by.css('textarea[name="description"]')).sendKeys('desc');
        element(by.css('input[name="price"]')).sendKeys(validPrice ? 10 : 'one thousand');
        if (selectCategory) {
          element(by.css('mat-select[name="category"]')).click();
          element(by.css('mat-option:first-of-type')).click();
        }
        element(by.css('form button')).click();
      }
})