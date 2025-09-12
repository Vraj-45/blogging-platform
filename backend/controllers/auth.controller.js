const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }); 
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, admin: { name: admin.name, email: admin.email } });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
