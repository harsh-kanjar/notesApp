const express = require('express')
const router = express.Router();
const User = require('../models/User') //Model
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_s = "imharshkanjar@127.0.0.1/#";
const fetchuser = require('../middleware/fetchuser');

// Route 1: Create a user using POST: "/api/auth/createuser" . No login required 
// router.post takes 3 arguments 1. path | 2. array of validations | 3. callback -> router.post('/' , [] , ()=>{})
router.post('/createuser', [

    // input validation
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('passward').isLength({ min: 8 })
    // -----------------------------------------------------

], async (req, res) => {
    let success = false;
    // If all checks are fulfilled , user will add into db
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    // --------------------------------------------------------

    // check weather the user with this email is exists already - used try catch to prevent errors
    try {
        let user = await User.findOne({ email: req.body.email }); // findOne() searches for user in db by refering email
        if (user) {
            return res.status(400).json({success, error: 'OOPS..! User already exists' })
        }

        // incrypt passward // use await cause - both bcrypt func (genSalt , hash) returns a promise 
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.passward, salt)
        // ------------------------------------------------------

        // create a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            passward: secPass
        })
        // -----------------------

        // Generating auth token using JWT
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_s);
        // console.log(authToken);
        // -------------------------------

        // send auth token to the user 
        success = true;
        res.json({success, authToken });
        // ---------------------------

    } catch (error) {
        // console.error(error.message);
        res.status(500).send('Internal server error')
    }
})


//Route 2: Authenticate  a user using POST: "/api/auth/login" . No login required 
router.post('/login', [

    // input validation
    body('email', 'Enter a valid email').isEmail(),
    body('passward', 'Passward cannot be blank').exists()
    // -----------------------------------------------------

], async (req, res) => {
    let success = false
    // If all checks are fulfilled , user will add into db
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // --------------------------------------------------------

    // destructuring
    const { email, passward } = req.body;
    try {
        // searching for user in DB
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Use valid credentials..!" })
        }
        // ---------------------------------------------------------

        // comparing the entered passward with hash stored in DB
        const passwardCompare = await bcrypt.compare(passward, user.passward);
        if (!passwardCompare) {
            return res.status(400).json({success ,error: "Use valid credentials..!" })
        }
        // --------------------------------------------------------------

        // sending payload
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_s);
        success = true;
        res.send({success, authToken })
        // -------------------------------------

    } catch (error) {
        // console.error(error.message);
        res.status(500).send('Internal server error')
    }

})


//Route 3: Get logged in user details using POST: "/api/auth/getuser" . Login required
// fetchuser is the middleware 
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; //comes from middleware
        const user = await User.findById(userId).select("-passward"); //accept passward all fields will get
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
})


//Route 3: Get logged in user details using POST: "/api/auth/forgot-passward" . Login required
router.post('/forgot-password',fetchuser, async (req,res) => {
    const {email} = req.body;
    try{
        const oldUser = await User.findOne({email})
        if(!oldUser){
            return;
        } 
        const secret = jwt_s + oldUser.passward;
        const token = jwt.sign({email: oldUser.email , id: oldUser._id },secret,{expiresIn:'5m'})
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`
        console.log(link)
    }catch (error){
        console.error(error.message)
        res.status(404).send('Internal server error')
    }
})

router.get('/reset-password/:id/:token', async (req,res) => {
    const {id,token} = req.params;
    console.log(req.params);
    res.send('Done')
})


module.exports = router;