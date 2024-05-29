const { isNullOrEmpty } = require("../Ultils/Ultils");
const db = require("../db/dbMySql");

const registerRepository = async (data) => {
    try {
      
        let result = await db.query(
            `INSERT INTO dbos.Products(Name_Product
                                      ,Amount
                                      ,Priece       
                                      ,DH_Inclusion 
                                      ,DH_Change) VALUES (?, ? ,? , ?, ?)`,
            [
                data.nameProduct,
                data.amount,
                data.price,
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
            `UPDATE dbos.Products
               SET Name_Product = ?
                  ,Amount       = ?
                  ,Priece       = ?
                  ,DH_Change    = ?
             WHERE ID_Product = ?;`,
            [
                data.nameProduct,
                data.amount,
                data.price,
                new Date(),
                data.idProduct,
            ]
        );

        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const deleteUserRepository = async (id) => {
    try {
        const result = await db.query(`DELETE FROM dbos..Users
                                       WHERE ID_User = ${id}`);
        return [result[0]["affectedRows"]];
    } catch (error) {
        return error;
    }
};

const getProductRepository = async (id) => {
    try {
        const result = await db.query(`SELECT ID_Product
                                             ,Name_Product
                                             ,Amount
                                             ,Priece
                                       FROM dbos.Products
                                       WHERE ID_Product = ${id};`);
        return result[0];
    } catch (error) {
        return error;
    }
};

const listProductPaginationRepository = async (name, offset, limit) => {

    let where = '';

    try {
        if (!isNullOrEmpty(name)) {
            where = `WHERE Name_Product LIKE '%${name}%'`;
        }

        const result = await db.query(`SELECT ID_Product
                                             ,Name_Product
                                             ,Amount
                                             ,Priece
                                       FROM dbos.Products
                                       ${where}
                                       LIMIT ${offset}, ${limit};`);                                       
        return result[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    registerRepository,
    editRepository,
    deleteUserRepository,
    getProductRepository,
    listProductPaginationRepository,
};
