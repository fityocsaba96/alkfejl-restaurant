# Dokumentáció:

## Könyvtárstruktúra:

A projektben 8 csomag található.
### controller
 A controller csomagban 8 osztály található. A controller osztályok végzik az adatok továbbítását a service osztályok felé, frissítik a megjelenést. Az osztályok különválasztják a modellt és a megjelenítést.
### entity
Az entity csomagban található osztályok az adatbázisban megjelenő táblákat reprezentálják. Egy tábla egy osztálynak felel meg. A tábla egy sora az osztály egy példánya.
### repository
A repository osztályok célja, hogy jelentősen csökkentse a Boilerplate kód mennyiségét. Az itt található metódusok megkönnyítik az adatok elérését az adatbázisból.
### service
A service csomagban található osztályok nyújtják a logikát az adatbázis és a kliens közötti adatfolyamhoz. Az itt található metódusok oldják meg a konkrét feladatokat.
### service.annotation
Ebben a csomagban egyetlen osztály található, ennek az osztálynak a segítségével tudunk annotációt rakni a metódusokra, hogy tudjuk, hogy milyen autentikációs szint kell az egyes funkciókhoz.
### service.authinterceptor
Ebben a csomagban található osztály nyújtja a logikát a Role annotáció működéséhez.
### entity.request
A csomagban egy osztály található, amely egy egyedi kérést valósít meg. A kérésben található entitásokat reprezentálja.
### entity.response
A csomagban egy osztály található, amely egy egyedi választ valósít meg. A válaszban található entitásokat reprezentálja.
## Fejlesztő környezet:
A fejlesztéshez az IntelliJ IDEA-t használtunk. A verziókezeléshez gitet használtunk.
## Használt technológiák:
Az alkalmazás JAVA nyelven lett írva.
### Maven: 
Egy szoftver, amelyet szoftverprojektek menedzselésére és a build folyamat automatizálására lehet használni. A Maven fő komponense az úgynevezett Project Object Model(POM), ez egy buildelendő projektet ír le és annak függőségeit. Az egyes lépéseket céloknak, angolul goal-oknak nevezik. Ennél a projektnél a spring-boot:run célt használtuk.
### Lombok:
Egy Java könyvtár, a Boilerplate kód csökkentésére szolgál. Annotációkkal műkődik, egy annotáció használatakor legenerálja nekünk az annotációhoz tartozó metódusokat.
### Rest:
Egy szoftverarchitektúra típus elosztott szoftverek részére. Egy REST típusú architektúra kliensekből és szerverekből áll. A kliensek kéréseket indítanak a szerverek felé; a szerverek kéréseket dolgoznak fel és a megfelelő választ küldik vissza.
### JPA:
A Java Persistence API, vagy röviden JPA, egy keretrendszer a Java programozási nyelvhez, melynek fő feladata a relációs adatok kezelése. Maga az API, a javax.persistence csomagban definiálva. A JPA tulajdonképpen egy interfészt ad, melyet implementálni lehet. Az egyik implementációja a Hibernate.
### ModelMapper:
Célja az objektum feltérképezésének megkönnyítése, azáltal, hogy automatikusan meghatározza, hogy az egyik objektummodell hogyan kapcsolódik egy másikhoz.
