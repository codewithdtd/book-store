const jwt = require("jsonwebtoken")

// const SignToken = {
const generateAccessToken = (user) => {
        return jwt.sign(
            {
                user
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1d"}
        )
    }

    // generateRefreshToken: (user) => { 
    //     jwt.sign(
    //         {
    //             id: user.id,
    //             role: user.role
    //         },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         {expiresIn: "30d"}
    //     )
    // }
// }
module.exports =  generateAccessToken;