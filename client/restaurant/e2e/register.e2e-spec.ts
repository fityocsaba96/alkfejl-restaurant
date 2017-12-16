import { browser, by, element } from 'protractor';

describe('register function', () => {

  beforeAll(() => {
    browser.manage().deleteAllCookies();
  });

  beforeEach(() => {
    browser.get('/user/register');
  });

  it('should load', () => {
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/user/register`);
  });

  it('should display error for submitting empty form', () => {
    element(by.css('form button')).click();
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should load restaurant list after selecting city', () => {
    element(by.css('mat-select[name="restaurant"]')).click();
    expect(element(by.css('.mat-select-panel')).isPresent()).toBeFalsy();

    element(by.css('mat-select[name="city"]')).click();
    element.all(by.css('mat-option')).first().click();
    element(by.css('mat-select[name="restaurant"]')).click();
    expect(element(by.css('.mat-select-panel')).isPresent()).toBeTruthy();
  });

  it('should display error for submitting form with invalid value (zip code)', () => {
    submitFormWithTestData(false, true);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should display error for submitting form with unselected option in select (restaurant)', () => {
    submitFormWithTestData(true, false);
    expect(element(by.css('snack-bar-container')).getAttribute('class')).toContain('snackBarError');
  });

  it('should register for submitting form with valid data', () => {
    submitFormWithTestData(true, true);
    expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/user/login`);
  });

  function submitFormWithTestData(validZipCode: boolean, selectRestaurant: boolean): void {
    element(by.css('input[name="email"]')).sendKeys('newuser@gmail.com');
    element(by.css('input[name="password"]')).sendKeys('123456');
    element(by.css('input[name="first_name"]')).sendKeys('New');
    element(by.css('input[name="last_name"]')).sendKeys('User');
    element(by.css('input[name="zip_code"]')).sendKeys(validZipCode ? 1000 : 'one thousand');
    element(by.css('mat-select[name="city"]')).click();
    element.all(by.css('mat-option')).first().click();
    element(by.css('input[name="address"]')).sendKeys('Main way 1');
    element(by.css('input[name="phone_number"]')).sendKeys('+36301234567');
    if (selectRestaurant) {
      element(by.css('mat-select[name="restaurant"]')).click();
      element.all(by.css('mat-option')).first().click();
    }
    element(by.css('form button')).click();
  }
});
