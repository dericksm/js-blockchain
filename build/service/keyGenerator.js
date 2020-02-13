"use strict";
var Elliptic = require("../../node_modules/elliptic").ec;
var ec = new Elliptic('secp256k1');
var key = ec.genKeyPair();
var pubKey = key.getPublic('hex');
var privateKey = key.getPrivate('hex');
