const productServices = require('../Services/productServices');
const { isNullOrEmpty } = require('../Ultils/Ultils');

const registerController = async (req, res, next) => {
 // colocar verificacoes iniciais 
 const data = req.body;
 const _id = req.headers['x-access-token'];

  try {
    const response = await productServices.registerService(data, _id);

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
  const token = req.headers['x-access-token'];
  const idProduct = req.params.id;

  try {
    if (isNullOrEmpty(token)) {
      const exception = new Error('Check the parameters sent.');
      exception.code = 422;
      throw exception;
    }
    const response = await productServices.editSevice(token, data, idProduct);

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

const deleteUserController = async (req, res, next) => {
  const _id = req.body;
  const token = req.headers['x-access-token'];

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error('Verificar os parâmetros enviados.');
      exception.code = 422
      throw exception;
    }

    const response = await productServices.deleteUserService(_id, token);
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

const listProductPaginationController = async (req, res, next) => {
  let data = req.body;
  const token = req.headers['x-access-token'];

  try {
    const response = await productServices.listProductPaginationService(data, token);
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

const getProductController = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const idProduct = req.params.id;
  try {

    const response = await productServices.getProductService(idProduct, token);
    if (response.code > 0) {
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
  deleteUserController,
  listProductPaginationController,
  getProductController,
};