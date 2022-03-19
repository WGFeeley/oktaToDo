# oktaToDo
Javascript Test App with Okta Sign In and API protection

**Technology**

Node JS
https://nodejs.org/en/download/

Node Package Manager
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm




**Dependencies**

*Express*

https://www.npmjs.com/package/express

CLI: npm install express

*okta/jwt-verifier*

https://www.npmjs.com/package/@okta/jwt-verifier

CLI: npm install @okta/jwt-verifier

*Cors*

https://www.npmjs.com/package/cors

CLI: npm install cors

*Simple-encryptor*

https://www.npmjs.com/package/simple-encryptor

CLI: npm install simple-encryptor

*Node-storage*

https://www.npmjs.com/package/node-storage

CLI: npm install node-storage

*Replace:*

oktaSingIn.js replace:

issuer: "https://${yourOktaDomain}/oauth2/default" placeholder values with correct values.

clientId: "${yourClientID}" placeholder values with correct values.

api.js replace:

issuer: "https://${yourOktaDomain}/oauth2/default" placeholder values with correct values.

clientId: "${yourClientID}" placeholder values with correct values.

clientSecret = "${yourSecret}" placeholder values with correct values.

**Running**

*Install dependencies.*

*Navigate to source folder via CLI*

*command: node server.js*

*open loacalhost:8000 on browser*
