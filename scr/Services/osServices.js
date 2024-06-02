const { isNullOrEmpty, getInfoToken, getDays, formatDateDB, formatDateDB2 } = require("../Ultils/Ultils");

const osRepositorie = require("../Repositories/osRepositories");
const { checkUserService } = require("./userServices");
const { listTypeServiceService } = require("./typeServiceServices");

const registerService = async (data, token) => {
    try {
        const infoToken = getInfoToken(token);

        if (isNullOrEmpty(token) || infoToken.idTipoUsuario === 3) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 403;
            throw exception;
        }

        if (isNullOrEmpty(data)) {
            const exception = new Error("Sem dados a serem inseridos");
            exception.code = 404;
            throw exception;
        }

        if (data.dhAbertura === null) {
            const exception = new Error("Sem dados a serem inseridos");
            exception.code = 404;
            throw exception;
        }

        if (isNullOrEmpty(data.idUserEmploye)) {
            const exception = new Error("Sem dados a serem inseridos");
            exception.code = 404;
            throw exception;
        } else if (data.idUserEmploye === 0) {
            data.idUserEmploye = infoToken.idTipoUsuario;
        }

        let numberCondition = data.numberCondition;
        if (parseFloat(numberCondition) === NaN) {
            numberCondition = 0.0;
        }
        numberCondition = numberCondition.replace(",", ".");

        const newData = {
            dhOpening: data.dhOpening,
            dhClosed: data.dhClosed,
            detailing: data.detailing,
            observation: data.observation,
            solution: data.solution,
            numberCondition: numberCondition,
            idEquipment: data.idEquipment,
            idUserCustomer: data.idUserCustomer,
            idUserEmploye: data.idUserEmploye,
            idTypeService: data.idTypeService,
        };

        const db = await osRepositorie.registerRepository(
            newData,
            infoToken.idUsuario
        );

        if (db.error) {
            const exception = new Error(
                "Não foi possivel realizar o cadastro." + db.error
            );
            exception.code = 500;
            throw exception;
        }
        
        let idOs = db[0].insertId;
        let products = data.products;

        if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                const element = products[i];

                let newProd = {
                    idProduct: element.ID_Product,
                    idOs: idOs,
                    amount: element.Amount,
                    price: element.Price,
                };

                let dbProductAdd =
                    await osRepositorie.registerProductsOsRepository(newProd);

                if (dbProductAdd[0].affectedRows === 0) {
                    const exception = new Error(
                        "Não foi possivel realizar o cadastro dos produtos." +
                            db.message
                    );
                    exception.code = 500;
                    throw exception;
                }
            }
        }

        return { insert: true };
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const editSevice = async (token, data) => {
    // Fazer requisição para verificar se o usuario existe
    try {
        if (isNullOrEmpty(token)) {
            const exception = new Error("Usuário vazio ou não tem permissão.");
            exception.code = 403;
            throw exception;
        }

        const infoToken = getInfoToken(token);

        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 403;
            throw exception;
        }

        if (isNullOrEmpty(data)) {
            const exception = new Error("Dados inconsistente ou vazio.");
            exception.code = 404;
            throw exception;
        }

        let numberCondition = data.numberCondition;
        if (parseFloat(numberCondition) === NaN) {
            numberCondition = 0.0;
        }
        numberCondition = numberCondition.replace(",", ".");

        const uptOs = {
            dhOpening: data.dhOpening,
            dhClosed: data.dhClosed,
            detailing: data.detailing,
            observation: data.observation,
            solution: data.solution,
            numberCondition: numberCondition,
            idEquipment: data.idEquipment,
            idUserCustomer: data.idUserCustomer,
            idUserEmploye: data.idUserEmploye,
            idTypeService: data.idTypeService,
            idOs: data.idOs,
        };

        const db = await osRepositorie.editRepository(
            uptOs,
            infoToken.idUsuario
        );

        console.log(db);

        if (db.error) {
            const exception = new Error(
                "Não foi possivel realizar a edição."
            );
            exception.code = 500;
            throw exception;
        }

        return { update: true };
    } catch (error) {
        const message = { title: error.name, message: error.message, code: error.code };
        return message;
    }
};

const closeOsService = async (token, data) => {
    try {
        // Fazer requisição para verificar se o usuario existe
        if (isNullOrEmpty(token)) {
            const exception = new Error("Usuário vazio ou sem permissão.");
            exception.code = 401;
            throw exception;
        }

        const infoToken = getInfoToken(token);

        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) === false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        if (isNullOrEmpty(data)) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        const db = await osRepositorie.closeOsRepository(
            data,
            infoToken.idUsuario
        );

        if (db.error) {
            const exception = new Error("Não foi possivel finalizar a OS."+db.error);
            exception.code = 500;
            throw exception;
        }

        if (db.length == 0) {
            const exception = new Error("Não foi possivel realizar a edição.");
            exception.code = 500;
            throw exception;
        }

        return db;
    } catch (error) {
        const message = {
            title: error.name,
            message: error.message,
            code: error.code,
        };
        return message;
    }
};

const listOsService = async (data, token) => {
    let id = "";
    const { offset, limit, abertaFechada, dataInicial, dataFinal, idMecanico } =
        data;
    const infoToken = getInfoToken(token);

    try {
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        if (idMecanico === 0 && infoToken.idTipoUsuario === 2) {
            id = infoToken.idUsuario;
        } else {
            id = idMecanico;
        }

        if (typeof offset != "number") {
            const exception = new Error(
                "Verifique o parâmetro offset enviado."
            );
            exception.code = 422;
            throw exception;
        }

        if (isNullOrEmpty(limit) || typeof limit != "number") {
            const exception = new Error("Verifique o parâmetro limit enviado.");
            exception.code = 422;
            throw exception;
        }

        const db = await osRepositorie.listOsRepository(
            offset,
            limit,
            abertaFechada,
            dataInicial,
            dataFinal,
            id
        );

        if (db.error) {
            const exception = new Error("Ordens de Serviços não encontradas."+db.error);
            exception.code = 404;
            throw exception;
        }

        return db;
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const listEmployeOsService = async (data, token) => {
    let id = "";
    const { offset, limit, openClose, dataInit, dataClose, idEmploye } = data;
    const infoToken = getInfoToken(token);

    try {
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        if (idEmploye === 0 && (infoToken.idTipoUsuario !== 1)) {
            id = infoToken.idUsuario;
        } else {
            id = idEmploye;
        }

        if (typeof offset != "number") {
            const exception = new Error(
                "Verifique o parâmetro offset enviado."
            );
            exception.code = 422;
            throw exception;
        }

        if (isNullOrEmpty(limit) || typeof limit != "number") {
            const exception = new Error("Verifique o parâmetro limit enviado.");
            exception.code = 422;
            throw exception;
        }

        const db = await osRepositorie.listEmployeOsRepository(
            offset,
            limit,
            openClose,
            dataInit,
            dataClose,
            id
        );

        if (db.error) {
            const exception = new Error("Ordens de Serviços não encontradas."+db.error);
            exception.code = 404;
            throw exception;
        }

        return db;
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const osDetailsService = async (idOs, token) => {
    const infoToken = getInfoToken(token);
    try {
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        if (isNullOrEmpty(idOs)) {
            const exception = new Error("idOS vazio ou nulo.");
            exception.code = 401;
            throw exception;
        }

        const db = await osRepositorie.osDetailsRepository(idOs);
        const dbProducts = await osRepositorie.osDetailsProductsRepository(
            idOs
        );
        db.products = dbProducts;

        if (db.error) {
            const exception = new Error(
                "Não foi possivel localizar os detalhes da OS."+db.error
            );
            exception.code = 500;
            throw exception;
        }

        if (db.length === 0) {
            const exception = new Error("OS not found.");
            exception.code = 404;
            throw exception;
        }

        return db;
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const osMonthClosedService = async (token) => {
    try {
        const infoToken = getInfoToken(token);
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario !== 1
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        let year = new Date().getFullYear();
        let totalMonth = [];

        for (let i = 1; i < 13; i++) {
            let getDay = getDays(year, i);
            let dtFinal = year+'/'+i+'/'+getDay
            let dayInitial = (getDay - (getDay-1))
            let dtInitial = `${year}/${i}/${dayInitial}`

            const db =  await osRepositorie.osMonthClosedRepository(dtInitial, dtFinal);

            if (db.error) {
                const exception = new Error(
                    "Não foi possivel localizar os detalhes da OS."+db.error
                );
                exception.code = 500;
                throw exception;
            }
            totalMonth.push(db[0].Total);
        }

        if (totalMonth.length === 0) {
            const exception = new Error("Total OS not found.");
            exception.code = 404;
            throw exception;
        }

        return totalMonth;
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const osMonthTypesServicesService = async (token) => {
    try {
        const infoToken = getInfoToken(token);
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario !== 1
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1;

        let getDay = getDays(year, month);
        let dtFinal = year+'/'+month+'/'+getDay
        
        let dayInitial = (getDay - (getDay-1))
        let dtInitial = `${year}/${month}/${dayInitial}`
        
        let typeServices = await listTypeServiceService(token);

        typeServices = typeServices.map((e) => e.Name_Type_Service)

        const db =  await osRepositorie.osMonthTypeServiceRepository(dtInitial, dtFinal);

        let returnDb = {
            label: typeServices,
            data: db
        }

        if (db.error) {
            const exception = new Error(
                "Não foi possivel localizar os detalhes da OS."+db.error
            );
            exception.code = 500;
            throw exception;
        }
        
        return returnDb;
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};


module.exports = {
    registerService,
    editSevice,
    closeOsService,
    listOsService,
    osDetailsService,
    listEmployeOsService,
    osMonthClosedService,
    osMonthTypesServicesService
};
