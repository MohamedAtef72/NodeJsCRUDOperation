const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).send("Authorization header is missing");
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Token is missing");
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid or expired token");
        }

        // Attach the verified user to the request object
        req.user = user;

        // Proceed to the next middleware or route
        next();
    });
}

module.exports = authenticationToken;