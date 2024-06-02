const { isNullOrEmpty } = require("../Ultils/Ultils");
const db = require("../db/dbMySql");

const registerRepository = async (data) => {
    try {
        let result = await db.query(
            `INSERT INTO dbos.Services_Orders(DH_Opening
                                             ,DH_Closed
                                             ,Detailing
                                             ,Observation
                                             ,Solution
                                             ,Number_Condition
                                             ,ID_Equipment
                                             ,ID_User_Customer
                                             ,ID_User_Employe
                                             ,ID_Type_Service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.dhOpening,
                data.dhClosed,
                data.detailing,
                data.observation,
                data.solution,
                data.numberCondition,
                data.idEquipment,
                data.idUserCustomer,
                data.idUserEmploye,
                data.idTypeService
            ]
        );
        result = result[0];
        return [{affectedRows: result["affectedRows"], insertId: result["insertId"]}];
    } catch (error) {
        return {error : error};
    }
};

const registerProductsOsRepository = async (data) => {
    try {
        console.log(data);
        let result = await db.query(
            `INSERT INTO dbos.Products_OS(ID_Product
                                         ,ID_OS
                                         ,Amount
                                         ,Price) VALUES (?, ?, ?, ?)`,
            [
                data.idProduct,
                data.idOs,
                data.amount,
                data.price
            ]
        );
        result = result[0];
        return [{affectedRows: result["affectedRows"], insertId: result["insertId"]}];
    } catch (error) {
        return {error : error};
    }
};

const editRepository = async (data, id) => {
    try {
        const result = await db.query(
            `UPDATE Services_Orders 
               SET DH_Opening       = ?
                  ,DH_Closed        = ?
                  ,Detailing        = ?
                  ,Observation      = ?
                  ,Solution         = ?
                  ,Number_Condition = ?
                  ,ID_Equipment     = ?
                  ,ID_User_Customer = ?
                  ,ID_User_Employe  = ?
                  ,ID_Type_Service  = ?
             WHERE Services_Orders.ID_OS = ?`,
            [
                data.dhOpening,
                data.dhClosed,
                data.detailing,
                data.observation,
                data.solution,
                data.numberCondition,
                data.idEquipment,
                data.idUserCustomer,
                data.idUserEmploye,
                data.idTypeService,
                data.idOs
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        console.log(error);
        return {error: error};
    }
};


const closeOsRepository = async (data, id) => {
    try {
        const result = await db.query(
            `UPDATE Services_Orders 
               SET DH_Closed = ?
             WHERE ID_OS = ?
               AND ID_User_Employe = ?;`,
            [
                data.dhClosed
                ,data.idOs
                ,id
            ]
        );
        
        return [result[0]["affectedRows"]];
    } catch (error) {
        return {error: error};
    }
};

const listOsRepository = async (offset, limit, abertaFechada, dataIni, dataFim, id = '') => {
    try {
        let where = '';
        let isAbertaFechado, dataBetween, idMecanico = '';

        let limitOffset = `LIMIT ${offset}, ${limit};`
        
        if (!isNullOrEmpty(dataIni) && !isNullOrEmpty(dataFim)) {
            dataBetween = `DATE(OS.DH_Abertura) BETWEEN '${dataIni}' AND '${dataFim}'`
        }

        if (!isNullOrEmpty(id)) {
            idMecanico = `OS.ID_User_Employe = ${id}`;
        }

        if (!isNullOrEmpty(abertaFechada) && abertaFechada === "A") {
            isAbertaFechado = `OS.DH_Fechado IS NULL`;
        } else if (!isNullOrEmpty(abertaFechada) && abertaFechada === "F") {
            isAbertaFechado = `OS.DH_Fechado IS NOT NULL`
        }
        
        if (!isNullOrEmpty(isAbertaFechado) || !isNullOrEmpty(idMecanico) || !isNullOrEmpty(dataBetween)) {
            where = `WHERE ${(isNullOrEmpty(isAbertaFechado)) ? '' : isAbertaFechado} 
                           ${(isNullOrEmpty(dataBetween)) ? '' : (!isNullOrEmpty(isAbertaFechado)) ? `AND ${dataBetween}` : `${dataBetween}`} 
                           ${(isNullOrEmpty(idMecanico)) ? '' : (!isNullOrEmpty(isAbertaFechado) || !isNullOrEmpty(dataBetween)) ? `AND ${idMecanico}` : `${idMecanico}`}
        `}

        const result = await db.query(`SELECT OS.ID_OS 
                                             ,OS.DH_Abertura 
                                             ,OS.DH_Fechado 
                                             ,OS.Detailing 
                                             ,OS.Peca_Usadas, OS.Observation 
                                             ,OS.Solution 
                                             ,OS.Number_Condition 
                                             ,Usuario_Mecanico.Name_User AS 'Mecanico' 
                                             ,Usuario_Operador.Name_User AS 'Operador' 
                                             ,Equipments.Nome_Equipamento 
                                             ,Equipments.NO_Frota 
                                             ,Types_Services.Nome_Tipo_Servico 
                                             ,Types_Equipments.Nome_Tipo_Equipamento
                                             ,Sectors.Nome_Setor
                                       FROM Services_Orders as OS 
                                            INNER JOIN Users as Usuario_Mecanico 
                                            ON Usuario_Mecanico.ID_User = OS.ID_User_Employe 
                                            INNER JOIN Users as Usuario_Operador 
                                            ON Usuario_Operador.ID_User = OS.ID_User_Customer 
                                            INNER JOIN Equipments
                                            ON Equipments.ID_Equipment = OS.ID_Equipment
                                            INNER JOIN Sectors
                                            ON Sectors.ID_Setor = Equipments.ID_Setor_Equipamento
                                            INNER JOIN Types_Equipments 
                                            ON Types_Equipments.ID_Tipo_Equipamento = Equipments.ID_Tipo_Equipamento
                                            INNER JOIN Types_Services 
                                            ON Types_Services.ID_Type_Service = OS.ID_Type_Service
                                       ${where} ${limitOffset}`);
        return result[0];
    } catch (error) {
        return {error : error};
    }
};


const listEmployeOsRepository = async (offset, limit, abertaFechada, dataIni, dataFim, id = '') => {
    try {
        let where = '';
        let isAbertaFechado, dataBetween, idEmploye = 2;

        let limitOffset = `LIMIT ${offset}, ${limit};`
        
        if (!isNullOrEmpty(dataIni) && !isNullOrEmpty(dataFim)) {
            dataBetween = `DATE(OS.DH_Opening) BETWEEN '${dataIni}' AND '${dataFim}'`
        }

        if (!isNullOrEmpty(id)) {
            idEmploye = `OS.ID_User_Employe = ${id}`;
        }

        if (!isNullOrEmpty(abertaFechada) && abertaFechada === "A") {
            isAbertaFechado = `OS.DH_Closed IS NULL`;
        } else if (!isNullOrEmpty(abertaFechada) && abertaFechada === "F") {
            isAbertaFechado = `OS.DH_Closed IS NOT NULL`
        }
        
        if (!isNullOrEmpty(isAbertaFechado) || !isNullOrEmpty(idEmploye) || !isNullOrEmpty(dataBetween)) {
            where = `WHERE ${(isNullOrEmpty(isAbertaFechado)) ? '' : isAbertaFechado} 
                           ${(isNullOrEmpty(dataBetween)) ? '' : (!isNullOrEmpty(isAbertaFechado)) ? `AND ${dataBetween}` : `${dataBetween}`} 
                           ${(isNullOrEmpty(idEmploye)) ? '' : (!isNullOrEmpty(isAbertaFechado) || !isNullOrEmpty(dataBetween)) ? `AND ${idEmploye}` : `${idEmploye}`}
        `}

        const result = await db.query(`SELECT OS.ID_OS
                                             ,DATE(OS.DH_Opening) AS DH_Opening
                                             ,OS.DH_Closed
                                             ,OS.Detailing
                                             ,OS.Observation
                                             ,OS.Solution
                                             ,OS.Number_Condition
                                             ,OS.ID_Equipment
                                             ,OS.ID_User_Customer
                                             ,OS.ID_User_Employe
                                             ,OS.ID_Type_Service
                                             ,Equipments.Name_Equipment
                                             ,Types_Services.Name_Type_Service
                                             ,Types_Services.Price
                                             ,(SELECT SUM(Amount * Price) 
                                               FROM Products_OS 
                                               WHERE Products_OS.ID_OS = OS.ID_OS) AS valueProductTotal
                                       FROM Services_Orders as OS
                                            INNER JOIN Equipments
                                            ON Equipments.ID_Equipment = OS.ID_Equipment
                                            INNER JOIN Types_Services 
                                            ON Types_Services.ID_Type_Service = OS.ID_Type_Service
                                       ${where} ${limitOffset}`);
        return result[0];
    } catch (error) {
        return {error : error};
    }
};

const osDetailsRepository = async (idOs) => {
    try {
        const result = await db.query(`SELECT OS.ID_OS 
                                             ,OS.DH_Opening 
                                             ,OS.DH_Closed 
                                             ,OS.Detailing 
                                             ,OS.Observation 
                                             ,OS.Solution 
                                             ,OS.Number_Condition 
                                             ,OS.ID_User_Employe 
                                             ,OS.ID_User_Customer 
                                             ,OS.ID_Equipment 
                                             ,OS.ID_Type_Service
                                       FROM Services_Orders as OS
                                       WHERE OS.ID_OS = ${idOs}`);
        return result[0][0];
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const osDetailsProductsRepository = async (idOs) => {
    try {
        const result = await db.query(`SELECT Products_OS.ID_Product_OS
                                             ,Products_OS.ID_Product 
                                             ,Products.Name_Product
                                             ,Products_OS.Amount
                                             ,Products_OS.Price
                                      FROM Products_OS
                                           INNER JOIN Products
                                           ON Products.ID_Product = Products_OS.ID_Product
                                       WHERE Products_OS.ID_OS = ${idOs}`);
        return result[0];
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const osMonthClosedRepository = async (InitialDate, FinalDate) => {
    try {
        const result = await db.query(`SELECT COUNT(1) as Total
                                       FROM Services_Orders as OS
                                       WHERE DATE(OS.DH_Closed) BETWEEN '${InitialDate}' AND '${FinalDate}'`);
        return result[0];
    } catch (error) {
        console.log(error);
        return {error};
    }
}

const osMonthTypeServiceRepository = async (InitialDate, FinalDate) => {
    try {
        const result = await db.query(`SELECT TP.Name_Type_Service, count(OS.ID_Type_Service) as Total
                                       FROM Services_Orders as OS
                                            INNER JOIN Types_Services as TP
                                            ON TP.ID_Type_Service = OS.ID_Type_Service
                                       WHERE DATE(OS.DH_Closed) BETWEEN '${InitialDate}' AND '${FinalDate}'
                                       GROUP BY OS.ID_Type_Service
                                       ORDER BY OS.ID_Type_Service`);
        return result[0];
    } catch (error) {
        console.log(error);
        return {error};
    }
}


module.exports = {
    registerRepository,
    registerProductsOsRepository,
    editRepository,
    closeOsRepository,
    listOsRepository,
    osDetailsRepository,
    osDetailsProductsRepository,
    listEmployeOsRepository,
    osMonthClosedRepository,
    osMonthTypeServiceRepository
};
