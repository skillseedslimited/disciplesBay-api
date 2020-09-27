const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router.get(
  "/settings",
  [authorizeUpdated("can-mgt-payment-settings")],
  PaymentController.fetchPaymentSettings
);

router.put(
  "/settings",
  [authorizeUpdated("can-mgt-payment-settings")],
  PaymentController.updatePaymentSettings
);
module.exports = router;
