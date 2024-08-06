const User = require('../model/Restaurant');
const jwt = require('jsonwebtoken');

async function login(req,res) {

    try {
        const { email , password} = req.body;
        const user = await User.findOne({ email });

        if(!user) {
          // return res.status(401).json({ message: 'Username or password incorrect' });
          console.log("user false");
           
        }

        const passwordMatch = await user.comparePassword(password);

        console.log(passwordMatch)

        if(passwordMatch == false) {
           // return res.status(401).json({message: 'Username or password incorrect' });
            console.log("password false");
        }
        res.status(200).json(user);
    }catch (error) {
        console.error(error);
    }

}

module.exports = { login };