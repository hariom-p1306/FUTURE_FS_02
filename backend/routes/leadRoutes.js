const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require("../controllers/leadController");

router.post("/", auth, createLead);
router.get("/", auth, getLeads);
router.put("/:id", auth, updateLead);
router.delete("/:id", auth, deleteLead);

module.exports = router;