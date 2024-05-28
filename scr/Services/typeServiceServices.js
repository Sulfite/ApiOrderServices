const {
    isNullOrEmpty,
    isNullObject,
    getInfoToken,
} = require("../Ultils/Ultils");
const typeServiceRepository = require("../Repositories/typeServiceRepositories");
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

        if (isNullObject(data)) {
            const exception = new Error("Sem dados a serem iseridos");
            exception.code = 404;
            throw exception;
        }

        if (isNullOrEmpty(data.nameTypeService)) {
            flag += 1;
            mensagem = "nameTypeService, ";
        }

        if (isNullOrEmpty(data.price)) {
            flag += 1;
            mensagem += "price, ";
        }

        if (flag > 0 && !isNullOrEmpty(mensagem)) {
            const exception = new Error(
                "Verificar esses parâmetros: " + mensagem
            );
            exception.code = 404;
            throw exception;
        }

        const newTypeService = {
            nameTypeService: data.nameTypeService,
            price: data.price,
        };

        const db = await typeServiceRepository.registerRepository(
            newTypeService
        );

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

const editSevice = async (token, data, idTypeService) => {
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

        const uptTypeService = {
            nameTypeService: data.nameTypeService,
            price: data.price,
            idTypeService: idTypeService,
        };

        const db = await typeServiceRepository.editRepository(uptTypeService);

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

const deleteUserService = async (data, token) => {
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

        const verify = await checkUserService(token);

        if (!verify) {
            const exception = new Error("Id não encontrado.");
            exception.code = 404;
            throw exception;
        }

        const db = await typeServiceRepository.deleteUserRepository(
            data.idUsuario
        );

        if (isNullOrEmpty(db)) {
            const exception = new Error("Não foi possível apagar.");
            exception.code = 500;
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

const getTypeServiceService = async (id, token) => {
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

        const db = await typeServiceRepository.getTypeServiceRepository(id);

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

const listTypeServiceService = async (token) => {
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

        const db = await typeServiceRepository.listTypeServiceRepository();

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

module.exports = {
    registerService,
    editSevice,
    deleteUserService,
    getTypeServiceService,
    listTypeServiceService,
};
