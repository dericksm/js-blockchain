const Elliptic = require("../../node_modules/elliptic").ec

const ec = new Elliptic('secp256k1')

const key = ec.genKeyPair()
const pubKey =  key.getPublic('hex')
const privateKey =  key.getPrivate('hex')
