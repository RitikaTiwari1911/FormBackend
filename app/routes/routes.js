/**
 * @module       routes
 * @file         routes.js
 * @description  It contains the http methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        19/08/2021
----------------------------------------------------------------------------------------------- */
module.exports = (app) =>{
    const controller = require('../controllers/user')

    //registering a new user
    app.post('/registerUser', controller.registerUser);
}