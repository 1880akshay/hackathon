var jwt = require("jsonwebtoken");
const { encrypt } = require('../utils/encryption.utils');
const { mailer } = require('../config/mailer.config');

exports.sendOTP = (req, res) => {
    const email = req.body.email;
    if(email === 'test-email@iitkgp.ac.in') {
        //email and otp for testing purpose
        const otp = '555555';
        const hash = encrypt(otp);
        res.status(200).send({
            message: 'Otp sent!',
            hash
        });
        return;
    }
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const hash = encrypt(otp);
    // sending otp via email
    const details = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for Kgp website',
        html: `
            <p>
                <b>${otp}</b> is your one time password for Kgp website.
            </p>
        `
    }
    mailer.sendMail(details, (err, info) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message: "Could not send otp"
            });
        }
        else {
            res.status(200).send({
                message: "Otp sent!",
                hash
            });
        }
    })
}

exports.login = (req, res) => {
    const expiryTime = 86400; // 24 hours in seconds
    const token = jwt.sign({ email: req.body.email, role: req.body.role }, process.env.JWT_SECRET, {
        expiresIn: expiryTime
    });

    res.status(200).cookie(
        'access_token',
        token,
        {
            httpOnly: true,
            sameSite: 'strict',
            signed: true
        }
    ).send({
        message: 'Login successfull!'
    });
};

exports.checkStudentLoginStatus = (req, res) => {
    if(req.user.role !== 'student') res.status(401).send('Invalid token');
    else res.status(200).send();
}

exports.checkOfficialLoginStatus = (req, res) => {
    if(req.user.role === 'student') res.status(401).send('Invalid token');
    else res.status(200).send();
}

exports.logout = (req, res) => {
    res.status(200).clearCookie('access_token').send();
}