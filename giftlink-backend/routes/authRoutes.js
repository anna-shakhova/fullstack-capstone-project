const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');  // Import Pino logger

const logger = pino();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            logger.error('Email id already exists');

            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        })

        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const user = await collection.findOne({ email: req.body.email });

        if (user) {
            const isPasswordMatch = await bcryptjs.compare(req.body.password, theUser.password);

            if (!isPasswordMatch) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong pasword' });    
            }

            const payload = { user: { id: theUser._id.toString() } };

            const authtoken = jwt.sign(payload, JWT_SECRET);

            logger.info('User logged in successfully');
            res.json({
                authtoken, 
                userName: user.firstName, 
                userEmail: user.email 
            });
        } else {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;
