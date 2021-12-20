const express = require("express");
const logger = require('morgan');
const cookieParser = require("cookie-parser");
const jwt = require("express-jwt");
const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.signedCookies.access_token
}).unless({path: [
    '/',
    '/api/auth/sendOTP',
    '/api/auth/studentLogin',
    '/api/auth/officialLogin'
]}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

app.use('/api/auth', require('./routes/auth.routes'));

app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});