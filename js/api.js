const OktaJwtVerifier = require('@okta/jwt-verifier');
const clientSecret = "${yourSecret}";

var encryptor = require('simple-encryptor')(clientSecret);

const Storage = require('node-storage');
const datastore = new Storage('storage.kdb');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: "https://${yourOktaDomain}/oauth2/default"
	clientId: "${yourClientID}" 
});

let uniqueIdentifier;

//API - get list from datastore
function restore(res) {

    if (uniqueIdentifier) {
        let bytes = datastore.get(uniqueIdentifier);

        if (bytes) {
            // decrypt the data and send it back to the client
            res.send(encryptor.decrypt(bytes));
        }
    }
};

//API - store list to datastore
function save(req) {

    if (uniqueIdentifier) {
        let data = req.body;
        // Encrypt the data
        let cipherData = encryptor.encrypt(data);
        datastore.put(uniqueIdentifier, cipherData);
    }
};


exports.checkData = (req, res, type) => {
    oktaJwtVerifier.verifyAccessToken(req.token, 'api://default')
        .then(jwt => {
            uniqueIdentifier = jwt.claims.uid;
            type == 'restore' ? restore(res) : save(req);
        })
        .catch(err => console.error('token failed validation: ', err));
};