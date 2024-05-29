const {
    hash,
    isNullOrEmpty,
    isNullObject,
    signToken,
    getInfoToken,
} = require("../Ultils/Ultils");
const usuarioRepositorie = require("../Repositories/userRepositories");

const loginService = async (username, password) => {
    try {
        const passwordCrypto = hash(password);
        const db = await usuarioRepositorie.loginRepository(username);

        if (isNullOrEmpty(db)) {
            const exception = new Error("Usuário ou senha Inválidos");
            exception.code = 401;
            throw exception;
        }

        if (db.Ativo === 1) {
            const exception = new Error("Usuário sem autorização.");
            exception.code = 401;
            throw exception;
        }

        if (db.PasswordUser === passwordCrypto) {
            let data = {
                idUsuario: db.ID_User,
                idTipoUsuario: db.ID_Type_Access,
            };

            let token = signToken(data);

            let callback = {
                authorized: true,
                name: db.Name_User,
                idTypeAccess: db.ID_Type_Access,
                token: token,
            };
            return callback;
        } else {
            const exception = new Error("Usuário ou senha Inválidos");
            exception.code = 401;
            throw exception;
        }
    } catch (error) {
        const message = {
            code: error.code,
            title: error.name,
            message: error.message,
        };
        return message;
    }
};

const registerService = async (data, token) => {
    try {
        let flag = 0;
        let mensagem = "";

        if (!isNullOrEmpty(token)) {
            const infoToken = getInfoToken(token);
            if (
                isNullOrEmpty(infoToken.idUsuario) ||
                checkUserService(token) === false
            ) {
                const exception = new Error(
                    "Usuário vazio ou não tem permissão"
                );
                exception.code = 403;
                throw exception;
            }
        }

        if (isNullObject(data)) {
            const exception = new Error("Sem dados a serem iseridos");
            exception.code = 404;
            throw exception;
        }

        if (isNullOrEmpty(data.nameUser)) {
            flag += 1;
            mensagem = "nameUser, ";
        }

        if (isNullOrEmpty(data.username)) {
            flag += 1;
            mensagem += "username, ";
        }

        if (isNullOrEmpty(data.passwordUser)) {
            flag += 1;
            mensagem += "passwordUser, ";
        }

        if (isNullOrEmpty(data.dtBirth)) {
            flag += 1;
            mensagem += "dtBirth, ";
        }

        if (isNullOrEmpty(data.nationalIdentifier)) {
            flag += 1;
            mensagem += "nationalIdentifier, ";
        }

        if (isNullOrEmpty(data.typePerson)) {
            flag += 1;
            mensagem += "typePerson, ";
        }

        if (isNullOrEmpty(data.idTypeAccess)) {
            flag += 1;
            mensagem += "idTypeAccess, ";
        }

        if (flag > 0 && !isNullOrEmpty(mensagem)) {
            const exception = new Error(
                "Verificar esses parâmetros: " + mensagem
            );
            exception.code = 404;
            throw exception;
        }

        const senhaCrypto = hash(data.passwordUser);
        const newUser = {
            nameUser: data.nameUser,
            username: data.username,
            passwordUser: senhaCrypto,
            dtBirth: data.dtBirth,
            nationalIdentifier: data.nationalIdentifier,
            typePerson: data.typePerson,
            idTypeAccess: data.idTypeAccess,
        };

        const db = await usuarioRepositorie.registerRepository(newUser);

        if (db.error) {
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

const editSevice = async (token, data, idUsuario) => {
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
            infoToken.idTipoUsuario !== 1
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

        const senhaCrypto = hash(data.passwordUser);
        const uptUser = {
            nameUser: data.nameUser,
            username: data.username,
            passwordUser: senhaCrypto,
            dtBirth: data.dtBirth,
            nationalIdentifier: data.nationalIdentifier,
            typePerson: data.typePerson,
            idTypeAccess: data.idTypeAccess,
            idUsuario: idUsuario,
        };

        const db = await usuarioRepositorie.editRepository(uptUser);

        if (isNullOrEmpty(db[0])) {
            const exception = new Error("Não foi possivel realizar a edição.");
            exception.code = 500;
            throw exception;
        }

        return { update: db[0] > 0 };
    } catch (error) {
        const message = {
            title: error.name,
            "Message:": error.message,
            code: error.code,
        };
        return message;
    }
};

const editActiveSevice = async (token, data) => {
    // Fazer requisição para verificar se o usuario existe
    if (isNullOrEmpty(token)) {
        const exception = new Error("Usuário vazio ou sem permissão.");
        exception.code = 401;
        throw exception;
    }

    const infoToken = getInfoToken(token);

    if (isNullOrEmpty(infoToken.idUsuario) || infoToken.idTipoUsuario === 2) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        // if (exists === false) {
        //     const exception = new Error(
        //         "Não foi encontrado usuário para ser alterados."
        //     );
        //     exception.code = 404;
        //     throw exception;
        // }

        if (isNullOrEmpty(data)) {
            const exception = new Error(
                "Não foi encontrado usuário para ser alterados."
            );
            exception.code = 404;
            throw exception;
        }

        const db = await usuarioRepositorie.editActiveRepository(data);

        if (isNullOrEmpty(db)) {
            const exception = new Error("Não foi possivel realizar a edição.");
            exception.code = 500;
            throw exception;
        }

        return db;
    } catch (error) {
        const message = { title: error.name, "Message:": error.message };
        return message;
    }
};

const checkUserService = async (token) => {
    if (isNullOrEmpty(token)) {
        const exception = new Error("Usuário vazio ou sem permissão.");
        exception.code = 401;
        throw exception;
    }

    const infoToken = getInfoToken(token);

    const db = await usuarioRepositorie.checkUserRepository(
        infoToken.idUsuario
    );

    if (db.length > 0) return true;
    else return false;
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

        const db = await usuarioRepositorie.deleteUserRepository(
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

const getUserService = async (id, token) => {
    if (isNullOrEmpty(token)) {
        const exception = new Error("Check the sent token parameter.");
        exception.code = 422;
        throw exception;
    }

    const infoToken = getInfoToken(token);

    if (
        isNullOrEmpty(infoToken.idUsuario) ||
        checkUserService(token) == false
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        const db = await usuarioRepositorie.getUserRepository(id);

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

const listUserPaginationService = async (data, token) => {
    const { offset, limit, active, typeAccess } = data;
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
        const db = await usuarioRepositorie.listUserPaginationRepository(
            offset,
            limit,
            active,
            typeAccess
        );

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

const listCustomersServices = async (token) => {
    let infoToken = getInfoToken(token);

    if (
        isNullOrEmpty(infoToken.idUsuario) || // checkUserService(token) == false ||
        infoToken.idTipoUsuario === 3
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        let db;
        // if (Number(site) === 1) {
        //     db = await usuarioRepositorie.listCustomersSiteRepository();
        // } else {
        // }
        db = await usuarioRepositorie.listCustomersRepository();

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

const listEmployeesServices = async (token) => {
    let infoToken = getInfoToken(token);

    try {
        if (
            isNullOrEmpty(infoToken.idUsuario) || checkUserService(token) === false ||
            infoToken.idTipoUsuario !== 1
        ) {
            const exception = new Error("Usuário vazio ou não tem permissão");
            exception.code = 401;
            throw exception;
        }

        const db = await usuarioRepositorie.listEmployeesRepository();

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

const typeAccessUserServices = async (token) => {
    let infoToken = getInfoToken(token);

    if (
        isNullOrEmpty(infoToken.idUsuario) || // checkUserService(token) == false ||
        infoToken.idTipoUsuario !== 1
    ) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        const db = await usuarioRepositorie.typeAccessUserRepository();

        if (db.length === 0) {
            const exception = new Error("Type Access not found.");
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

// const conexaoServices = async (token) => {
//     let infoToken = getInfoToken(token);

//     if (isNullOrEmpty(infoToken.idUsuario) || infoToken.idTipoUsuario === 3) {
//         const exception = new Error("Usuário vazio ou não tem permissão");
//         exception.code = 401;
//         throw exception;
//     }

//     try {
//         return true;
//     } catch (error) {
//         const message = {
//             code: error.code,
//             title: error.name,
//             message: error.message,
//         };
//         return message;
//     }
// };

module.exports = {
    loginService,
    registerService,
    editSevice,
    checkUserService,
    deleteUserService,
    editActiveSevice,
    getUserService,
    listUserPaginationService,
    listCustomersServices,
    // conexaoServices,
    listEmployeesServices,
    typeAccessUserServices,
};
