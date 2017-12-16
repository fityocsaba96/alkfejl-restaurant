import { browser, by, element } from 'protractor';

describe('place order function', () => {

  beforeAll(() => {
    browser.manage().deleteAllCookies();
    browser.get('/user/login');
    element(by.css('input[name="email"]')).sendKeys('user1@gmail.com');
    element(by.css('input[name="password"]')).sendKeys('one');
    element(by.css('form button')).click();
  });

  beforeEach(() => {
    browser.get('/cart');
    element(by.css('mat-table')).isPresent().then(present => {
      if (!present) {
        browser.get('/products');
        element.all(by.css('app-product-list button')).first().click();
        browser.get('/cart');
      }
    });
  });

  it('should load', () => {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/cart`);
  });

  it('should not display form after cart is emptied', () => {
    element.all(by.css('mat-table button')).first().click();
    expect(element(by.css('form')).isPresent()).toBeFalsy();
  });

  it('should display error for submitting form with invalid data (note)', () => {
    submitFormWithTestData(false);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should place order for submitting form with valid data if restaurant is open', () => {
    submitFormWithTestData(true);
    element(by.css('snack-bar-container')).getAttribute('class').then(classNames => {
      if (classNames.includes('snackBarError')) {
        expect(element(by.css('simple-snack-bar')).getText()).toContain('closed');
      }
    });
  });

  function submitFormWithTestData(validNote: boolean): void {
    if (!validNote) {
      element(by.css('textarea[name="note"]')).sendKeys('a'.repeat(101));
    }
    element(by.css('form button')).click();
  }
});
