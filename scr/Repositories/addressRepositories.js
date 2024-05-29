const { response } = require('express');
const db = require('../db/dbMySql');


// Countries
const registerCountryRepository = async (data) => {
  try {
    const result = await db.query("INSERT INTO dbos.Countries(Name_Country, Abbreviation, Prefix) VALUES (?,?,?)", [data.Name_Country, data.Abbreviation, data.Prefix]);
    return [result[0]["affectedRows"], result[0]["insertId"]];
  } catch (error) {
    return error;
  }
}

const listCountriesRepository = async () => {
  try {
    let result = await db.query(`SELECT *
                                FROM dbos.Countries;`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const detailsCountryRepository = async (id) => {
  try {
    const result = await db.query(`SELECT *
                                   FROM dbos.Countries
                                   WHERE ID_Country = ${id}`);
    return result[0][0];
  } catch (error) {
    return [error];
  }
}

const updateCountryRepository = async (id, data) => {
  try {
    const result = await db.query(`UPDATE dbos.Countries
                                 SET Name_Country = ?
                                    ,Abbreviation = ?
                                    ,Prefix       = ?
                                 WHERE ID_Country = ?;`, [data.Name_Country, data.Abbreviation, data.Prefix, id]);

    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

const deleteCountryRepository = async (id) => {
  try {
    const result = await db.query(`DELETE FROM dbos.Countries 
                                   WHERE ID_Country = ${id}`);
    
    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

// States
const registerStateRepository = async (data) => {
  try {
    const result = await db.query("INSERT INTO dbos.States(Name_State, Abbreviation, ID_Country) VALUES (?,?,?)", [data.Name_State, data.Abbreviation, data.ID_Country]);
    return [result[0]["affectedRows"], result[0]["insertId"]];
  } catch (error) {
    return error;
  }
}

const listStatesRepository = async () => {
  try {
    let result = await db.query(`SELECT *
                                FROM dbos.States;`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const detailsStateRepository = async (id) => {
  try {
    const result = await db.query(`SELECT *
                                   FROM dbos.States
                                   WHERE ID_State = ${id}`);
    return result[0][0];
  } catch (error) {
    return [error];
  }
}

const updateStateRepository = async (id, data) => {
  try {
    const result = await db.query(`UPDATE dbos.States
                                   SET Name_State = ?
                                      ,Abbreviation = ?
                                      ,ID_Country       = ?
                                   WHERE ID_State = ?;`, [data.Name_State, data.Abbreviation, data.ID_Country, id]);

    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

const deleteStateRepository = async (id) => {
  try {
    const result = await db.query(`DELETE FROM dbos.States 
                                   WHERE ID_State = ${id}`);
    
    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

// Cities
const registerCityRepository = async (data) => {

  try {
    const result = await db.query("INSERT INTO dbos.Cities(Name_City, DDD,  ID_State) VALUES (?,?,?)", [data.Name_City, data.DDD, data.ID_State]);
    return [result[0]["affectedRows"], result[0]["insertId"]];
  } catch (error) {
    return error;
  }
}

const listCitiesRepository = async () => {
  try {
    let result = await db.query(`SELECT *
                                FROM dbos.Cities;`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const detailsCityRepository = async (id) => {
  try {
    const result = await db.query(`SELECT *
                                   FROM dbos.Cities
                                   WHERE ID_City = ${id}`);
    return result[0][0];
  } catch (error) {
    return [error];
  }
}

const updateCityRepository = async (id, data) => {
  try {
    const result = await db.query(`UPDATE dbos.Cities
                                   SET Name_City = ?
                                      ,DDD       = ?
                                      ,ID_State  = ?
                                   WHERE ID_City = ?;`, [data.Name_City, data.DDD, data.ID_State, id]);

    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

const deleteCityRepository = async (id) => {
  try {
    const result = await db.query(`DELETE FROM dbos.Cities 
                                   WHERE ID_City = ${id}`);
    
    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

// Adresses
const registerAddressRepository = async (data) => {

  try {
    const result = await db.query("INSERT INTO dbos.Adresses(Street, District, Number_Street, CD_Postal, Complement, ID_City, ID_User) VALUES (?,?,?,?,?,?,?)", [data.Street, data.District, data.Number_Street, data.CD_Postal, data.Complement, data.ID_City, data.ID_User]);
    return [result[0]["affectedRows"], result[0]["insertId"]];
  } catch (error) {
    return error;
  }
}

const listAdressesRepository = async (id) => {
  try {
    let result = await db.query(`SELECT *
                                FROM dbos.Adresses
                                WHERE ID_User = ${id};`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const detailsAddressRepository = async (id) => {
  try {
    const result = await db.query(`SELECT *
                                   FROM dbos.Adresses
                                   WHERE ID_Address = ${id}`);
    return result[0][0];
  } catch (error) {
    return [error];
  }
}

const updateAddressRepository = async (id, data) => {
  try {
    const result = await db.query(`UPDATE dbos.Adresses
                                   SET Street        = ?
                                      ,District      = ?
                                      ,Number_Street = ?
                                      ,CD_Postal     = ?
                                      ,Complement    = ?
                                      ,ID_City       = ?
                                   WHERE ID_Address = ?;`, [data.Street, data.District, data.Number_Street, data.CD_Postal, data.Complement, data.ID_City, id]);

    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

const deleteAddressRepository = async (id) => {
  try {
    const result = await db.query(`DELETE FROM dbos.Adresses 
                                   WHERE ID_Address = ${id}`);
    
    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

module.exports= {
  listCountriesRepository,
  registerCountryRepository,
  updateCountryRepository,
  detailsCountryRepository,

  deleteCountryRepository,

  listStatesRepository,
  registerStateRepository,
  updateStateRepository,
  detailsStateRepository,
  deleteStateRepository,

  listCitiesRepository,
  registerCityRepository,
  updateCityRepository,
  detailsCityRepository,
  deleteCityRepository,

  listAdressesRepository,
  registerAddressRepository,
  updateAddressRepository,
  detailsAddressRepository,
  deleteAddressRepository,
}