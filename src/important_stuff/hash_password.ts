export async function encrypt (password : string) {
    const crypto = require('crypto-js'); 
    const secret = process.env.SECRETKEY || 'SECRET_KEY'
    const hash = crypto.AES.encrypt(password, secret)
    return { password: hash }
}

export async function decrypt (password : string) {
    const crypto = require('crypto-js'); 
    const secret = process.env.SECRETKEY || 'SECRET_KEY'
    const hash = crypto.AES.decrypt(password, secret);
    var originalText = hash.toString(crypto.enc.Utf8);
    return { password: originalText }
}
