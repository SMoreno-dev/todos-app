const { validateToken } = require("../utils/jsonwebtoken");
const code = require("../constants/http-status");
const message = require("../constants/default-constants");
const throwError = require("../utils/throw-error");

module.exports = (req, res, next) => {
  // Sends the request to validate the token
  const payload = validateToken(req);

  // The payload being null means of the follow:
  //   - the token didn't exist in the request
  //   - the token wasn't valid
  //   - the token expired
  if (payload === null)
    return throwError(code.UNAUTHORIZED, message.UNAUTHORIZED);

  // Adds the token payload to the request
  req.tokenPayload = payload;

  next();
};
