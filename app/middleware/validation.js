/**
 * @module       middleware
 * @file         validation.js
 * @description  holds the user input validation regex
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        19/08/2021  
-----------------------------------------------------------------------------------------------*/

const joi = require('joi');

const validation = joi.object({
    firstName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    lastName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    email: joi.string().email().required().pattern(new RegExp()),
    password: joi.string().alphanum().min(8).max(30).required()
});

module.exports = {validation}; 