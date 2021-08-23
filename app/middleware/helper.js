require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class Helper{
    /**
     * @description funvtion to generate token
     * @param {*} userCredential 
     * @returns 
     */
    generateToken = (userCredential) =>{
        const token = jwt.sign(userCredential, process.env.SECRET_KEY,{
            expiresIn:'5000s'
        });
       return token;

    }

    /**
     * @description comparing user input with the data stored in database
     * @param {*} userCredential 
     * @param {*} databaseRecord 
     * @returns 
     */
    checkByBcrypt = (userCredential, databaseRecord) =>{
        return(userCredential && databaseRecord) ? (bcrypt.compareSync(userCredential, databaseRecord)) : false;
    }
}
 module.exports = new Helper();

