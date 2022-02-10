# infoApp

Sovellus toimii vain branchissa local.

Ensin aja komento npm install rootissa, ja root/frontend kansioissa.

Käynnistä frontend ajamalla komento npm run start kansiossa root/frontend/src. Frontend käynnistyy porttiin localhost:3000.

Käynnistä backend ajamalla rootissa node dist/app.js.

Sovellus tarvitsee vielä roottiin .env tiedoston, jossa on tietokannan tarvittat tiedot formaatissa:

  - DB_HOST = "hostin nimi"
  - DB_USER = "käyttäjätunnus"
  - DB_PASSWORD = "salasana"
  - DB_DB = "tietokannan nimi"

Sovellukseen sopivan taulun luontilause.
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(40) NOT NULL,
  lName VARCHAR(60) NOT NULL,
  age INT UNSIGNED NOT NULL,
  PRIMARY KEY(id)
);
