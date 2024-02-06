const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes } = require('ethereum-cryptography/utils.js')

app.use(cors());
app.use(express.json());

const balances = {
  "0x5853f2daf3d210afa9955bec877f77837888fe9e": 10,
  "0xcf01fd7edddac5baf3de8cadcf99c9033525037f": 5,
  "0xf450133108d667e9e3c1c6c5ce368343d6692cae": 2.5,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
