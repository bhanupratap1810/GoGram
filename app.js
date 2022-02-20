const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/components/routes/auth.routes');
const usersRoutes = require('./src/components/routes/users.routes');
const postsRoutes = require('./src/components/routes/posts.routes');
const bodyParser = require("body-parser");
const { verifyToken } = require('./src/utilities/middlewares')
const path = require('path');

require('dotenv/config')

const app = express()

//ROUTES
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/profile-pic', express.static(path.join(__dirname, 'uploads/profilePic')));
app.use('/posts-images', express.static(path.join(__dirname, 'uploads/postsImages')));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', verifyToken, usersRoutes);
app.use('/api/v1/posts', verifyToken, postsRoutes);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected');
}).catch((error) => {
    console.log(error, 'Failed to connect Db');
});

//listening to the server
const server = app.listen(process.env.PORT || 3001, () => {
    console.log('Server started');
});