const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

 router.post("/sign-up", authCtrl.signUp);
 router.post('/sign-in', authCtrl.signIn);
 router.post("/verify-email", authCtrl.verifyEmail);


module.exports = router;