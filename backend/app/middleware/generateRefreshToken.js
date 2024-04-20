const jwt = require("jsonwebtoken")

const generateRefreshToken = (user) => { 
    // const {password, ...orther} = user;
    return jwt.sign(
        {
            user
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "30d"}
    )
}

module.exports = generateRefreshToken;
