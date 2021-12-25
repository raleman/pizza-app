const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtScope = require('express-jwt-scope');
const authConfig = require("./src/auth_config.json");
const apiConfig = require("./api_config.json");
const bodyParser = require('body-parser');

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER" ||
  !apiConfig.clientSecret ||
  !apiConfig.clientId 
) {
  console.log(
    "Exiting: Please make sure that auth_config.json and api_config are in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.post('/api/order/create', checkJwt, jwtScope('create:order'), function(req, res) {

  console.log(req.body)
  var params = { id: req.user.sub };
  var newOrder = req.body.order
  var orderNum = Date.now()
  
  var ManagementClient = require('auth0').ManagementClient;
  
  var management = new ManagementClient({
    domain: authConfig.domain,
    clientId: apiConfig.clientId,
    clientSecret: apiConfig.clientSecret,
  });

  management.users.get(params, function (err, user) {
    console.log(user.user_metadata.orderHistory);

    var orderHistory = {}

    if (user.user_metadata.orderHistory) {
      orderHistory = user.user_metadata.orderHistory;
    }

    orderHistory[orderNum] = newOrder;

    var metadata = {orderHistory : orderHistory} 

    management.updateUserMetadata(params, metadata, function (err, user) {
      if (err) {
        console.log(err);
      }

      // Updated user.
      console.log(user);
    });

  });

  res.json({
    message: 'Success! Mario is getting your food ready (Not really though.  You should go get something to eat.)',
    orderNum: orderNum
  });
});


app.listen(port, () => console.log(`API Server listening on port ${port}`));
