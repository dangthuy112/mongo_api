const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On Client, must also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //Success, No Content
    const refreshToken = cookies.jwt;

    // check if refreshToken is in db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204); //403 FORBIDDEN
    }

    //delete  refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    //on secure production, add secure: true. only serves on https
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.sendStatus(204);
}

module.exports = { handleLogout }