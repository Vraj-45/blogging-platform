require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectdb = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const PORT = process.env.PORT || 5000;

connectdb(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => res.send('Blogging Platform API'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
