const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hash = (password) => {
	if (typeof(password) === "number") {
		password = password.toString();
	}
	password = password.split("").reverse().join();
	password = crypto.createHash(process.env.ALGORITHM).update(password).digest('hex');
	let salt = password.substring(password.length-10,password.length);
	password = crypto.createHash(process.env.ALGORITHM).update(salt + password).digest('hex');
	return password;
};

const isNullObject = (value) => {
	if (typeof(value) === "object") {
		return Object.keys(value).length === 0;
	}
	return true;
};

const isNullOrEmpty = (value) => {
	if (value === null || value === "" || value === "null" || value === undefined)
		return true
	else
		return false
};

const isValidJson = (json) => {
    try {
        JSON.parse(json);
        return true;
    } catch (error) {
        return false
    }
};

const isValidToken = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

	jwt.verify(token, process.env.SECRET_TOKEN_AUTENTICACAO, function(err, decoded) {
		if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

		req.userID = decoded.idUsuario;
		req.perfilID = decoded.idTipo;
		next();
	});
}

const getInfoToken = (token) => {
	if(isNullOrEmpty(token)) return null;

	let idUsuario = null;
	let idTipoUsuario = null;
	
	jwt.verify(token, process.env.SECRET_TOKEN_AUTENTICACAO, function(err, decoded) {
		idUsuario = decoded.idUsuario;
		idTipoUsuario = decoded.idTipo;
	});

	return {idUsuario, idTipoUsuario};
}

const signToken = (data) => {
	const token = jwt.sign({idUsuario: data.idUsuario, idTipo: data.idTipoUsuario}, process.env.SECRET_TOKEN_AUTENTICACAO);
	return token;
}

module.exports = {
	hash,
	isNullOrEmpty,
	isNullObject,
    isValidJson,
	isValidToken,
	signToken,
	getInfoToken
}