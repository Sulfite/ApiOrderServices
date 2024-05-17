const { isNullOrEmpty } = require("../Ultils/Ultils");
const db = require("../db/dbMySql");

const registerRepository = async (data, id) => {
    try {
        let result = await db.query(
            "INSERT INTO dbOs..Services_Orders(DH_Abertura, DH_Fechado, Detailing, Peca_Usadas, Observation, Solution, Number_Condition, ID_Equipment, ID_User_Customer, ID_User_Employe, ID_Type_Service) VALUES (?,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)",
            [
               data.dhAbertura
              ,data.dhFechamento
              ,data.Detailing
              ,data.pecasUsadas
              ,data.Observation
              ,data.Solution
              ,data.Number_Condition
              ,data.idEquipamento
              ,data.idUsuarioOperador
              ,id
              ,data.idTipoServico
            ]
        );
        result = result[0];
        return [result["affectedRows"], result["insertId"]];
    } catch (error) {
        console.log(error);
        return error;
    }
};

const editRepository = async (data, id) => {
    try {
        const result = await db.query(
            `UPDATE Services_Orders 
               SET DH_Fechado          = ?
                  ,Detailing           = ?
                  ,Peca_Usadas         = ?
                  ,Observation          = ?
                  ,Solution             = ?
                  ,Number_Condition           = ?
                  ,ID_Equipment      = ?
                  ,ID_User_Customer = ?
                  ,ID_Type_Service     = ?
             WHERE ID_OS = ?
               AND ID_User_Employe = ?;`,
            [
               data.dhFechamento
              ,data.Detailing
              ,data.pecasUsadas
              ,data.Observation
              ,data.Solution
              ,data.Number_Condition
              ,data.idEquipamento
              ,data.idUsuarioOperador
              ,data.idTipoServico
              ,data.idOs
              ,id
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};


const closeOsRepository = async (data, id) => {
    try {
        const result = await db.query(
            `UPDATE Services_Orders 
               SET DH_Fechado = ?
             WHERE ID_OS = ?
               AND ID_User_Employe = ?;`,
            [
               data.dhFechamento
              ,data.idOs
              ,id
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
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
        return error;
    }
};

const osDetailsRepository = async (idOs) => {
    try {
        const result = await db.query(`SELECT OS.ID_OS 
                                             ,OS.DH_Opening 
                                             ,OS.DH_Closed 
                                             ,OS.Detailing 
                                             ,OS.Peca_Usadas, 
                                             OS.Observation 
                                             ,OS.Solution 
                                             ,OS.Number_Condition 
                                             ,OS.ID_User_Employe 
                                             ,OS.ID_User_Customer 
                                             ,OS.ID_Equipment 
                                             ,OS.ID_Type_Service 
                                       FROM Services_Orders as OS
                                       WHERE ID_OS = ${idOs}`);
        return result[0][0];
    } catch (error) {
        return error;
    }
}

module.exports = {
    registerRepository,
    editRepository,
    closeOsRepository,
    listOsRepository,
    osDetailsRepository
};
