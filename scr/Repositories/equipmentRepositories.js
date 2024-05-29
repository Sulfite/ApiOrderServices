const db = require("../db/dbMySql");

const registerRepository = async (data, idUser) => {
    try {
        let result = await db.query(
            `INSERT INTO dbos.Equipments(Name_Equipment
                                        ,NO_Frota
                                        ,Active_Equipment
                                        ,ID_Type_Equipment
                                        ,ID_Sector_Equipment
                                        ,ID_User
                                        ,DH_Inclusion
                                        ,DH_Change) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.nameEquipment,
                data.noFrota,
                data.activeEquipment,
                data.idTypeEquipment,
                data.idSectorEquipment,
                idUser,
                new Date(),
                null
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
            `UPDATE dbos.Equipments
               SET Name_Equipment      = ?
                  ,NO_Frota            = ?
                  ,Active_Equipment    = ?
                  ,ID_Type_Equipment   = ?
                  ,ID_Sector_Equipment = ?
                  ,DH_Change           = ?
             WHERE ID_Equipment = ?;`,
            [
                data.nameEquipment,     
                data.noFrota,           
                data.activeEquipment,   
                data.idTypeEquipment,  
                data.idSectorEquipment,
                new Date(),
                data.idEquipment,
            ]
        );
        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};


const registerTypeEquipamentRepository = async (data) => {
    try {
      
        let result = await db.query(
            `INSERT INTO dbos.Types_Equipments(Name_Type_Equipment) VALUES (?)`,
            [data.nameTypeEquipment]
        );
        result = result[0];
        return [result["affectedRows"], result["insertId"]];
    } catch (error) {
        return error;
    }
};

const editTypeEquipamentRepository = async (data) => {

    try {
        const result = await db.query(
            `UPDATE dbos.Types_Equipments
               SET Name_Type_Equipment = ?
             WHERE ID_Type_Equipment = ?;`,
            [
                data.nameTypeEquipment,
                data.idTypeEquipment,
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const listEquipmentsRepository = async (idUser) => {
    try {
        const result = await db.query(`SELECT ID_Equipment
                                             ,Name_Equipment     
                                             ,NO_Frota           
                                             ,Active_Equipment   
                                             ,Equipments.ID_Type_Equipment  
                                             ,Types_Equipments.Name_Type_Equipment
                                             ,Sectors.Name_Sector
                                        FROM dbos.Equipments
                                             INNER JOIN dbos.Types_Equipments
                                             ON Types_Equipments.ID_Type_Equipment = Equipments.ID_Type_Equipment
                                             INNER JOIN dbos.Sectors
                                             ON Sectors.ID_Sector = Equipments.ID_Sector_Equipment
                                        WHERE ID_User = ${idUser};`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const listTypeEquipmentsRepository = async () => {

    try {
        const result = await db.query(`SELECT ID_Type_Equipment  
                                             ,Name_Type_Equipment
                                        FROM dbos.Types_Equipments;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const listSectorsRepository = async () => {

    try {
        const result = await db.query(`SELECT *
                                        FROM dbos.Sectors;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const listaTiposServicosRepository = async () => {

    try {
        const result = await db.query(`SELECT ID_Type_Service
                                             ,Nome_Tipo_Servico
                                       FROM dbos.Types_Services;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const getEquipamentRepository = async (id) => {
    try {
        const result = await db.query(`SELECT ID_Equipment
                                             ,Name_Equipment     
                                             ,NO_Frota           
                                             ,Active_Equipment   
                                             ,ID_Type_Equipment  
                                             ,ID_Sector_Equipment
                                       FROM dbos.Equipments
                                       WHERE ID_Equipment = ${id};`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const getTypeEquipamentRepository = async (id) => {
    try {
        const result = await db.query(`SELECT ID_Type_Equipment  
                                             ,Name_Type_Equipment
                                       FROM dbos.Types_Equipments
                                       WHERE ID_Type_Equipment = ${id};`);
        return result[0];
    } catch (error) {
        return error;
    }
};


module.exports = {
    registerRepository,
    registerTypeEquipamentRepository,
    editRepository,
    editTypeEquipamentRepository,
    getEquipamentRepository,
    getTypeEquipamentRepository,
    listEquipmentsRepository,
    listTypeEquipmentsRepository,
    listaTiposServicosRepository,
    listSectorsRepository
};
