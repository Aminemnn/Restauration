const Restaurant = require('../model/Restaurant');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const { sendConfirmationEmail }=require ("../nodemailer");
const bcrypt = require('bcryptjs')

app.use(bodyParser.json());
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password,ConfirmPassword } = req.body;

    const activationCode = generateVerificationCode();

    if(password !== ConfirmPassword){
      return res.status(400).json({error: 'Passwords do not match'});
    }


       if(!name) {
        return res.status(400).json({error: 'Name is required'});
       }

       if(!email) {
        return res.status(400).json({error: 'Email is required'});
       }

       if(!password) {
        return res.status(400).json({error: 'Password is required'});
       }
        const existingUser = await Restaurant.findOne({ email: email });

        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);

        const HashPassword = await bcrypt.hash(password, salt);

    // Créer une nouvelle instance de Restaurant avec les données du formulaire
    const newRestaurant = new Restaurant({
      name,
      email,
      password: HashPassword,
      activationCode,
    });

    // Enregistrer le restaurant dans la base de données
    const savedUser = await newRestaurant.save();

    sendConfirmationEmail(email,activationCode);

    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};