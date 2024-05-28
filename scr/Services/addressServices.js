const { isNullOrEmpty } = require("../Ultils/Ultils");
const addressRepositorie = require("../Repositories/addressRepositories");

// Countries
const registerCountryService = async (data) => {

  // Usar funcao de anti injecton
  // Usar função de validacao de json
  
  const newCountry = { 
    Name_Country: data.nameCountry,
    Abbreviation: data.abbreviation,
    Prefix: data.prefix
  };

  try {
    const db = await addressRepositorie.registerCountryRepository(newCountry);

    if(db.length === 0) {
      const exception = new Error('Not insert.');
      exception.code = 500;
      throw exception;
    }

    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const listCountriesService = async () => {
  try {
    const db = await addressRepositorie.listCountriesRepository();
    
    if(db.length === 0) {
      const exception = new Error('Not found Countries.');
      exception.code = 404;
      throw exception;
    }
    return db;

  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const detailsCountryService = async (id) => {
  try {

    if (isNullOrEmpty(id)) {
      const exception = Error('Check the parameters sent.');;
      exception.code = 422;
      throw exception;
    }

    const db = await addressRepositorie.detailsCountryRepository(id);
    
    if(db.length === 0) {
      const exception = new Error(`Not found Country. ${id}`);
      exception.code = 404;
      throw exception;
    }
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const updateCountrySevice = async (id, data) => {

  try {

    if (isNullOrEmpty(data)) {
      const exception = new Error('9003.Não foi encontrado usuário para ser alterados.');
      exception.code = 404;
      throw exception;
    }

    let { nameCountry,
          abbreviation,
          prefix  } = data

    const newData = {
      Name_Country: nameCountry,
      Abbreviation: abbreviation,
      Prefix: prefix
    }

    const db = await addressRepositorie.updateCountryRepository(id, newData);

    if(isNullOrEmpty(db.length)) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }

    return db;
    
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

const deleteCountryService = async (id) => {

  try {
    const db = await addressRepositorie.deleteCountryRepository(id);

    if(db.length === 0) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }
    
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

// States
const registerStateService = async (data) => {

  // Usar funcao de anti injecton
  // Usar função de validacao de json
  
  const newState = { 
    Name_State: data.nameState,
    Abbreviation: data.abbreviation,
    ID_Country: data.idCountry
  };

  try {
    const db = await addressRepositorie.registerStateRepository(newState);

    if(db.length === 0) {
      const exception = new Error('Not insert.');
      exception.code = 500;
      throw exception;
    }

    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const listStatesService = async () => {
  try {
    const db = await addressRepositorie.listStatesRepository();
    
    if(db.length === 0) {
      const exception = new Error('Not found States.');
      exception.code = 404;
      throw exception;
    }
    return db;

  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const detailsStateService = async (id) => {
  try {

    if (isNullOrEmpty(id)) {
      const exception = Error('Check the parameters sent.');;
      exception.code = 422;
      throw exception;
    }

    const db = await addressRepositorie.detailsStateRepository(id);
    
    if(db.length === 0) {
      const exception = new Error(`Not found State. ${id}`);
      exception.code = 404;
      throw exception;
    }
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const updateStateSevice = async (id, data) => {

  try {

    if (isNullOrEmpty(data)) {
      const exception = new Error('9003.Não foi encontrado usuário para ser alterados.');
      exception.code = 404;
      throw exception;
    }

    const { nameState,
            abbreviation,
            idCountry  } = data

    const updateState = {
      Name_State: nameState,
      Abbreviation: abbreviation,
      ID_Country: idCountry
    }

    const db = await addressRepositorie.updateStateRepository(id, updateState);

    if(isNullOrEmpty(db.length)) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }

    return db;
    
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

const deleteStateService = async (id) => {

  try {
    const db = await addressRepositorie.deleteStateRepository(id);

    if(db.length === 0) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }
    
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

// Cities
const registerCityService = async (data) => {

  // Usar funcao de anti injecton
  // Usar função de validacao de json
  
  const newCity = { 
    Name_City: data.nameCity,
    DDD: data.ddd,
    ID_State: data.idState
  };

  try {
    const db = await addressRepositorie.registerCityRepository(newCity);

    if(db.length === 0) {
      const exception = new Error('Not insert.');
      exception.code = 500;
      throw exception;
    }

    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const listCitiesService = async () => {
  try {
    const db = await addressRepositorie.listCitiesRepository();
    
    if(db.length === 0) {
      const exception = new Error('Not found Cities.');
      exception.code = 404;
      throw exception;
    }
    return db;

  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const detailsCityService = async (id) => {
  try {

    if (isNullOrEmpty(id)) {
      const exception = Error('Check the parameters sent.');;
      exception.code = 422;
      throw exception;
    }

    const db = await addressRepositorie.detailsCityRepository(id);
    
    if(db.length === 0) {
      const exception = new Error(`Not found City. ${id}`);
      exception.code = 404;
      throw exception;
    }
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const updateCitySevice = async (id, data) => {

  try {

    if (isNullOrEmpty(data)) {
      const exception = new Error('9003.Não foi encontrado usuário para ser alterados.');
      exception.code = 404;
      throw exception;
    }

    const { nameCity,
            ddd,
            idState  } = data

    const updateCity = {
      Name_City: nameCity,
      DDD: ddd,
      ID_State: idState
    }

    const db = await addressRepositorie.updateCityRepository(id, updateCity);

    if(isNullOrEmpty(db.length)) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }

    return db;
    
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

const deleteCityService = async (id) => {

  try {
    const db = await addressRepositorie.deleteCityRepository(id);

    if(db.length === 0) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }
    
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

// Adresses
const registerAddressService = async (data) => {

  // Usar funcao de anti injecton
  // Usar função de validacao de json
  
  const newAddress = { 
    Street: data.street,
    District: data.district,
    Number_Street: data.numberStreet,
    CD_Postal: data.cdPostal,
    Complement: data.complement,
    ID_City: data.idCity,
    ID_User: data.idUser,
  };

  try {
    const db = await addressRepositorie.registerAddressRepository(newAddress);

    if(db.length === 0) {
      const exception = new Error('Not insert.');
      exception.code = 500;
      throw exception;
    }

    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const listAdressesService = async (id) => {
  try {
    const db = await addressRepositorie.listAdressesRepository(id);
    
    if(db.length === 0) {
      const exception = new Error('Not found Adresses.');
      exception.code = 404;
      throw exception;
    }
    return db;

  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const detailsAddressService = async (id) => {
  try {

    if (isNullOrEmpty(id)) {
      const exception = Error('Check the parameters sent.');;
      exception.code = 422;
      throw exception;
    }

    const db = await addressRepositorie.detailsAddressRepository(id);
    
    if(db.length === 0) {
      const exception = new Error(`Not found Address. ${id}`);
      exception.code = 404;
      throw exception;
    }
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message, "code": error.code }
    return message;
  }
}

const updateAddressSevice = async (id, data) => {

  try {

    if (isNullOrEmpty(data)) {
      const exception = new Error('9003.Não foi encontrado usuário para ser alterados.');
      exception.code = 404;
      throw exception;
    }

    const { street,
            district,
            numberStreet,
            cdPostal,
            complement,
            idCity,
            idUser,  } = data

    const updateAddress = { 
      Street: street,
      District: district,
      Number_Street: numberStreet,
      CD_Postal: cdPostal,
      Complement: complement,
      ID_City: idCity,
      ID_User: idUser,
    };

    const db = await addressRepositorie.updateAddressRepository(id, updateAddress);

    if(isNullOrEmpty(db.length)) {
      const exception = new Error('Not updated');
      exception.code = 500;
      throw exception;
    }

    return db;
    
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

const deleteAddressService = async (id) => {

  try {
    const db = await addressRepositorie.deleteAddressRepository(id);

    if(db.length === 0) {
      const exception = new Error('Not delete.');
      exception.code = 500;
      throw exception;
    }
    
    return db;
  } catch (error) {
    let message = {"title": error.name, "Message:": error.message }
    return message;
  }
}

module.exports = {
  listCountriesService,
  registerCountryService,
  updateCountrySevice,
  detailsCountryService,
  deleteCountryService,

  listStatesService,
  registerStateService,
  updateStateSevice,
  detailsStateService,
  deleteStateService,

  listCitiesService,
  registerCityService,
  updateCitySevice,
  detailsCityService,
  deleteCityService,

  listAdressesService,
  registerAddressService,
  updateAddressSevice,
  detailsAddressService,
  deleteAddressService,
}