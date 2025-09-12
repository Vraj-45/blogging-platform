const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) return res.status(401).json({ message: 'Not authorized' });
      req.admin = admin;
      next();
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = protectAdmin;
