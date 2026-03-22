const Lead = require("../models/Lead");

// Create
exports.createLead = async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    user: req.user.id
  });
  res.json(lead);
};

// Get all
exports.getLeads = async (req, res) => {
  const leads = await Lead.find({ user: req.user.id });
  res.json(leads);
};

// Update
exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(lead);
};

// Delete
exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};