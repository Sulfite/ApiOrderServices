const { isNullOrEmpty } = require("../Ultils/Ultils");
const phoneRepositorie = require("../Repositories/phoneRepositories");

const listPhonesService = async (idUser) => {
  try {
    const db = await phoneRepositorie.listPhonesRepository(idUser);
  
    if(db.length === 0) {
      const exception = new Error('Not selected.');
      exception.code = 500;
      throw exception;
    }
    return db;

  } catch (error) {
    const message = {"code": error.code, "title": error.name, "message": error.message }
    return message;
  }
}

const registerPhoneService = async (data) => {
  // Usar funcao de anti injecton
  // Usar função de validacao de json
  
  const newPhone = {
    Number_Phone: data.numberPhone, 
    ID_City: data.idCity,
    ID_User: data.idUser
  };

  try {
    const db = await phoneRepositorie.registerPhoneRepository(newPhone);

    if(db.length === 0) {
      const exception = new Error('Not insert.');
      exception.code = 500;
      throw exception;
    }

    return db;
  } catch (error) {
    const message = {"code": error.code, "title": error.name, "message": error.message }
    return message;
  }
}

const updatePhoneSevice = async (id, data) => {
  // Fazer requisição para verificar se o usuario existe
  try {
    if (isNullOrEmpty(data)) {
      const exception = new Error('9003.Não foi encontrado usuário para ser alterados.');
      exception.code = 404;
      throw exception;
    }

    const { numberPhone,
            idCity } = data
    
    const updatePhone = { 
      Number_Phone: numberPhone, 
      ID_City: idCity
    };

    const db = await phoneRepositorie.updatePhoneRepository(id, updatePhone);
    if(db.length === 0) {
      const exception = new Error('Not updated.');
      exception.code = 500;
      throw exception;
    }
    return db;
  } catch (error) {
    const message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

const detailsPhoneService = async (id) => {

  try {
    const db = await phoneRepositorie.detailsPhoneRepository(id);
    if(db.length === 0) {
      const exception = new Error('Not delete');
      exception.code = 500;
      throw exception;
    }
    return db;
  } catch (error) {
    const message = {"code": error.code, "title": error.name, "message": error.message }
    return message;
  }
}

const deletePhoneService = async (id) => {
  try {
    const db = await phoneRepositorie.deletePhoneRepository(id);
    if(db.length === 0) {
      const exception = new Error('Not delete');
      exception.code = 500;
      throw exception;
    }
    return db;
  } catch (error) {
    const message = {"code": error.code, "title": error.name, "message": error.message }
    return message;
  }
}

module.exports = {
  listPhonesService,
  registerPhoneService,
  updatePhoneSevice,
  detailsPhoneService,
  deletePhoneService
}