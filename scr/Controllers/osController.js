const osServices = require('../Services/osServices');
const { isNullOrEmpty } = require('../Ultils/Ultils');

const registerController = async (req, res, next) => {
  const data = req.body;
  const token = req.headers['x-access-token'];

  try {
    const response = await osServices.registerService(data, token);

    if ((response.code > 0 || response.code == undefined) && response.title === 'Error') {  
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    res.status(201).send(`${JSON.stringify(response)}`);
  }
  catch(e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const editController = async (req, res, next) => {
  const data = req.body;
  const token = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(token)) {
      const exception = new Error('Não autorizado.');
      exception.code = 401;
      throw exception;
    }

    const response = await osServices.editSevice(token, data);
    if ((response.code > 0 || response.code == undefined) && response.title === 'Error') {  
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }
    
    res.status(200).send(response);
  } catch (e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const closeOSController = async (req, res, next) => {
  const data = req.body;
  const _id = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error('Não autorizado.');
      exception.code = 401;
      throw exception;
    }

    const response = await osServices.closeOsService(_id, data);
    
    if (response.code > 0 && response.title === 'Error') {
      const exception = new Error(response.message);
      exception.code = response.code;
      throw exception;
    }

    res.status(200).send(response);

  } catch (e) {
    let message = {"title": e.name, "Message:": e.message }
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
}

const listOsController = async (req, res, next) => {
  let data = req.body;
  const token = req.headers['x-access-token'];

  try {
    const response = await osServices.listOsService(data, token);
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

const listEmployeOsController = async (req, res, next) => {
  let data = req.body;
  const token = req.headers['x-access-token'];

  try {
    const response = await osServices.listEmployeOsService(data, token);
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

const osDetailsController = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const idOs = req.params.id;

  try {
    const response = await osServices.osDetailsService(idOs, token);
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

const osMonthClosedController = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    const response = await osServices.osMonthClosedService(token);
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

const osMonthTypesServicesController = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    const response = await osServices.osMonthTypesServicesService(token);
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
  registerController,
  editController,
  closeOSController,
  listOsController,
  osDetailsController,
  osMonthClosedController,
  listEmployeOsController,
  osMonthTypesServicesController
};