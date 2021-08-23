require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class Helper{
    generateToken = (userCredential) =>{
        const token = jwt.sign(userCredential, process.env.SECRET_KEY,{
            expiresIn:'5000s'
        });
       return token;

    }

    checkByBcrypt = (userCredential, databaseRecord) =>{
        return(userCredential && databaseRecord) ? (bcrypt.compareSync(userCredential, databaseRecord)) : false;
    }
}
 module.exports = new Helper();

