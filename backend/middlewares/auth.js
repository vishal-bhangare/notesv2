const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers.authorization.split(" ")[1]);
       let x = jwt.verify(token, process.env.TOKEN_SECRET);
       console.log(x);
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};