/**
 * @module       app
 * @file         user.js
 * @description  It contains business logic and is treated as a middleware between controller and model
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        19/08/2021
----------------------------------------------------------------------------------------------------------- */
const userModel = require('../model/user');

class userService{
    /**
     * @description contains business logic for createUser
     * @param {*} userDetails 
     * @param {*} callback 
     * @returns 
     */
    createUser = (userDetails, callback) => {
        try{
            userModel.create(userDetails, (error, data) => {
                return error ? callback(error, null) : callback(null, data)
            })
        }catch(error){
            return callback(error, null)
        }
    }
}
module.exports = new userService();