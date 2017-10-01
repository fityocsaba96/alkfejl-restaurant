# Web application of a hungarian restaurant network with home delivery

## Functions

**Guest functions**
- sign up
- log in

**User functions**
- edit user settings
- view menu
- sort menu by category
- add product to cart
- place order
- view user orders and its status
- review products

**Admin functions**
- view orders for the restaurant that is set in settings
- change status of order
- add product
- remove product

## Details
- guests can sign up only with a city where there is a restaurant
- users can review a product only if the user has already ordered it
- users can place orders only when the restaurant is open
- the restaurants offer the same menu, but their opening hours may differ
- the order is made to the restaurant that is set in settings
- contents of the cart are stored in session
- no delivery cost, no online payment

## Database design
```sql
USER (
    ID IDENTITY PRIMARY KEY,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    PASSWORD_HASH VARCHAR(60),
    ZIP_CODE SMALLINT,
    CITY_ID BIGINT,
    ADDRESS VARCHAR(50),
    PHONE_NUMBER VARCHAR(12),
    RESTAURANT_ID BIGINT,
    IS_ADMIN BOOLEAN DEFAULT FALSE,
    FOREIGN KEY(CITY_ID) REFERENCES CITY(ID),
    FOREIGN KEY(RESTAURANT_ID) REFERENCES RESTAURANT(ID)
)
RESTAURANT (
    ID IDENTITY PRIMARY KEY,
    ZIP_CODE SMALLINT,
    CITY_ID BIGINT,
    ADDRESS VARCHAR(50),
    OPEN_HOUR_WEEKDAY TINYINT,
    CLOSE_HOUR_WEEKDAY TINYINT,
    OPEN_HOUR_WEEKEND TINYINT,
    CLOSE_HOUR_WEEKEND TINYINT,
    PHONE_NUMBER VARCHAR(12),
    FOREIGN KEY(CITY_ID) REFERENCES CITY(ID)
)
CITY (
    ID IDENTITY PRIMARY KEY,
    NAME VARCHAR(30)
)
PRODUCT (
    ID IDENTITY PRIMARY KEY,
    NAME VARCHAR(50),
    CATEGORY_ID BIGINT,
    DESCRIPTION VARCHAR(300),
    PRICE SMALLINT,
    FOREIGN KEY(CATEGORY_ID) REFERENCES CATEGORY(ID)
)
CATEGORY (
    ID IDENTITY PRIMARY KEY,
    NAME VARCHAR(50)
)
REVIEW (
    ID IDENTITY PRIMARY KEY,
    CREATE_DATE TIMESTAMP,
    PRODUCT_ID BIGINT,
    USER_ID BIGINT,
    STARS TINYINT,
    DESCRIPTION VARCHAR(300),
    FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID),
    FOREIGN KEY(USER_ID) REFERENCES USER(ID)
)
ORDER (
    ID IDENTITY PRIMARY KEY,
    USER_ID BIGINT,
    CREATE_DATE TIMESTAMP,
    NOTE VARCHAR(100),
    STATUS_ID BIGINT,
    FOREIGN KEY(USER_ID) REFERENCES USER(ID),
    FOREIGN KEY(STATUS_ID) REFERENCES STATUS(ID)
)
ORDER_PRODUCT (
    ID IDENTITY PRIMARY KEY,
    ORDER_ID BIGINT,
    PRODUCT_ID BIGINT,
    QUANTITY TINYINT,
    FOREIGN KEY(ORDER_ID) REFERENCES ORDER(ID),
    FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID)
)
STATUS (
    ID IDENTITY PRIMARY KEY,
    DESCRIPTION VARCHAR(100)
)
```
