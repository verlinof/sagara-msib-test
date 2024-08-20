const jwt = require('jsonwebtoken');

function checkAdminVerificator(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // verifies secret and checks expiration
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        });
      }
      if (decoded.status === 'default') {
        return res.status(401).send({
          auth: false,
          message: 'Unauthorized.'
        });
      }
      req.user = decoded.id;
      next();
    });
  } catch (e) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    });
  }
}

module.exports = {
  checkAdminVerificator
}