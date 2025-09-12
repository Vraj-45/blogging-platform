// require('dotenv').config();
// const connectDB = require('./config/db');
// const Admin = require('./models/Admin');
// const bcrypt = require('bcryptjs');

// const createadmin= async () => {
//     try {
//         await connectDB(process.env.MONGO_URI);
//         const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
//         if (existing) {
//             console.log('Admin exists');
//             process.exit();
//         }
//         const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
//         const admin = new Admin({ name: 'Admin', email: process.env.ADMIN_EMAIL, password: hashed });
//         await admin.save();
//         console.log('Admin created:', admin.email);
//         process.exit();
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };

// createadmin();
