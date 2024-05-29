const {
    isNullOrEmpty,
    isNullObject,
    getInfoToken,
} = require("../Ultils/Ultils");
const productRepository = require("../Repositories/productRepositories");
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

        if (isNullOrEmpty(data.nameProduct)) {
            flag += 1;
            mensagem = "nameProduct, ";
        }

        if (isNullOrEmpty(data.amount)) {
            flag += 1;
            mensagem += "amount, ";
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

        const newProduct = {
            nameProduct: data.nameProduct,
            amount: data.amount,
            price: data.price,
        };

        const db = await productRepository.registerRepository(newProduct);

        if (db.error) {
            const exception = new Error(
                "Não foi possivel realizar o cadastro." + db.error
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

const editSevice = async (token, data, idProduct) => {
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

        const uptProduct = {
            nameProduct: data.nameProduct,
            amount: data.amount,
            price: data.price,
            idProduct: idProduct,
        };

        const db = await productRepository.editRepository(uptProduct);

        if (db.error) {
            const exception = new Error("Não foi possivel realizar a edição."+db.error);
            exception.code = 500;
            throw exception;
        }

        return { update: db[0] > 0 };
    } catch (error) {
        const message = { title: error.name, message: error.message, code: error.code };
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

        const db = await productRepository.deleteUserRepository(data.idUsuario);

        if (db.error) {
            const exception = new Error("Não foi possível apagar.")+db.error;
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

const getProductService = async (id, token) => {
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

        const db = await productRepository.getProductRepository(id);

        if (db.error) {
            const exception = new Error("Product not found."+db.error);
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

const listProductPaginationService = async (data, token) => {
    const { name, offset, limit } = data;

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

    if (isNullOrEmpty(offset) || typeof offset != "number") {
        const exception = new Error("Verifique o parâmetro offset enviado.");
        exception.code = 422;
        throw exception;
    }

    if (isNullOrEmpty(limit) || typeof limit != "number") {
        const exception = new Error("Verifique o parâmetro limit enviado.");
        exception.code = 422;
        throw exception;
    }

    try {
        const db = await productRepository.listProductPaginationRepository(
            name,
            offset,
            limit
        );

        if (db.error) {
            const exception = new Error("Produscts not found."+db.error);
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
    getProductService,
    listProductPaginationService,
};
