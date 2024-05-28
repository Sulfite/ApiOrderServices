const db = require('../db/dbMySql');

const listPhonesRepository = async (idUser) => {
  try {
    let result = await db.query(`SELECT Phones.*, Cities.DDD
                                FROM dbOs.Phones
                                     INNER JOIN dbOs.Cities
                                     ON Cities.ID_City = Phones.ID_City
                                WHERE ID_User = ${idUser};`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const registerPhoneRepository = async (data) => {
  try {
    const result = await db.query("INSERT INTO dbOs.Phones(Number_Phone, ID_City, ID_User) VALUES (?,?,?)", [data.Number_Phone, data.ID_City, data.ID_User]);
    return [result[0]["affectedRows"], result[0]["insertId"]];
  } catch (error) {
    return error;
  }
}

const updatePhoneRepository = async (id, data) => {
  try {
    const result = await db.query(`UPDATE dbOs.Phones 
                                   SET Number_Phone = ?
                                      ,ID_City      = ?
                                   WHERE ID_Phone = ?;`, [data.Number_Phone, data.ID_City, id]);

    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

const detailsPhoneRepository = async (id) => {
  try {
    const result = await db.query(`SELECT Phones.*, Cities.DDD, Countries.Prefix
                                   FROM dbOs.Phones
                                        INNER JOIN dbOs.Cities
                                        ON Cities.ID_City = Phones.ID_City
                                        INNER JOIN dbOs.States
                                        ON States.ID_State = Cities.ID_State
                                        INNER JOIN dbOs.Countries
                                        ON Countries.ID_Country = States.ID_Country
                                   WHERE ID_Phone = ${id}`);
    return result[0];
  } catch (error) {
    return error;
  }
}

const deletePhoneRepository = async (id) => {
  try {
    const result = await db.query(`DELETE FROM dbOs.Phones
                                   WHERE ID_Phone = ${id}`);
    return [result[0]["affectedRows"]];
  } catch (error) {
    return error;
  }
}

module.exports= {
  listPhonesRepository,
  registerPhoneRepository,
  updatePhoneRepository,
  detailsPhoneRepository,
  deletePhoneRepository
}