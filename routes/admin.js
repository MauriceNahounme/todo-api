const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin");

router.get("/", adminCtrl.getAdmins);
router.get("/logout", adminCtrl.logout);
router.get("/:id", adminCtrl.getAdmin);
router.delete("/:id", adminCtrl.deleteAdmin);
router.put("/:id", adminCtrl.updateAdmin);

// Connexion & déconnexion & inscriptionn
router.post("/login", adminCtrl.login);
router.post("/signup", adminCtrl.signUp);

module.exports = router;
