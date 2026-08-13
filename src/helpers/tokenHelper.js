const crypto = require('crypto')

const generateVerificationToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    // 1. Algorithm use to hash the token, 
    // 2. Pass the token that you wanna hash 
    // 3. format of the hash token
    return { token, hashedToken }
}

const verifyToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}
module.exports = { generateVerificationToken, verifyToken }