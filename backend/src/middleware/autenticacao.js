const jwt = require('jsonwebtoken');

module.exports = function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const segredo = process.env.JWT_SECRET;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Token inválido.' });
  }

  try {
    const payload = jwt.verify(token, segredo);
    req.userId = payload.id_usuario;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token expirado ou inválido.' });
  }
};
