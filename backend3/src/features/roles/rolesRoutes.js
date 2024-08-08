const express = require("express");
const router = express.Router();
const { createRole, getRoles, getRoleById } = require("./rolesController");

router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRoleById);

module.exports = router;
