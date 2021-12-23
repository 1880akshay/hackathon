const { decrypt } = require('../utils/encryption.utils');
const pool = require('../config/db.config');

exports.isUserRegistered = async (req, res, next) => {
    const { email, role } = req.body;
    // console.log(email);
    // checking if user is registered and if role is correct
    const query = "SELECT * FROM user_role WHERE email=$1";
    pool.query(query, [email], (error, result) => {
        // console.log(result);
        if(error) throw error;
        else {
            if(result && result.rowCount) {
                //user present
                //check if role is appropriate
                if(role === result.rows[0].role) {
                    //role is appropriate
                    next();
                }
                else {
                    //role inappropriate
                    res.status(403).send({
                        message: 'You do not have the required permissions'
                    });
                }
            }
            else {
                //user not present
                res.status(403).send({
                    message: 'User is not registered'
                });
            }
        }
    })
};

exports.verifyOTP = (req, res, next) => {
    if(decrypt(req.body.hash) == req.body.otp) next();
    else res.status(403).send({
        message: "OTP verification failed"
    });
};

exports.isPasswordCorrect = (req, res, next) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM official_data WHERE email=$1 AND password=$2";
    pool.query(query, [email, password], (error, result) => {
        if(error) throw error;
        else {
            if(result && result.rowCount) {
                //password is correct
                next();
            }
            else {
                //password is incorrect
                res.status(403).send({
                    message: 'Incorrect password'
                });
            }
        }
    });
}