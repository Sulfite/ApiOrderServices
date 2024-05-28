const express = require("express");
const router = express.Router();

const { isValidToken } = require("../Ultils/Ultils");
const addressController = require("../Controllers/addressController");

// Coutry
// router.post("/register", isValidToken, addressController.registerController);
router.post("/addCountry", addressController.registerCountryController);
router.get("/listCountries",  addressController.listCountriesController);
router.get("/detailsCountry/:id", addressController.datailsCountryController);
router.put("/updateCountry/:id", addressController.updateCountryController);
router.delete("/deleteCountry/:id", addressController.deleteCountryController);

// States
// router.post("/register", isValidToken, addressController.registerController);
router.post("/addState", addressController.registerStateController);
router.get("/listStates",  addressController.listStatesController);
router.get("/detailsState/:id", addressController.datailsStateController);
router.put("/updateState/:id", addressController.updateStateController);
router.delete("/deleteState/:id", addressController.deleteStateController);

// Cities
router.post("/addCity", addressController.registerCityController);
router.get("/listCities",  addressController.listCitiesController);
router.get("/detailsCity/:id", addressController.datailsCityController);
router.put("/updateCity/:id", addressController.updateCityController);
router.delete("/deleteCity/:id", addressController.deleteCityController);

// Adresses
router.post("/addAddress", addressController.registerAddressController);
router.get("/listAdresses", isValidToken,  addressController.listAdressesController);
router.get("/detailsAddress/:id", addressController.datailsAddressController);
router.put("/updateAddress/:id", addressController.updateAddressController);
router.delete("/deleteAddress/:id", addressController.deleteAddressController);

module.exports = router;