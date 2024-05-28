const equipamentServices = require("../Services/equipamentServices");
const { isNullOrEmpty } = require("../Ultils/Ultils");

const registerController = async (req, res, next) => {
    // colocar verificacoes iniciais
    const data = req.body;
    const _id = req.headers["x-access-token"];

    try {
        const response = await equipamentServices.registerService(data, _id);

        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }

        res.status(201).send(`${JSON.stringify(response)}`);
    } catch (e) {
        let message = { title: e.name, "Message:": e.message };
        return res.status(500).send(`${JSON.stringify(message)}`);
    }
};

const editController = async (req, res, next) => {
    const data = req.body;
    const token = req.headers["x-access-token"];
    const idEquipment = req.params.id;

    try {
        if (isNullOrEmpty(token)) {
            const exception = new Error("Check the parameters sent.");
            exception.code = 422;
            throw exception;
        }
        const response = await equipamentServices.editSevice(
            token,
            data,
            idEquipment
        );

        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }

        res.status(200).send(response);
    } catch (e) {
        let message = { title: e.name, "Message:": e.message };
        return res.status(e.code).send(`${JSON.stringify(message)}`);
    }
};

const registerTypeEquipamentController = async (req, res, next) => {
    // colocar verificacoes iniciais
    const data = req.body;
    const _id = req.headers["x-access-token"];

    try {
        const response = await equipamentServices.registerTypeEquipamentService(data, _id);

        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }

        res.status(201).send(`${JSON.stringify(response)}`);
    } catch (e) {
        let message = { title: e.name, "Message:": e.message };
        return res.status(500).send(`${JSON.stringify(message)}`);
    }
};

const editTypeEquipamentController = async (req, res, next) => {
    const data = req.body;
    const token = req.headers["x-access-token"];
    const idTypeEquipment = req.params.id;

    try {
        if (isNullOrEmpty(token)) {
            const exception = new Error("Check the parameters sent.");
            exception.code = 422;
            throw exception;
        }
        const response = await equipamentServices.editTypeEquipamentSevice(
            token,
            data,
            idTypeEquipment
        );

        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }

        res.status(200).send(response);
    } catch (e) {
        let message = { title: e.name, "Message:": e.message };
        return res.status(e.code).send(`${JSON.stringify(message)}`);
    }
};

const listEquipamentsController = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const idUser = req.params.id;
    try {
        const response = await equipamentServices.listEquipamentsServices(
            token, idUser
        );
        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};

const listTypeEquipamentsController = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        const response = await equipamentServices.listTypesEquipamentsServices(
            token
        );
        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};

const listaSectorsController = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        const response = await equipamentServices.listSectorsServices(
            token
        );
        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};

const listaTiposServicossController = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        const response = await equipamentServices.listaTiposServicosServices(
            token
        );
        if (response.code > 0 && response.title === "Error") {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};

const getEquipamentController = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const idEquipment = req.params.id;
    try {
        const response = await equipamentServices.getEquipamentService(
            idEquipment,
            token
        );
        if (response.code > 0) {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};

const getTypeEquipamentController = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const idTypeEquipment = req.params.id;
    try {
        const response = await equipamentServices.getTypeEquipamentService(
            idTypeEquipment,
            token
        );
        if (response.code > 0) {
            const exception = new Error(response.message);
            exception.code = response.code;
            throw exception;
        }
        res.status(200).send(response);
    } catch (e) {
        const message = { title: e.name, Message: e.message };
        return res.status(e.code).send(JSON.stringify(message));
    }
};
module.exports = {
    listEquipamentsController,
    listTypeEquipamentsController,
    registerController,
    registerTypeEquipamentController,
    editController,
    editTypeEquipamentController,
    getEquipamentController,
    getTypeEquipamentController,
    listaSectorsController
};
