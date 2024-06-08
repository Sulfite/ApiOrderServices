// const userServices = require('../Services/userServices');

const userServices = require('../Services/userServices');
const { isNullOrEmpty } = require('../Ultils/Ultils');



const testeController = async (req, res, next) => {
  res.status(200).send(JSON.stringify({"teste" : "sucesso"}));
}

const loginController = async (req, res, next) => {
  const data = req.body;

  try {
    if (isNullOrEmpty(data.username) || isNullOrEmpty(data.password)) {
      const exception = new Error('Verifique os dados enviados estão preenchidos corretamente.');
      exception.code = 404;
      throw exception;
    }

    const response = await userServices.loginService(data.username, data.password);
    if (response.code > 0 && response.title === 'Error') {  
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(JSON.stringify(response));
  }
  catch(e) {
    let message = {"title": e.name, message: e.message, code: e.code }
    return res.status(e.code).send(JSON.stringify(message));
  }
}

const registerController = async (req, res, next) => {
 // colocar verificacoes iniciais 
 const data = req.body;
 const _id = req.headers['x-access-token'];

  try {
    const response = await userServices.registerService(data, _id);

    if (response.code > 0 && response.title === 'Error') {  
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }

    res.status(201).send(`${JSON.stringify(response)}`);
  }
  catch(e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(500).send(`${JSON.stringify(message)}`);
  }
}

const editController = async (req, res, next) => {
  const data = req.body;
  const _id = req.headers['x-access-token'];
  const idUsuario = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error('Check the parameters sent.');
      exception.code = 422;
      throw exception;
    }
    const response = await userServices.editSevice(_id, data, idUsuario);

    if (response.code > 0 && response.title === 'Error') {  
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }

    res.status(200).send(JSON.stringify(response));
  } catch (e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const editActiveController = async (req, res, next) => {
  const data = req.body;
  const _id = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error('Check the parameters sent.');
      exception.code = 422;
      throw exception;
    }

    const response = await userServices.editActiveSevice(_id, data);

    res.status(200).send(response);

  } catch (e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const checkUserController = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(token)) {
      const exception = new Error('Check the parameters sent.');
      exception.code = 422;
      throw exception;
    }

    const response = await userServices.checkUserService(token);
    res.status(200).send(response);
  } catch (e) {
    const message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const deleteUserController = async (req, res, next) => {
  const _id = req.body;
  const token = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error('Verificar os parâmetros enviados.');
      exception.code = 422
      throw exception;
    }

    const response = await userServices.deleteUserService(_id, token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }

    if (response[0] === 1)
      res.status(200).send(true);
    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}

const  listUserPaginationController = async (req, res, next) => {
  let data = req.body;
  const token = req.headers['x-access-token'];

  try {
    const response = await userServices.listUserPaginationService(data, token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(response);    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}

const listCustomersServicesController = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    const response = await userServices.listCustomersServices(token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(response);    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}
const listEmployeesController = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  try {
    const response = await userServices.listEmployeesServices(token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(response);    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}

// const conexaoController = async (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   try {
//     const response = await userServices.conexaoServices(token);
//     if (response.code > 0 && response.title === 'Error') {
//       const exception = new Error(response.message);
//       exception.code = response.code;
//       throw exception;
//     }
//     res.status(200).send(response);    
//   } catch (e) {
//     const message = {"title": e.name, "Message": e.message };
//     return res.status(e.code).send(JSON.stringify(message));
//   }
// }

const getUserController = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const idUsuario = req.params.id;
  try {

    const response = await userServices.getUserService(idUsuario, token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(response);    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}

const typeAccessUserController = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  try {
    const response = await userServices.typeAccessUserServices(token);
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(200).send(response);    
  } catch (e) {
    const message = {"title": e.name, "Message": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
}

module.exports = { 
  loginController,
  registerController,
  editController,
  checkUserController,
  deleteUserController,
  editActiveController,
  listUserPaginationController,
  listCustomersServicesController,
  // conexaoController,
  listEmployeesController,
  getUserController,
  typeAccessUserController,
  testeController
};