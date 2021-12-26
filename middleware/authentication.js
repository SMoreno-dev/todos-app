const { validateToken } = require("../utils/jsonwebtoken");
const FORBIDDEN_CODE = require("../constants/http-status").FORBIDDEN;
const FORBIDDEN_MESSAGE = require("../constants/default-constants").FORBIDDEN;
const throwError = require("../utils/throw-error");

module.exports = (req, res, next) => {
  // Sends the request to validate the token
  const payload = validateToken(req);

  // The payload being null means of the follow:
  //   - the token didn't exist in the request
  //   - the token wasn't valid
  //   - the token expired
  if (payload === null) return throwError(FORBIDDEN_CODE, FORBIDDEN_MESSAGE);

  // Adds the payload of the token to the request. This will let access
  // it from another place without revalidating the token
  req.tokenPayload = payload;

  next();
};
