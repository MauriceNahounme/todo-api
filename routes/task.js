const express = require("express");
const router = express.Router();

const taskCtrl = require("../controllers/task");

router.post("/", taskCtrl.createTask);
router.get("/", taskCtrl.getTasks);
router.get("/:id", taskCtrl.getTask);
router.delete("/:id", taskCtrl.deleteTask);
router.put("/:id", taskCtrl.updateTask);

module.exports = router;
