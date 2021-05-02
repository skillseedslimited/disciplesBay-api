const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const { authorize } = require("../middleware/authJwt");

router.route("/show-wallet").get(walletController.fetchUserWallet);
module.exports = router;
