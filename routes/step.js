const express = require("express");
const router = express.Router();

const stepCtrl = require("../controllers/step");

router.post("/", stepCtrl.createStep);
router.get("/", stepCtrl.getSteps);
router.get("/:id", stepCtrl.getStep);
router.delete("/:id", stepCtrl.deleteStep);
router.put("/:id", stepCtrl.updateStep);

module.exports = router;
