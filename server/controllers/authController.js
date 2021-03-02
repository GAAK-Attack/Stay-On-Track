// link to database set up in authModel, db will access everything exported in that file
const db = require('../models/authModel.js');
// requiring brypt which is used for encryption
const bcrypt = require('bcrypt');
// current number of salt rounds to be used throughout file
const SALT_WORK_FACTOR = 10;

// empty object to populate and export
const authController = {};

// user login, called when post request /login is received
authController.login = (req, res, next) => {
    if ( !req.body.username || !req.body.password) return next({log: 'No body Data recieved',status: 400,message: { err: `authController.login, ${err.stack}`}})
    // query to the database, will grab password linked to username received from client
    const getPassQuery = `SELECT password FROM users WHERE username = '${req.body.username}'`

    // sending getPassQuery to the database
    db.query(getPassQuery)
    // function will fire if a successful response is received
    .then(response => {
        // will cross reference encrypted password from database with plain text password received from client
        bcrypt.compare(req.body.password, response.rows[0].password, function(err, result) {
            // if passwords match allow login; if not, respond with a failed authentication 
            return result ? next() : next({log: 'Database error',status: 403,message: { err: `authController.login, ${err.stack}`}})
        });
    })
    // function will fire upon any error
    .catch(err => {
        // return error handler
        return next({
            // will log Database Error
            log: 'Database error',
            // update status to 403
            status: 403,
            // pitch message stating which middleware failed along with the error
            message: { err: `authController.login, ${err.stack}`}
        })
    })
}

// user initial signup, called when post request to /signup is received
authController.signUp = (req, res, next) => {
    // creating the encrypted version of the password received from client
    bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function(err, hash) {
        // query to the database, will create a new instance under users table, then store username, and encrypted password
        const createUserQuery = `
        INSERT INTO users (username, password)
        VALUES ('${req.body.username}', '${hash}')`
        
        // sending createUserQuery to the database
        db.query(createUserQuery)
        // function will fire if a successful response is received
        .then(response => {
            // will fire route handler which is set to respond with 200 status
            next()
        })
        // function will fire upon any error
        .catch(err => {
            // return error handler
            return next({
                // will log Database Error
                log: 'Database error', 
                // update status to 502
                status: 502, 
                // pitch message stating which middleware failed along with the error
                message: { err: `authController.signUp, ${err.stack}`}
            })
        })
    });
} 

// exports authController object that was populated during file run
module.exports = authController;