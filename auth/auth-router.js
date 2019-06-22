const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model.js');
const secrets = require('./secrets.js'); //added

// for endpoints beginning with /api/auth

router.post('/register', async (req, res) => {
    try {
      //ideal if i get fullname username passowrd
        const userInfo = await req.body
        userInfo.password = await bcrypt.hashSync(userInfo.password, 10)
        const user = await Users.addUser(userInfo)
        res.status(201).json(user);
    }

    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new user suckas',
        });
  
    }
  });

  router.post('/login', async (req, res) => {

    let {username, password} = req.body;
    try {
        const user = await Users.findBy( { username })
        if (user && bcrypt.compareSync(password, user[0].password)){
          const token = generateToken(user);
          res.status(200).json({message:`Welcome user!`,
        token, 
        });

        }
        else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    }
    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new login suckas',
        });

    }
});

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
    isInstructor: user.isInstructor //boolean if not instructor then is client. True by default.
  };
  const secret = secrets.jwtSecret
  const options = {
  expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}


  
module.exports = router;
