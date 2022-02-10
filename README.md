# infoApp

Sovellus toimii vain branchissa local.

Ensin navigoi root/frontend/src/ kansioon, ja siellä aja komento npm install, minkä jälkeen npm run start. Nyt frontend käynnistyy localhost:3000.

Sitten navigoi root/ kansioon, jossa npm install, tsc ja node dist/app.js. Nyt backend käynnistyy localhost/8080.

Sovellus tarvitsee vielä roottiin .env tiedoston, jossa on tietokannan tarvittat tiedot formaatissa:

DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_DB = 

Sovellukseen sopivan taulun luontilause.
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(40) NOT NULL,
  lName VARCHAR(60) NOT NULL,
  age INT UNSIGNED NOT NULL,
  PRIMARY KEY(id)
);
