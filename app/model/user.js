/**
 * @module       app
 * @file         module.js
 * @description  It contains the mongoose methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        19/08/2021
----------------------------------------------------------------------------------------------- */
//connecting to the mongoDB through mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//Schema for registration
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    //Applying time stamp for data
    timestamps: true,
});

//Hashing password before saving it in database
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

const user = mongoose.model('user', userSchema)

class userModel{
    /**
     * @description holds the mongoose method 
     * @param {*} userDetails 
     * @param {*} callback 
     * @returns 
     */
    create = (userDetails, callback) =>{
        try{
            const userSchema = new user({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                password: userDetails.password
            });
            userSchema.save(callback)
        }catch(error){
            return callback(error, null)
        }
    }

    login = (userCredential, callback) => {
        try{
            user.findOne({email: userCredential.email}, (error, data) => {
                if(error){
                    return callback(error, null)
                }
                return callback(null, data)
            })   
        }catch(error){
            return callback(error, null)
        }
    }
}

module.exports = new userModel();