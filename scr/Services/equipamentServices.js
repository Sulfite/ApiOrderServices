const { isNullOrEmpty, getInfoToken } = require("../Ultils/Ultils");

const equipamentRepositories = require("../Repositories/equipamentoRepositories");
const { checkUserService } = require("./userServices");

const registerService = async (data, token) => {
    try {
        let flag = 0;
        let mensagem = "";

        const infoToken = getInfoToken(token);
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            infoToken.idUsuario === 3 ||
            checkUserService(token) === false
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 403;
            throw exception;
        }

        // if (isNullObject(data)) {
        //     const exception = new Error("Sem dados a serem iseridos");
        //     exception.code = 404;
        //     throw exception;
        // }

        // if (isNullOrEmpty(data.nameProduct)) {
        //     flag += 1;
        //     mensagem = "nameProduct, ";
        // }

        // if (isNullOrEmpty(data.amount)) {
        //     flag += 1;
        //     mensagem += "amount, ";
        // }

        // if (isNullOrEmpty(data.price)) {
        //     flag += 1;
        //     mensagem += "price, ";
        // }

        // if (flag > 0 && !isNullOrEmpty(mensagem)) {
        //     const exception = new Error(
        //         "Verificar esses parâmetros: " + mensagem
        //     );
        //     exception.code = 404;
        //     throw exception;
        // }

        const newEquipment = {
            nameEquipment: data.nameEquipment,
            noFrota: data.noFrota,
            activeEquipment: data.activeEquipment,
            idTypeEquipment: data.idTypeEquipment,
            idSectorEquipment: data.idSectorEquipment
        };

        const db = await equipamentRepositories.registerRepository(newEquipment);

        if (isNullOrEmpty(db)) {
            const exception = new Error(
                "Não foi possivel realizar o cadastro." + db.message
            );
            exception.code = 500;
            throw exception;
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

const editSevice = async (token, data, idEquipment) => {
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

        let exists = await checkUserService(token);

        if (exists === false) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        if (isNullOrEmpty(data)) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        const uptEquipment = {
            nameEquipment: data.nameEquipment,
            noFrota: data.noFrota,
            activeEquipment: data.activeEquipment,
            idTypeEquipment: data.idTypeEquipment,
            idSectorEquipment: data.idSectorEquipment,
            idEquipment: idEquipment
        };

        const db = await equipamentRepositories.editRepository(uptEquipment);

        if (isNullOrEmpty(db[0])) {
            const exception = new Error("Não foi possivel realizar a edição.");
            exception.code = 500;
            throw exception;
        }

        return { update: db[0] > 0 };
    } catch (error) {
        const message = {
            title: error.name,
            message: error.message,
            code: error.code,
        };
        return message;
    }
};

const registerTypeEquipamentService = async (data, token) => {
    try {
        let flag = 0;
        let mensagem = "";

        const infoToken = getInfoToken(token);
        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            infoToken.idUsuario === 3 ||
            checkUserService(token) === false
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 403;
            throw exception;
        }

        // if (isNullObject(data)) {
        //     const exception = new Error("Sem dados a serem iseridos");
        //     exception.code = 404;
        //     throw exception;
        // }

        if (isNullOrEmpty(data.nameTypeEquipment)) {
            flag += 1;
            mensagem = "nameTypeEquipment, ";
        }

        if (flag > 0 && !isNullOrEmpty(mensagem)) {
            const exception = new Error(
                "Verificar esses parâmetros: " + mensagem
            );
            exception.code = 404;
            throw exception;
        }

        const newTypeEquipment = {
            nameTypeEquipment: data.nameTypeEquipment,
        };

        const db = await equipamentRepositories.registerTypeEquipamentRepository(newTypeEquipment);
        console.log(db);
        if (db.length === 0) {
            const exception = new Error(
                "Não foi possivel realizar o cadastro." + db.message
            );
            exception.code = 500;
            throw exception;
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

const editTypeEquipamentSevice = async (token, data, idTypeEquipment) => {
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

        let exists = await checkUserService(token);

        if (exists === false) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        if (isNullOrEmpty(data)) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        const uptTypeEquipment = {
            nameTypeEquipment: data.nameTypeEquipment,
            idTypeEquipment: idTypeEquipment,
        };

        const db = await equipamentRepositories.editTypeEquipamentRepository(uptTypeEquipment);

        if (isNullOrEmpty(db[0])) {
            const exception = new Error("Não foi possivel realizar a edição.");
            exception.code = 500;
            throw exception;
        }

        return { update: db[0] > 0 };
    } catch (error) {
        const message = {
            title: error.name,
            message: error.message,
            code: error.code,
        };
        return message;
    }
};

const listEquipamentsServices = async (token) => {
    try {
        let infoToken = getInfoToken(token);

        if (
            isNullOrEmpty(infoToken.idUsuario) || // verificiacaoUserservice(token) == false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        const db = await equipamentRepositories.listEquipmentsRepository();

        console.log(db);

        if (db.length === 0) {
            const exception = new Error("Users not found.");
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

const listTypesEquipamentsServices = async (token) => {
    let infoToken = getInfoToken(token);

    try {
    if (
        isNullOrEmpty(infoToken.idUsuario) || // verificiacaoUserservice(token) == false ||
        infoToken.idTipoUsuario === 3
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

        const db = await equipamentRepositories.listTypeEquipmentsRepository();

        if (db.length === 0) {
            const exception = new Error("Users not found.");
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

const listSectorsServices = async (token) => {
    let infoToken = getInfoToken(token);

    if (
        isNullOrEmpty(infoToken.idUsuario) || // verificiacaoUserservice(token) == false ||
        infoToken.idTipoUsuario === 3
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        const db = await equipamentRepositories.listSectorsRepository();

        if (db.length === 0) {
            const exception = new Error("Users not found.");
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

const listaTiposServicosServices = async (token) => {
    let infoToken = getInfoToken(token);

    if (
        isNullOrEmpty(infoToken.idUsuario) || // verificiacaoUserservice(token) == false ||
        infoToken.idTipoUsuario === 3
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        const db = await equipamentRepositories.listaTiposServicosRepository();

        if (db.length === 0) {
            const exception = new Error("Users not found.");
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

const getEquipamentService = async (id, token) => {
    try {
        if (isNullOrEmpty(token)) {
            const exception = new Error("Check the sent token parameter.");
            exception.code = 422;
            throw exception;
        }

        const infoToken = getInfoToken(token);

        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        const db = await equipamentRepositories.getEquipamentRepository(id);

        if (db.length === 0) {
            const exception = new Error("User not found.");
            exception.code = 404;
            throw exception;
        }

        return db[0];
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const getTypeEquipamentService = async (id, token) => {
    try {
        if (isNullOrEmpty(token)) {
            const exception = new Error("Check the sent token parameter.");
            exception.code = 422;
            throw exception;
        }

        const infoToken = getInfoToken(token);

        if (
            isNullOrEmpty(infoToken.idUsuario) ||
            checkUserService(token) == false ||
            infoToken.idTipoUsuario === 3
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        const db = await equipamentRepositories.getTypeEquipamentRepository(id);

        if (db.length === 0) {
            const exception = new Error("Type equipment not found.");
            exception.code = 404;
            throw exception;
        }

        return db[0];
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
    listEquipamentsServices,
    listTypesEquipamentsServices,
    registerService,
    registerTypeEquipamentService,
    editSevice,
    editTypeEquipamentSevice,
    getEquipamentService,
    getTypeEquipamentService,
    listSectorsServices,
};
