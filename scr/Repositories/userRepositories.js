const { isNullOrEmpty } = require("../Ultils/Ultils");
const db = require("../db/dbMySql");

const loginRepository = async (user) => {
    try {
        let result = await db.query(`SELECT ID_User
                                           ,PasswordUser
                                           ,ID_Type_Access
                                           ,Active_User
                                           ,Name_User
                                           ,Username
                                 FROM dbOs.Users 
                                 WHERE Username = '${user}';`);
        return result[0][0];
    } catch (error) {
        return error;
    }
};

const registerRepository = async (data) => {
    try {
        let result = await db.query(
            `INSERT INTO dbOs.Users(Name_User
                                    ,Username
                                    ,PasswordUser
                                    ,DT_Birth
                                    ,National_Identifier
                                    ,Type_Person
                                    ,ID_Type_Access
                                    ,Active_User
                                    ,DH_Inclusion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.nameUser,
                data.username,
                data.passwordUser,
                data.dtBirth,
                data.nationalIdentifier,
                data.typePerson,
                data.idTypeAccess,
                true,
                new Date(),
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
            `UPDATE Users 
               SET Name_User           = ?
                  ,Username            = ?
                  ,PasswordUser        = ?
                  ,DT_Birth            = ?
                  ,National_Identifier = ?
                  ,Type_Person         = ?
                  ,ID_Type_Access      = ?
                  ,Active_User         = ? 
                  ,DH_Change           = ?
             WHERE ID_User = ?;`,
            [
                data.nameUser,
                data.username,
                data.passwordUser,
                data.dtBirth,
                data.nationalIdentifier,
                data.typePerson,
                data.idTypeAccess,
                true,
                new Date(),
                data.idUsuario,
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const editActiveRepository = async (data) => {
    try {
        const result = await db.query(
            `UPDATE Users 
             SET Active_User           = ?
                ,DH_Change       = ?
             WHERE ID_User = ?;`,
            [data.Active_UserUsuario, new Date(), data.idUsuario]
        );
        return [result[0]["affectedRows"]];
    } catch (error) {
        console.log(error);
        return error;
    }
};

const checkUserRepository = async (id) => {
    try {
        const result = await db.query(`SELECT ID_Type_Access
                                       FROM dbOs.Users
                                       WHERE ID_User = ${id}
                                         AND Active_User = 1`);
        return result[0];
    } catch (error) {
        return [];
    }
};

const deleteUserRepository = async (id) => {
    try {
        const result = await db.query(`DELETE FROM dbOs..Users
                                       WHERE ID_User = ${id}`);
        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const getUserRepository = async (id) => {
    try {
        const result = await db.query(`SELECT Name_User
                                             ,Username
                                             ,DT_Birth
                                             ,National_Identifier
                                             ,Type_Person
                                             ,ID_Type_Access
                                             ,Active_User
                                       FROM dbOs.Users
                                       WHERE ID_User = ${id};`);

        return result[0];
    } catch (error) {
        return error;
    }
};

const listUserPaginationRepository = async (offset, limit, active, typeAccess ) => {
    
    let where = "";
    let useActive = "";
    let useTypeAccess = "";

    if (!isNullOrEmpty(active)) {
        useActive = `Active_User = ${active}`;
    }

    if (!isNullOrEmpty(typeAccess)) {
        useTypeAccess = `Users.ID_Type_Access = ${typeAccess}`;
    }

    where = `${isNullOrEmpty(active) ? "" : useActive} 
    ${
        isNullOrEmpty(active)
            ? isNullOrEmpty(typeAccess)
                ? ""
                : useTypeAccess
            : isNullOrEmpty(typeAccess)
            ? ""
            : ` AND ${useTypeAccess}`
    }`;

    try {
        const result = await db.query(`SELECT ID_User        
                                             ,Name_User
                                             ,DT_Birth
                                             ,National_Identifier
                                             ,Type_Person
                                             ,Types_Access.Name_Type_Access
                                             ,Active_User
                                       FROM dbOs.Users
                                            INNER JOIN Types_Access
                                            ON Types_Access.ID_Type_Access = Users.ID_Type_Access
                                       ${isNullOrEmpty(where.trim()) ? '' : `WHERE ${where}`}
                                       LIMIT ${offset}, ${limit};`);

        return result[0];
    } catch (error) {
        return error;
    }
};

const listCustomersRepository = async () => {
    try {
        const result = await db.query(`SELECT ID_User
                                             ,Name_User
                                       FROM dbOs..Users
                                       WHERE ID_Type_Access = 3
                                         AND Active_User = 1;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

// const listaOperadoresSiteRepository = async () => {
//     try {
//         const result = await db.query(`SELECT ID_User
//                                              ,Name_User
//                                              ,Active_User
//                                        FROM dbOs..Users
//                                        WHERE ID_Type_Access = 3;`);
//         return result[0];
//     } catch (error) {
//         return error;
//     }
// };

const listEmployeesRepository = async () => {
    try {
        const result = await db.query(`SELECT ID_User
                                             ,Name_User
                                             ,Active_User
                                       FROM dbOs..Users
                                       WHERE ID_Type_Access = 2;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const typeAccessUserRepository = async () => {
    try {
        const result = await db.query(`SELECT ID_Type_Access
                                             ,Name_Type_Access
                                       FROM dbOs.Types_Access;`);
        return result[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    loginRepository,
    registerRepository,
    editRepository,
    editActiveRepository,
    checkUserRepository,
    deleteUserRepository,
    getUserRepository,
    listUserPaginationRepository,
    listCustomersRepository,
    listEmployeesRepository,
    // listaOperadoresSiteRepository,
    typeAccessUserRepository,
};
