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
    let { id, email, password } = user;
    if (![id, email, password].every(Boolean)) return null;

    //Token will expire in 10 minutes
    const token = jwt.sign({ id, email, password }, process.env.ACCESS_SECRET, {
      expiresIn: 600,
    });

    return token;
  },

  validateToken: (req) => {
    const bearer = getBearerAuth(req);
    if (!token) return null;

    const token = jwt.verify(bearer, process.env.ACCESS_SECRET);
    if (!token) return null;
    return token;
  },
};
