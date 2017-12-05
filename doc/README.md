# Dokumentáció

## Használt technológiák, fejlesztő környezet szerver oldalon

Az alkalmazás JAVA nyelven lett írva. A fejlesztéshez IntelliJ IDEA-t, a verziókezeléshez gitet használtunk.

### H2

Relációs adatbázis-kezelő rendszer, az alkalmazásban használt adatok tárolására.

### Spring Boot

Java keretrendszer, a webes funkciók támogatására, REST API szerver alkalmazás létrehozására használtuk.

### Maven

Egy szoftver, amelyet szoftverprojektek menedzselésére és a build folyamat automatizálására lehet használni. A Maven fő komponense az úgynevezett Project Object Model (POM), ez egy buildelendő projektet ír le és annak függőségeit. Az egyes lépéseket céloknak, angolul goal-oknak nevezik. Ennél a projektnél a spring-boot:run célt használtuk.

### Lombok

Egy Java könyvtár, a boilerplate kód csökkentésére szolgál. Annotációkkal műkődik, egy annotáció használatakor legenerálja nekünk az annotációhoz tartozó metódusokat.

### REST

Egy szoftverarchitektúra típus elosztott szoftverek részére. Egy REST típusú architektúra kliensekből és szerverekből áll. A kliensek kéréseket indítanak a szerverek felé; a szerverek kéréseket dolgoznak fel és a megfelelő választ küldik vissza.

### JPA

A Java Persistence API, vagy röviden JPA, egy keretrendszer a Java programozási nyelvhez, melynek fő feladata a relációs adatok kezelése. Maga az API, a javax.persistence csomagban van definiálva. A JPA tulajdonképpen egy interfészt ad, melyet implementálni lehet. Az egyik implementációja a Hibernate.

### ModelMapper

Célja az objektum feltérképezésének megkönnyítése, azáltal, hogy automatikusan meghatározza, hogy az egyik objektummodell hogyan kapcsolódik egy másikhoz.

## Használt technológiák, fejlesztő környezet kliens oldalon

A fejlesztéshez Angular keretrendszert használtunk. A fejlesztéshez Visual Studio Code-t, a verziókezeléshez gitet használtunk.

### Angular

AngularJS egy JavaScript keretrendszer. Az AngularJS kiterjeszti a HTML-attribútumokat, és adatokat köt a HTML-hez kifejezésekkel. 

### Angular Material

Az Angular Material egy UI komponens keretrendszer és a Google Material Design specifikációinak referenciamódszere. Az oldalakon az elemek megjelenítéséhez ezt a keretrendszert használtuk.

### AJAX (Asynchronous JavaScript And XML.)

A szerverrel AJAX kérésekkel történik a kommunikáció. Az AJAX lehetővé teszi a weboldalak frissítését aszinkron módon azáltal, hogy az adatokat egy webkiszolgálóval cseréli ki a háttérben. Ez azt jelenti, hogy a weblap egyes részeinek frissítése az egész oldal újbóli töltése nélkül lehetséges.

### Typescript

A TypeScript egy ingyenes és nyílt forrású programozási nyelv, amelyet a Microsoft fejlesztett ki és tart karban. A TypeScript használatával JavaScript-alkalmazások fejleszthetők az kliensoldali vagy szerveroldali végrehajtásra. A TypeScript nagy alkalmazások fejlesztésére és ezek JavaScript-re fordítására készült.

### NPM

NPM egy csomagkezelő JavaScript nyelvhez. Ez az alapértelmezett csomagkezelő a JavaScript futási környezetéhez a Node.js-hez.

### HTML

A HTML (angolul: HyperText Markup Language=hiperszöveges jelölőnyelv) egy leíró nyelv, melyet weboldalak készítéséhez fejlesztettek ki, és mára már internetes szabvánnyá vált a W3C (World Wide Web Consortium) támogatásával. HTML általában szöveges állományokban található meg. Ezek az állományok tartalmazzák azokat a szimbólumokat, amelyek a megjelenítő programnak leírják, hogyan is kell megjeleníteni illetve feldolgozni az adott állomány tartalmát.

### CSS

A stílusok a HTML megjelenítési elemei és attribútumai helyett használhatók, azoknál jóval több lehetőséget biztosítva. A stílusok meghatározzák, hogy hogyan jelenjenek meg vizuálisan a HTML elemek. A stíluslapok segítségével könnyen szét lehet választani az oldal tartalmát annak kinézetétől (a dizájntól).

## Adatbázis terv

![Adatbázis terv](/doc/database_design.png?raw=true)

## Könyvtárstruktúra szerver oldalon

A projektben 10 csomag található.

### controller

A controller csomagban 8 osztály található. A controller osztályok végzik az adatok validálását és továbbítását a service osztályok felé.

### entity

Az entity csomagban található osztályok az adatbázisban megjelenő táblákat reprezentálják. Egy tábla egy osztálynak felel meg. A tábla egy sora az osztály egy példánya.

### entity.request

A csomagban egy osztály található, amely egy egyedi kérést valósít meg. A kérésben található entitásokat reprezentálja.

### entity.response

A csomagban egy osztály található, amely egy egyedi választ valósít meg. A válaszban található entitásokat reprezentálja.

### repository

A repository osztályok célja, hogy jelentősen csökkentse a boilerplate kód mennyiségét. Az itt található metódusok megkönnyítik az adatok elérését az adatbázisból.

### service

A service csomagban található osztályok nyújtják a logikát az adatbázis és a kliens közötti adatfolyamhoz. Az itt található metódusok oldják meg a konkrét feladatokat.

### service.annotation

Ebben a csomagban egyetlen osztály található, ennek az osztálynak a segítségével tudunk annotációt rakni a metódusokra, hogy tudjuk hogy milyen autentikációs szint kell az egyes funkciókhoz.

### service.exceptionhandler

A csomagban található osztály globálisan lekezeli a végpontokról érkező hibás adatok validálásakor keletkező kivételt.

### service.interceptor

Ebben a csomagban található osztály nyújtja a logikát a Role annotáció működéséhez.

### service.validator

Itt találhatók a végpontokról érkező adatok validálását elvégző osztályok.

## Könyvtárstruktúra kliens oldalon

### app

Ebben a csomagban találhatóak a többi csomagok, ezen kívül az app komponens fájljai és app.module.ts található itt.

### app/components

Ebben találhatóak az egyes komponensek külön csomagokban.

### app/components/add-product

Új termék felvételéhet szükséges komponens fájljai találhatóak itt.

### app/components/cart

A felhasználó vásárlói kosarát megvalósító komponens fájljai.

### app/components/incoming-order-list

A beérkező megrendelések menedzselését megvalósító komponens fájljai.

### app/components/login`

A bejelentkezést megvalósító komponens található itt.

### app/components/menu

A menüt valósítja meg.

### app/components/order

Az egyes megrendelések kinézetével és menedzselésével kapcsolatos fájlok.

### app/components/product

Az egyes termékek kinézetével és menedzselésével kapcsolatos fájlok.

### app/components/product-list

Termékek listázását megvalósító komponens.

### app/components/product-list-by-category

A termékek listázását kategóriák szerint valósítja meg a komponens.

### app/components/register`

Új felhazsnálók regisztrálását megvalósító komponens.

### app/components/restaurant

Az egyes éttermek kinézetével és menedzselésével kapcsolatos fájlok.

### app/components/restaurant-list

Éttermek listázását megvalósító komponens.

### app/models

Ebben a csomagban található fájlok az adatbázisban megjelenő táblákat reprezentálják. Egy tábla egy osztálynak felel meg.

### app/modules

Ebben a könyvtárban 2 fájl található. Az egyik a végpontokat írja le, a másik az Angular Material komponenseket írja le.

### app/services

A models csomagban található fájlok service osztályai találhatóak itt. Ezek az entitások menedzselését valósítják meg.

## Végpontok

Az alkalmazásban megvalósított végpontok leírása, a hozzájuk tartozó funkció szerint csoportosítva. Zárójelben látható az adott végpont hozzáférhetősége felhasználói szerepek alapján *(A = adminisztrátor, U = felhasználó, G = vendég)*.

### Regisztráció

`GET /api/restaurants` *(A,U,G)*

*Nem közvetlenül a regisztrációhoz tartozik, de azt segíti elő az étterem választásnál.* Az összes étterem adatainak megjelenítése címmel és nyitvatartási időkkel együtt.

`GET /api/cities` *(A,U,G)*

A beállítható városok megtekintése.

`GET /api/city/:id/restaurants` *(A,U,G)*

A megadott városban található éttermek megtekintése. A megfelelő étterem kiválasztására szolgál.

`POST /api/user/register` *(G)*

A regisztráció leadása a megadott adatok ellenőrzésével. A regisztráció visszautasításra kerül, ha a megadott email cím már létezik, vagy ha a kiválasztott étterem nem a felhasználó városában található.

### Bejelentkezés

`POST /api/user/login` *(G)*

Email és jelszó alapján történő bejelentkezés. Ha az email cím nem létezik, vagy a hozzá tartozó jelszó nem egyezik, a bejelentkezés nem történik meg.

### Kijelentkezés

`POST /api/user/logout` *(A,U)*

A bejelentkezett felhasználó kijelentkeztetése.

### Felhasználó adatainak módosítása

`GET /api/user/me` *(A,U)*

A felhasználói adatok megtekintése a módosítás oldalon az előzetes kitöltés céljából.

`PUT /api/user/me` *(A,U)*

Módosított felhasználói adatok elmentése. A regisztrációnál meghatározott követelményeknek a módosítás után is teljesülnie kell.

### Menü megtekintése

`GET /api/products` *(A,U)*

Az összes termék és adatainak megtekintése.

### Menü szűrése kategória alapján

`GET /api/categories` *(A,U)*

Az elérhető kategóriák megtekintése a szűrés alapjának meghatározására.

`GET /api/category/:id/products` *(A,U)*

A megadott kategóriában található termékek és adatainak megtekintése.

### Termék hozzáadása a kosárhoz

*Nem szükséges végpont ehhez a funkcióhoz, a kosarat kizárólag a kliens kezeli, a szerver csak az összeállított rendelést kapja meg rendelés leadás esetén.*

### Rendelés leadása

`POST /api/order` *(U)*

A rendelés leadása a kiválasztott termékek és azok mennyiségének megadásával. A rendelés a beállított étteremhez érkezik be. Nem lehet üres rendelést leadni, illetve zárva tartó étteremből rendelni.

### Felhasználó rendeléseinek megtekintése

`GET /api/user/me/orders` *(U)*

A bejelentkezett felhasználó rendeléseinek megtekintése a rendelt termékekkel, azok állapotával és a végösszeggel együtt.

### Termékek értékelése

`GET /api/product/:id/reviews` *(A,U)*

A megadott termékhez beérkezett értékelések megtekintése.

`POST /api/product/:id/review` *(U)*

Új értékelés leadása a megadott termékhez. Csak akkor lehetséges, ha a felhasználó már rendelt az adott termékből, de még nem írt hozzá értékelést.

### Beérkező rendelések megtekintése

`GET /api/orders/incoming` *(A)*

A beállított étteremhez beérkezett rendelések megtekintése.

### Rendelés állapotának változtatása

`GET /api/statuses` *(A)*

A beállítható állapotok megtekintése a beállítás könnyítése céljából.

`PUT /api/order/:id` *(A)*

A megadott rendelés állapotának változtatása a megadott új állapotra.

### Termék hozzáadása

`POST /api/products` *(A)*

Új termék hozzáadása a kínálathoz a megadott adatokkal. 

### Termék eltávolítása

`DELETE /api/product/:id` *(A)*

A megadott termék eltávolítása a kínálatból. Ekkor a termék értékelései is törlődnek, a hozzá tartozó rendelésekben pedig ezentúl törölt termékként fog megjelenni. A törölt terméket nem lehet törölni.

## Egy végpont bemutatása: rendelés leadása

### Lépések

- `POST /api/order` végpont meghívása a kérés testében egy `OrderRequest` objektummal
- A jogosultság ellenőrzése, nem felhasználó esetén kérés visszautasítása
- A beérkező `OrderRequest` objektum ellenőrzése
  - A megjegyzés nem lehet 100 katakternél több
  - A rendelt termékekben mindegyik mennyiség legalább 1 kell, hogy legyen
  - Minimum egy terméket meg kell adni a rendeléshez
  - Csak a beállított étterem nyitvatartási idejében lehet rendelést leadni
- Valamelyik feltétel megsértése esetén a rendelés nem történik meg, válaszként egy hibaüzenet érkezik a felhasználó részére
- `OrderRequest` objektum átalakítása egy `Order` és több `OrderProduct` entitássá
- A rendelés alapértelmezett tulajdonságainak beállítása: létrehozás dátuma, felhasználó, állapot
- A rendelés elmentése az adatbázisban, ennek visszaadása válaszként

### Példa kérés test

```json
{
    "note": "Please hurry!",
    "orderProducts": [
        {
            "quantity": 2,
            "product": {
                "id": 3
            }
        },
        {
            "quantity": 1,
            "product": {
                "id": 1
            }
        }
    ]
}
```