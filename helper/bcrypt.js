const bcrypt = require('bcryptjs')

function hassingPassword(pass) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);
    return hash
}

function comparePass(pass, hash){
    return bcrypt.compareSync(pass, hash)
}
module.exports = {
    hassingPassword,
    comparePass
}