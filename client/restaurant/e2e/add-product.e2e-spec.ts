import { browser, by, element } from 'protractor';

describe('add product function', () => {

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

  it('should load', () => {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/products/add`);
  });

  it('should display error for submitting empty form', () => {
    element(by.css('form button')).click();
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should display error for submitting form with invalid value (product name)', () => {
    submitFormWithTestData(true, false);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should display error for submitting form with unselected option in select (category)', () => {
    submitFormWithTestData(false, true);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should add product for submitting form with valid data', () => {
    submitFormWithTestData(true, true);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarSuccess');
  });

  function submitFormWithTestData(selectCategory: boolean, validProductName: boolean): void {
    if (validProductName) {
      element(by.css('input[name="product_name"]')).sendKeys('new product');
    }
    element(by.css('input[name="price"]')).sendKeys(10);
    if (selectCategory) {
      element(by.css('mat-select[name="category"]')).click();
      element.all(by.css('mat-option')).first().click();
    }
    element(by.css('form button')).click();
  }
});
