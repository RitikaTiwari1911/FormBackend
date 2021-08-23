/**
 * @module       controllers
 * @file         user.js
 * @description  It contains the http methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        19/08/2021
----------------------------------------------------------------------------------------------- */
const userService = require('../service/user')
const { validation } = require('../middleware/validation')
class UserController{
    /**
     * @description contains the API for registration
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = (req, res) =>{
        try{
            const userValidation = validation.validate(req.body)
            if(userValidation.error){
                res.status(400).send({message:userValidation.error.details[0].message})
            }
            const userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
            userService.createUser(userDetails,(error, data) => {
                return((error) ?
                    res.status(400).send({
                        success: false,
                        message: "Email id already exists!"
                    }):
                    res.status(200).send({
                        success: true,
                        message: "You have been registered successfully!",
                        data
                    }));
                });
        }catch(error){
            return res.status(500).send({
                success: false,
                message: error.message
            })
        }

    }

    /**
     * @description contains request body for user login
     * @param {*} req 
     * @param {*} res 
     */
    userLogin = (req, res) =>{
        try{
            const userCredential = {
                email: req.body.email,
                password: req.body.password
            }
            userService.login(userCredential, (error, data)=>{
                return((error) ? 
                    res.status(400).send({
                        success: false,
                        message: "Incorrect credentials"
                    }):
                    res.status(200).send({
                        success: true,
                        message: "You are successfully logged in!",
                        data
                }))
            })
        }catch(error){
            res.status(500).send({
                success: false,
                message: error
            })
        }
    }
}
module.exports = new UserController();