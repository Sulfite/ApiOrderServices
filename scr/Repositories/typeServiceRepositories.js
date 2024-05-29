const { isNullOrEmpty } = require("../Ultils/Ultils");
const db = require("../db/dbMySql");

const registerRepository = async (data) => {
    try {
      
        let result = await db.query(

            `INSERT INTO dbos.Types_Services(Name_Type_Service
                                            ,Price) VALUES (?, ?)`,
            [
                data.nameTypeService,
                data.price
            ]
        );
        result = result[0];
        return [result["affectedRows"], result["insertId"]];
    } catch (error) {
        return error;
    }
};

const editRepository = async (data) => {

    try {
        const result = await db.query(
            `UPDATE dbos.Types_Services
               SET Name_Type_Service = ?
                  ,Price             = ?
             WHERE ID_Type_Service = ?;`,
            [
                data.nameTypeService,
                data.price,
                data.idTypeService
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const deleteUserRepository = async (id) => {
    try {
        const result = await db.query(`DELETE FROM dbos.Types_Services
                                       WHERE ID_User = ${id}`);
        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const getTypeServiceRepository = async (id) => {
    try {
        const result = await db.query(`SELECT ID_Type_Service
                                             ,Name_Type_Service
                                             ,Price
                                       FROM dbos.Types_Services
                                       WHERE ID_Type_Service = ${id};`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const listTypeServiceRepository = async () => {
    try {
        const result = await db.query(`SELECT ID_Type_Service
                                             ,Name_Type_Service
                                             ,Price
                                       FROM dbos.Types_Services
                                       ORDER BY ID_Type_Service`);
        return result[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    registerRepository,
    editRepository,
    deleteUserRepository,
    getTypeServiceRepository,
    listTypeServiceRepository,
};
