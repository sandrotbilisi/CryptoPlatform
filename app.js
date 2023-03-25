require("dotenv").config();
const express = require("express");
const Web3 = require("web3");

const app = express();

const web3 = new Web3(process.env.INFURA_ENDPOINT);

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

web3.eth.accounts.wallet.add(account);

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/wallet.html");
});

app.post("/wallet", function (req, res) {
  const name = req.body.name;

  const account = web3.eth.accounts.create();

  const user = {
    name: name,
    address: account.address,
    privateKey: account.privateKey,
  };

  
  console.log(user.address/)
  res.render("wallet", { user: user });
});

app.get("/:name", function (req, res) {
    const name = req.params.name;
  
    const user = {
      name: name,
      address: req.query.address,
      privateKey: req.query.privateKey,
    };
  
    if (user.address) {
      const balance = web3.eth.getBalance(user.address, function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          res.render("wallet", { user: user, balance: result });
        }
      });
    } else {
      res.render("wallet", { user: user });
    }
  });
  

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
