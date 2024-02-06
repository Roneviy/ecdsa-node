import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);

const public256 = keccak256(publicKey);

console.log("Private Key: ", toHex(privateKey));
console.log("Public key", toHex(publicKey))
console.log(`ETH Address: 0x${toHex(public256).slice(-40)}`);