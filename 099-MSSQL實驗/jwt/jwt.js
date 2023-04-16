const jwt = require('jsonwebtoken');

function getToken(customerData){
    const token = jwt.sign({ customerData }, 'Young-Artists', { expiresIn: 300});
    return token
}
function verifyToken(req,res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        console.log(token); 
      return res.send("token過期")
    }
  
    try {
      // Verify and decode the token
      const decodedToken = jwt.verify(token, 'Young-Artists');
        console.log("token success");
        return res.send(decodedToken.customerData)
    } catch (error) {
        console.log("token failed");
      return  res.send("token過期")
    }
}


module.exports = {
    getToken,verifyToken
}