const router = require('express').Router();
const User = require('../model/User');
const { registrationValidation, loginValidation } = require('../service/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    // Data Validation
    const { error } = registrationValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //check weather user exists in db
    const emailExist = await User.findOne({
        email: req.body.email
    });

    if (emailExist) {
        return res.status(400).send('Email already exists!');
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        //Saving user in db
        const savedUser = await user.save();
        res.status('201').send({ userId: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }

})

router.post('/login', async (req, res) => {

    // Data Validation
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //check weather user exists in db
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Email does not exists!');
    }

    //validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid Password!');
    }

    let role = 'customer';

    //if the user is devd.reddy then assign him admin role, else all users have customer role.
    if (user.name == 'devd.reddy') {
        role = 'admin';
    }
    
    //check and assign token
    const token = jwt.sign({ _id: user._id, role: role }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.send('Successfully Logged In!');
})

module.exports = router;