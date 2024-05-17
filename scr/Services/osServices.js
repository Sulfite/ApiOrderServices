const { isNullOrEmpty, getInfoToken } = require("../Ultils/Ultils");

const osRepositorie = require("../Repositories/osRepositories");
const { checkUserService } = require("./userServices");

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

        let horimetro = data.horimetro;
        if (parseFloat(horimetro) === NaN) {
            horimetro = 0.0;    
        }
        horimetro = horimetro.replace(',', '.');
        
        const newData = {
            dhAbertura: data.dhAbertura
           ,dhFechamento: data.dhFechamento
           ,descricao: data.descricao
           ,pecasUsadas: data.pecasUsadas
           ,observacao: data.observacao
           ,solucao: data.solucao
           ,horimetro: horimetro
           ,idEquipamento: data.idEquipamento
           ,idUsuarioOperador: data.idUsuarioOperador
           ,idTipoServico: data.idTipoServico
        }

        const db = await osRepositorie.registerRepository(
            newData,
            infoToken.idUsuario
        );

        if (!isNullOrEmpty(db.message)) {
            const exception = new Error(
                "Não foi possivel realizar o cadastro." + db.message
            );
            exception.code = 500;
            throw exception;
        }

        return { insert: true };
    } catch (error) {
        console.log(error);
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
    if (isNullOrEmpty(token)) {
        const exception = new Error("Usuário vazio ou não tem permissão.");
        exception.code = 401;
        throw exception;
    }

    const infoToken = getInfoToken(token);

    if (isNullOrEmpty(infoToken.idUsuario) || infoToken.idTipoUsuario === 3) {
        const exception = new Error("Usuário vazio ou não tem permissão");
        exception.code = 401;
        throw exception;
    }

    try {
        if (isNullOrEmpty(data)) {
            const exception = new Error("Dados inconsistente ou vazio.");
            exception.code = 404;
            throw exception;
        }

        let horimetro = data.horimetro;
        if (parseFloat(horimetro) === NaN) {
            horimetro = 0.0;    
        }
        horimetro = horimetro.replace(',', '.');
        
        const newData = {
            dhFechamento: data.dhFechamento
           ,descricao: data.descricao
           ,pecasUsadas: data.pecasUsadas
           ,observacao: data.observacao
           ,solucao: data.solucao
           ,horimetro: horimetro
           ,idEquipamento: data.idEquipamento
           ,idUsuarioOperador: data.idUsuarioOperador
           ,idTipoServico: data.idTipoServico
           ,idOs: data.idOs
        }

        const db = await osRepositorie.editRepository(
            newData,
            infoToken.idUsuario
        );

        if (!isNullOrEmpty(db.message)) {
            const exception = new Error(
                "Não foi possivel realizar a edição." + db.message
            );
            exception.code = 500;
            throw exception;
        }

        return { update: true };
    } catch (error) {
        const message = { title: error.name, "Message:": error.message };
        return message;
    }
};

const closeOsService = async (token, data) => {
    // Fazer requisição para verificar se o usuario existe
    if (isNullOrEmpty(token)) {
        const exception = new Error("Usuário vazio ou sem permissão.");
        exception.code = 401;
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

    try {
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

const listOsService = async (data, token) => {
    let id = "";
    const { offset, limit, abertaFechada, dataInicial, dataFinal, idMecanico } =
        data;
    const infoToken = getInfoToken(token);

    console.log(dataInicial, dataFinal);

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
        const db = await osRepositorie.listOsRepository(
            offset,
            limit,
            abertaFechada,
            dataInicial,
            dataFinal,
            id
        );

        if (db.length === 0) {
            const exception = new Error("Ordens de Serviços não encontradas.");
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

    try {
        const db = await osRepositorie.osDetailsRepository(idOs);

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

module.exports = {
    registerService,
    editSevice,
    closeOsService,
    listOsService,
    osDetailsService,
};
