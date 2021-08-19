const express = require('express');
require ('dotenv').config();
const app  = express();

//middleware has access to req and res
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to the Registration page"});
});

//listen for request
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening`);
})
