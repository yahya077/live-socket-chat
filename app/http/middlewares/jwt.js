const jwt = require('jsonwebtoken');
const { UserSchema }= require('../../models/User');

const SECRET_KEY = process.env.SECRET_KEY;

const decode = (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    /* It's being split(' ') by space and then we are getting the second index of
    the array by accessing its [1] index because the convention is authorization: 
    Bearer <auth-token>. */
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(accessToken, SECRET_KEY);
      req.userId = decoded.userId;
      req.userType = decoded.type;
      return next();
    } catch (error) {
  
      return res.status(401).json({ success: false, message: error.message });
    }
  }

const encode = async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const user = await UserSchema.getUserById(userId);
      console.log(user);
      const payload = {
        userId: user._id,
        userType: user.type,
      };
      
      const authToken = jwt.sign(payload, SECRET_KEY);
      console.log('Auth', authToken);
      req.authToken = authToken;
      next();
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

module.exports = {
    decode,
    encode
}