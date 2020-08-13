module.exports = app = (req, res, next) => {
    if (req.user.credits < 1) {
        res.status(402).send({errMsg: 'User has Insufficient credits to create a Survey'}); //404 could've been pun
    }
    next();
};