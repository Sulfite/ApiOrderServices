const addressServices = require("../Services/addressServices");
const { isNullOrEmpty } = require("../Ultils/Ultils");

// Countries
const registerCountryController = async (req, res, next) => {
  // colocar verificacoes iniciais
  const data = req.body;

  try {
    const response = await addressServices.registerCountryService(data);

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(201).send(`${JSON.stringify(response)}`);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(500).send(`${JSON.stringify(message)}`);
  }
};

const listCountriesController = async (req, res, next) => {
  try {
    const response = await addressServices.listCountriesService();

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const datailsCountryController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.detailsCountryService(_id);

    if (response.length === 0) {
      const exception = new Error("Error.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const updateCountryController = async (req, res, next) => {
  const data = req.body;
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.updateCountrySevice(_id, data);

    if (response.length === 0) {
      const exception = new Error(`Error when Updated a record. ${_id}`);
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const deleteCountryController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.deleteCountryService(_id);
    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

// States
const registerStateController = async (req, res, next) => {
  // colocar verificacoes iniciais
  const data = req.body;

  try {
    const response = await addressServices.registerStateService(data);

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(201).send(JSON.stringify(response));
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(500).send(`${JSON.stringify(message)}`);
  }
};

const listStatesController = async (req, res, next) => {
  try {
    const response = await addressServices.listStatesService();

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
};

const datailsStateController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.detailsStateService(_id);

    if (response.length === 0) {
      const exception = new Error("Error.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const updateStateController = async (req, res, next) => {
  const data = req.body;
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.updateStateSevice(_id, data);

    if (response.length === 0) {
      const exception = new Error(`Error when Updated a record. ${_id}`);
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const deleteStateController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.deleteStateService(_id);
    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

// Cities
const registerCityController = async (req, res, next) => {
  // colocar verificacoes iniciais
  const data = req.body;

  try {
    const response = await addressServices.registerCityService(data);

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(201).send(JSON.stringify(response));
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(500).send(`${JSON.stringify(message)}`);
  }
};

const listCitiesController = async (req, res, next) => {
  try {
    const response = await addressServices.listCitiesService();

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
};

const datailsCityController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.detailsCityService(_id);

    if (response.length === 0) {
      const exception = new Error("Error.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const updateCityController = async (req, res, next) => {
  const data = req.body;
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.updateCitySevice(_id, data);

    if (response.length === 0) {
      const exception = new Error(`Error when Updated a record. ${_id}`);
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const deleteCityController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.deleteCityService(_id);
    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

// Cities
const registerAddressController = async (req, res, next) => {
  // colocar verificacoes iniciais
  const data = req.body;

  try {
    const response = await addressServices.registerAddressService(data);

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(201).send(JSON.stringify(response));
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(500).send(`${JSON.stringify(message)}`);
  }
};

const listAdressesController = async (req, res, next) => {
  const _idUser = req.params.id;

  try {
    if (isNullOrEmpty(_idUser)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.listAdressesService(_idUser);

    if (response.length === 0) {
      const exception = new Error("Error when inserting a new record.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(JSON.stringify(message));
  }
};

const datailsAddressController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.detailsAddressService(_id);

    if (response.length === 0) {
      const exception = new Error("Error.");
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const updateAddressController = async (req, res, next) => {
  const data = req.body;
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.updateAddressSevice(_id, data);

    if (response.length === 0) {
      const exception = new Error(`Error when Updated a record. ${_id}`);
      exception.code = 500;
      throw exception;
    }

    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

const deleteAddressController = async (req, res, next) => {
  const _id = req.params.id;

  try {
    if (isNullOrEmpty(_id)) {
      const exception = new Error("Check the parameters sent.");
      exception.code = 422;
      throw exception;
    }

    const response = await addressServices.deleteAddressService(_id);
    res.status(200).send(response);
  } catch (e) {
    let message = { title: e.name, "Message:": e.message };
    return res.status(e.code).send(`${JSON.stringify(message)}`);
  }
};

module.exports = {
  listCountriesController,
  registerCountryController,
  updateCountryController,
  datailsCountryController,
  deleteCountryController,

  listStatesController,
  registerStateController,
  updateStateController,
  datailsStateController,
  deleteStateController,

  listCitiesController,
  registerCityController,
  updateCityController,
  datailsCityController,
  deleteCityController,

  listAdressesController,
  registerAddressController,
  updateAddressController,
  datailsAddressController,
  deleteAddressController,
};
