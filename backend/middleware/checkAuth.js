const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token || token.split(" ").length !== 2) throw "";
        const result = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.context = {userId: result.userId};
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({error: "Not authenticated"});
    }
};

module.exports = checkAuth;