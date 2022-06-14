const tokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        //Bearer kjdfgkmsdlfmfmsdf
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const data = tokenService.validateAccess(token);
        if (!data) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        req.user = data;
        console.log(req.user);
        next();
    } catch (e) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};