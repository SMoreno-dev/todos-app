require("dotenv").config();

const jwt = require("jsonwebtoken");
const getBearerAuth = (req) => {
  const auth = req.header("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

module.exports = {
  generateAccessToken: (user) => {
    let { id } = user;
    if (!id) return null;

    //Token will expire in 10 minutes
    const token = jwt.sign({ id }, process.env.ACCESS_SECRET, {
      expiresIn: 600,
    });

    return token;
  },

  validateToken: (req) => {
    const bearer = getBearerAuth(req);
    if (!bearer) return null;

    try {
      const token = jwt.verify(bearer, process.env.ACCESS_SECRET);
      return token;
    } catch (error) {
      //If the token is expired, an error will be thrown
      //We want the middleware to handle this
      //So we'll just return a null value
      return null;
    }
  },

  // Only meant to be used for testing
  generateExpiredToken: () => {
    //Token will expire in 1ms
    const token = jwt.sign({ id: 1 }, process.env.ACCESS_SECRET, {
      expiresIn: "1ms",
    });

    return token;
  },
};
